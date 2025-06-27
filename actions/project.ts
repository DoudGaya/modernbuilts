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
    const valuation = Number.parseInt(formData.get("valuation") as string)
    const investmentRequired = Number.parseInt(formData.get("investmentRequired") as string)
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const location = formData.get("location") as string
    const sharePrice = Number.parseInt(formData.get("sharePrice") as string)
    const roi = Number.parseInt(formData.get("roi") as string)
    const projectStatus = formData.get("projectStatus") as "PENDING" | "ACTIVE" | "END" | "COMPLETED"

    // Calculate total shares based on investment required and share price
    const totalShares = Math.floor(investmentRequired / sharePrice)

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
    }    // Validate data - using URLs instead of file names for validation
    const validatedFields = projectSchema.safeParse({
      title,
      length,
      category,
      description,
      duration,
      valuation,
      investmentRequired,
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
    }    // Create project in database - using the already uploaded files
    const project = await db.project.create({
      data: {
        title,
        slug,
        length,
        category,
        description,
        duration: new Date(duration),
        valuation,
        investmentRequired,
        totalShares,
        soldShares: 0,
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

    // Check if admin wants to notify users about the new project
    const notifyUsers = formData.get("notifyUsers") === "true"
    
    if (notifyUsers) {
      try {
        await sendProjectNotificationToAllUsers(project)
      } catch (emailError) {
        console.error("Error sending project notification emails:", emailError)
        // Don't fail the project creation if email fails
      }
    }

    revalidatePath("/admin/projects")
    return { success: true, project }
  } catch (error) {
    console.error("Project creation error:", error)
    return { error: "Failed to create project" }
  }
}

export const updateProject = async (id: string, formData: FormData) => {
  try {
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
    const valuation = Number.parseInt(formData.get("valuation") as string)
    const investmentRequired = Number.parseInt(formData.get("investmentRequired") as string)
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const location = formData.get("location") as string
    const sharePrice = Number.parseInt(formData.get("sharePrice") as string)
    const roi = Number.parseInt(formData.get("roi") as string)
    const projectStatus = formData.get("projectStatus") as "PENDING" | "ACTIVE" | "END" | "COMPLETED"
    const featuresString = formData.get("features") as string
    const features = featuresString ? JSON.parse(featuresString) : []

    // Calculate total shares based on investment required and share price
    const totalShares = Math.floor(investmentRequired / sharePrice)

    // Get file URLs from the form (existing URLs or new uploaded URLs)
    const coverImageUrl = formData.get("coverImageUrl") as string
    const videoUrl = formData.get("videoUrl") as string
    const imageUrls = formData.getAll("imageUrls") as string[]

    // Find existing project
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    if (!existingProject) {
      return { error: "Project not found" }
    }

    // Validate required fields
    if (!title || !category || !description || !location || !sharePrice || !roi) {
      return { error: "Please fill in all required fields" }
    }    // Update project in database
    const project = await db.project.update({
      where: { id },
      data: {
        title,
        slug,
        length,
        category,
        description,
        duration: new Date(duration),
        valuation,
        investmentRequired,
        totalShares,
        state,
        city,
        location,
        sharePrice,
        roi,
        projectStatus,
        features,
        coverImage: coverImageUrl || existingProject.coverImage,
        video: videoUrl || existingProject.video,
        images: imageUrls.length > 0 ? imageUrls : existingProject.images,
      },
    })

    revalidatePath(`/admin/projects/${project.slug}`)
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

export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await db.project.findUnique({
      where: { slug },
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
    }    const projects = await db.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        investment: {
          select: {
            investmentAmount: true,
          },
        },
        _count: {
          select: { investment: true },
        },
      },
    })    // Calculate funding progress for each project
    const projectsWithProgress = projects.map(project => {
      const totalInvested = project.investment.reduce((sum, inv) => sum + inv.investmentAmount, 0)
      const targetAmount = project.investmentRequired || 1
      const fundingProgress = Math.min((totalInvested / targetAmount) * 100, 100)
      
      return {
        ...project,
        totalInvested,
        fundingProgress: Math.round(fundingProgress),
        totalInvestors: project._count.investment,
      }
    })

    return { success: true, projects: projectsWithProgress }
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

// Function to send new project notifications to all users
export const sendProjectNotificationToAllUsers = async (project: any) => {
  try {
    // Fetch all users who should receive notifications
    const users = await db.user.findMany({
      where: {
        role: {
          in: ["USER", "DEVELOPER"] // Send to regular users and developers
        },
        emailVerified: {
          not: null // Only send to verified users
        }
      },
      select: {
        email: true,
        name: true
      }
    })

    // Prepare recipients list
    const recipients = users.filter(user => user.email).map(user => ({
      email: user.email!,
      name: user.name || "Valued Investor"
    }))

    if (recipients.length > 0) {
      // Format investment required with commas for thousands
      const formattedInvestment = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(project.investmentRequired)

      const formattedSharePrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(project.sharePrice)

      // Create email content
      const subject = `New Investment Opportunity: ${project.title}`
      const message = `
        <p>We're excited to announce a new investment opportunity that you might be interested in:</p>
        
        <h3>${project.title}</h3>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Location:</strong> ${project.location}, ${project.city}, ${project.state}</p>
        <p><strong>Investment Required:</strong> ${formattedInvestment}</p>
        <p><strong>Share Price:</strong> ${formattedSharePrice}</p>
        <p><strong>Expected ROI:</strong> ${project.roi}%</p>
        
        <p>${project.description.substring(0, 200)}${project.description.length > 200 ? '...' : ''}</p>
        
        <p>Don't miss out on this exciting investment opportunity. Visit our platform to learn more and start investing today!</p>
        <a href="https://stablebricks.com/projects/${project.slug}" style="background-color: #f7d046; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 15px;">View Project & Invest</a>
      `

      // Send bulk email
      await sendBulkEmail(recipients, subject, message, project.title)
    }
  } catch (error) {
    console.error("Failed to send project notification emails:", error)
    throw error
  }
}
