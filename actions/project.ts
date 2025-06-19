"use server"
import { projectSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { uploadToS3, deleteFromS3 } from "@/lib/s3"
import { revalidatePath } from "next/cache"
import { sendBulkEmail } from "@/lib/mail"

export const createProject = async (formData: FormData) => {  try {
    // Extract and validate form data
    const title = formData.get("title") as string
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const length = formData.get("length") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const duration = formData.get("duration") as string
    const valuation = formData.get("valuation") as string
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const location = formData.get("location") as string
    const sharePrice = Number.parseInt(formData.get("sharePrice") as string)
    const roi = Number.parseInt(formData.get("roi") as string)
    const projectStatus = formData.get("projectStatus") as "PENDING" | "ACTIVE" | "END" | "COMPLETED"

    // Get file URLs from the form (new approach) or handle direct file uploads (old approach)
    // Check if we're receiving URLs or actual files
    const coverImageUrl = formData.get("coverImageUrl") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const imageUrlsStr = formData.get("imageUrls") as string;
    let imageUrls: string[] = [];
    
    try {
      if (imageUrlsStr) {
        imageUrls = JSON.parse(imageUrlsStr);
      }
    } catch (parseError) {
      console.error("Error parsing imageUrls JSON:", parseError);
      // Continue with empty array if parsing fails
    }
    
    // Check if we have pre-uploaded URLs or need to handle files directly
    const hasPreUploadedFiles = coverImageUrl || videoUrl || imageUrls.length > 0;
    
    let finalCoverImageUrl = coverImageUrl;
    let finalVideoUrl = videoUrl;
    let finalImageUrls = imageUrls;
    
    // If we don't have pre-uploaded URLs, process files directly (backwards compatibility)
    if (!hasPreUploadedFiles) {
      console.log("Handling direct file uploads (old method)");
      const coverImageFile = formData.get("coverImage") as File;
      const videoFile = formData.get("video") as File;
      const imageFiles = formData.getAll("images") as File[];
      
      if (coverImageFile) {
        finalCoverImageUrl = await uploadToS3(coverImageFile, "projects/covers");
      }
      
      if (videoFile) {
        finalVideoUrl = await uploadToS3(videoFile, "projects/videos");
      }
      
      if (imageFiles.length > 0) {
        finalImageUrls = await Promise.all(
          imageFiles.map((file) => uploadToS3(file, "projects/images"))
        );
      }
    }

    // Check if slug already exists
    const existingProject = await db.project.findUnique({
      where: { slug },
    })

    if (existingProject) {
      return { error: "A project with this title already exists" }
    }

    // Validate data - using URLs instead of file names for validation
    const validatedFields = projectSchema.safeParse({
      title,
      length,
      category,
      description,
      duration,
      valuation,
      state,
      city,
      location,
      sharePrice,
      roi,
      projectStatus,      coverImage: finalCoverImageUrl || "placeholder.jpg", // Use URL instead of file.name
      video: finalVideoUrl || "",
      images: finalImageUrls.length ? finalImageUrls : ["placeholder.jpg"], // Use URLs instead of file names
    })
    
    if (!validatedFields.success) {
      return { error: "Invalid fields", issues: validatedFields.error.issues }
    }

    // Create project in database - using the already uploaded files
    const project = await db.project.create({
      data: {
        title,
        slug,
        length,
        category,
        description,
        duration: new Date(duration),
        valuation,
        state,
        city,
        location,
        sharePrice,
        roi,
        projectStatus,
        coverImage: finalCoverImageUrl,
        video: finalVideoUrl || "", // Use empty string if no video
        images: finalImageUrls,
      },
    })

    revalidatePath("/admin/projects")
    return { success: true, project }
  } catch (error) {
    console.error("Project creation error:", error)
    return { error: "Failed to create project" }
  }
}

export const updateProject = async (id: string, formData: FormData) => {
  try {
    // Extract and validate form data similar to createProject
    // ...

    // Find existing project
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return { error: "Project not found" }
    }

    // Handle file updates - only upload new files if provided
    // ...

    // Update project in database
    const project = await db.project.update({
      where: { id },
      data: {
        // Updated fields
        // ...
      },
    })

    revalidatePath(`/admin/projects/${id}`)
    revalidatePath("/admin/projects")
    return { success: true, project }
  } catch (error) {
    console.error("Project update error:", error)
    return { error: "Failed to update project" }
  }
}

export const deleteProject = async (id: string) => {
  try {
    // Find project to get file URLs
    const project = await db.project.findUnique({
      where: { id },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    // Delete files from S3
    await deleteFromS3(project.coverImage)
    if (project.video) await deleteFromS3(project.video)
    await Promise.all(project.images.map((image) => deleteFromS3(image)))

    // Delete project from database
    await db.project.delete({
      where: { id },
    })

    revalidatePath("/admin/projects")
    return { success: true }
  } catch (error) {
    console.error("Project deletion error:", error)
    return { error: "Failed to delete project" }
  }
}

export const getProjectById = async (id: string) => {
  try {
    const project = await db.project.findUnique({
      where: { id },
      include: {
        investment: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    return { success: true, project }
  } catch (error) {
    console.error("Project fetch error:", error)
    return { error: "Failed to fetch project" }
  }
}

export const getAllProjects = async (filters?: {
  status?: string
  category?: string
  search?: string
}) => {
  try {
    const where: any = {}

    if (filters?.status && filters.status !== "all") {
      where.projectStatus = filters.status
    }

    if (filters?.category && filters.category !== "all") {
      where.category = filters.category
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { location: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const projects = await db.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { investment: true },
        },
      },
    })

    return { success: true, projects }
  } catch (error) {
    console.error("Projects fetch error:", error)
    return { error: "Failed to fetch projects" }
  }
}

export const sendProjectUpdateToInvestors = async (projectId: string, subject: string, message: string) => {
  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        investment: {
          include: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!project) {
      return { error: "Project not found" }
    }

    const investors = project.investment
      .map((inv) => ({
        email: inv.user.email || "",
        name: inv.user.name || "",
      }))
      .filter((inv) => inv.email)

    if (investors.length === 0) {
      return { error: "No investors found for this project" }
    }

    await sendBulkEmail(investors, subject, message, project.title)

    return { success: true, count: investors.length }
  } catch (error) {
    console.error("Email sending error:", error)
    return { error: "Failed to send emails" }
  }
}


// "use server"
// import { projectSchema } from "@/lib/schema"
// import { db } from "@/lib/db"
// import { uploadToS3, deleteFromS3 } from "@/lib/s3"
// import { revalidatePath } from "next/cache"
// import { sendBulkEmail } from "@/lib/mail"

// export const createProject = async (formData: FormData) => {
//   try {
//     // Extract and validate form data
//     const title = formData.get("title") as string
//     const length = formData.get("length") as string
//     const category = formData.get("category") as string
//     const description = formData.get("description") as string
//     const duration = formData.get("duration") as string
//     const valuation = formData.get("valuation") as string
//     const state = formData.get("state") as string
//     const city = formData.get("city") as string
//     const location = formData.get("location") as string
//     const sharePrice = Number.parseInt(formData.get("sharePrice") as string)
//     const roi = Number.parseInt(formData.get("roi") as string)
//     const projectStatus = formData.get("projectStatus") as "PENDING" | "ACTIVE" | "END" | "COMPLETED"

//     // Handle file uploads
//     const coverImageFile = formData.get("coverImage") as File
//     const videoFile = formData.get("video") as File
//     const imageFiles = formData.getAll("images") as File[]

//     // Validate data
//     const validatedFields = projectSchema.safeParse({
//       title,
//       length,
//       category,
//       description,
//       duration,
//       valuation,
//       state,
//       city,
//       location,
//       sharePrice,
//       roi,
//       projectStatus,
//       coverImage: coverImageFile.name, // Temporary for validation
//       video: videoFile?.name || "",
//       images: imageFiles.map((file) => file.name), // Temporary for validation
//     })

//     if (!validatedFields.success) {
//       return { error: "Invalid fields", issues: validatedFields.error.issues }
//     }

//     // Upload files to S3
//     const coverImageUrl = await uploadToS3(coverImageFile, "projects/covers")
//     const videoUrl = videoFile ? await uploadToS3(videoFile, "projects/videos") : ""
//     const imageUrls = await Promise.all(imageFiles.map((file) => uploadToS3(file, "projects/images")))

//     // Create project in database
//     const project = await db.project.create({
//       data: {
//         title,
//         length,
//         category,
//         description,
//         duration: new Date(duration),
//         valuation,
//         state,
//         city,
//         location,
//         sharePrice,
//         roi,
//         projectStatus,
//         coverImage: coverImageUrl,
//         video: videoUrl,
//         images: imageUrls,
//       },
//     })

//     revalidatePath("/admin/projects")
//     return { success: true, project }
//   } catch (error) {
//     console.error("Project creation error:", error)
//     return { error: "Failed to create project" }
//   }
// }

// export const updateProject = async (id: string, formData: FormData) => {
//   try {
//     // Extract and validate form data similar to createProject
//     // ...

//     // Find existing project
//     const existingProject = await db.project.findUnique({
//       where: { id },
//     })

//     if (!existingProject) {
//       return { error: "Project not found" }
//     }

//     // Handle file updates - only upload new files if provided
//     // ...

//     // Update project in database
//     const project = await db.project.update({
//       where: { id },
//       data: {
//         // Updated fields
//         // ...
//       },
//     })

//     revalidatePath(`/admin/projects/${id}`)
//     revalidatePath("/admin/projects")
//     return { success: true, project }
//   } catch (error) {
//     console.error("Project update error:", error)
//     return { error: "Failed to update project" }
//   }
// }

// export const deleteProject = async (id: string) => {
//   try {
//     // Find project to get file URLs
//     const project = await db.project.findUnique({
//       where: { id },
//     })

//     if (!project) {
//       return { error: "Project not found" }
//     }

//     // Delete files from S3
//     await deleteFromS3(project.coverImage)
//     if (project.video) await deleteFromS3(project.video)
//     await Promise.all(project.images.map((image) => deleteFromS3(image)))

//     // Delete project from database
//     await db.project.delete({
//       where: { id },
//     })

//     revalidatePath("/admin/projects")
//     return { success: true }
//   } catch (error) {
//     console.error("Project deletion error:", error)
//     return { error: "Failed to delete project" }
//   }
// }

// export const getProjectById = async (id: string) => {
//   try {
//     const project = await db.project.findUnique({
//       where: { id },
//       include: {
//         investment: {
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!project) {
//       return { error: "Project not found" }
//     }

//     return { success: true, project }
//   } catch (error) {
//     console.error("Project fetch error:", error)
//     return { error: "Failed to fetch project" }
//   }
// }

// export const getAllProjects = async (filters?: {
//   status?: string
//   category?: string
//   search?: string
// }) => {
//   try {
//     const where: any = {}

//     if (filters?.status && filters.status !== "all") {
//       where.projectStatus = filters.status
//     }

//     if (filters?.category && filters.category !== "all") {
//       where.category = filters.category
//     }

//     if (filters?.search) {
//       where.OR = [
//         { title: { contains: filters.search, mode: "insensitive" } },
//         { description: { contains: filters.search, mode: "insensitive" } },
//         { location: { contains: filters.search, mode: "insensitive" } },
//       ]
//     }

//     const projects = await db.project.findMany({
//       where,
//       orderBy: { createdAt: "desc" },
//       include: {
//         _count: {
//           select: { investment: true },
//         },
//       },
//     })

//     return { success: true, projects }
//   } catch (error) {
//     console.error("Projects fetch error:", error)
//     return { error: "Failed to fetch projects" }
//   }
// }

// export const sendProjectUpdateToInvestors = async (projectId: string, subject: string, message: string) => {
//   try {
//     const project = await db.project.findUnique({
//       where: { id: projectId },
//       include: {
//         investment: {
//           include: {
//             user: {
//               select: {
//                 email: true,
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!project) {
//       return { error: "Project not found" }
//     }

//     const investors = project.investment
//       .map((inv) => ({
//         email: inv.user.email || "",
//         name: inv.user.name || "",
//       }))
//       .filter((inv) => inv.email)

//     if (investors.length === 0) {
//       return { error: "No investors found for this project" }
//     }

//     await sendBulkEmail(investors, subject, message, project.title)

//     return { success: true, count: investors.length }
//   } catch (error) {
//     console.error("Email sending error:", error)
//     return { error: "Failed to send emails" }
//   }
// }
