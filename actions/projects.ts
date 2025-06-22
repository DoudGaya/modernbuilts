"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  length: z.string().min(1, "Length is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  valuation: z.number().min(1, "Valuation is required"),
  investmentRequired: z.number().min(1, "Investment required is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  projectStatus: z.enum(["PENDING", "ACTIVE", "END", "COMPLETED"]).default("PENDING"),
  features: z.array(z.string()).default([]),
  sharePrice: z.number().min(1, "Share price is required"),
  roi: z.number().min(1, "ROI is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  video: z.string().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
})

export async function createProject(formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get("title"),
    length: formData.get("length"),
    category: formData.get("category"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    valuation: Number(formData.get("valuation")),
    investmentRequired: Number(formData.get("investmentRequired")),
    state: formData.get("state"),
    city: formData.get("city"),
    location: formData.get("location"),
    projectStatus: formData.get("projectStatus") || "PENDING",
    features: formData.get("features") ? JSON.parse(formData.get("features") as string) : [],
    sharePrice: Number(formData.get("sharePrice")),
    roi: Number(formData.get("roi")),
    coverImage: formData.get("coverImage"),
    video: formData.get("video") || "",
    images: formData.get("images") ? JSON.parse(formData.get("images") as string) : [],
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { valuation, investmentRequired, sharePrice, ...data } = validatedFields.data
    
    // Calculate total shares
    const totalShares = Math.floor(investmentRequired / sharePrice)
      const project = await db.project.create({
      data: {
        ...data,
        valuation,
        investmentRequired,
        sharePrice,
        totalShares,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        duration: new Date(data.duration), // Convert string to DateTime
        video: data.video || "", // Ensure video is always a string
      },
    })

    revalidatePath("/admin/projects")
    redirect(`/admin/projects/${project.id}`)
  } catch (error) {
    return {
      error: "Failed to create project",
    }
  }
}

export async function updateProject(id: string, formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get("title"),
    length: formData.get("length"),
    category: formData.get("category"),
    description: formData.get("description"),
    duration: formData.get("duration"),
    valuation: Number(formData.get("valuation")),
    investmentRequired: Number(formData.get("investmentRequired")),
    state: formData.get("state"),
    city: formData.get("city"),
    location: formData.get("location"),
    projectStatus: formData.get("projectStatus") || "PENDING",
    features: formData.get("features") ? JSON.parse(formData.get("features") as string) : [],
    sharePrice: Number(formData.get("sharePrice")),
    roi: Number(formData.get("roi")),
    coverImage: formData.get("coverImage"),
    video: formData.get("video") || "",
    images: formData.get("images") ? JSON.parse(formData.get("images") as string) : [],
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { valuation, investmentRequired, sharePrice, ...data } = validatedFields.data
    
    // Calculate total shares
    const totalShares = Math.floor(investmentRequired / sharePrice)
    
    await db.project.update({
      where: { id },
      data: {
        ...data,
        valuation,
        investmentRequired,
        sharePrice,
        totalShares,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        duration: new Date(data.duration), // Convert string to DateTime
        video: data.video || "", // Ensure video is always a string
      },
    })

    revalidatePath("/admin/projects")
    revalidatePath(`/admin/projects/${id}`)
    redirect(`/admin/projects/${id}`)
  } catch (error) {
    return {
      error: "Failed to update project",
    }
  }
}

export async function deleteProject(id: string) {
  try {
    await db.project.delete({
      where: { id },
    })

    revalidatePath("/admin/projects")
    return { success: "Project deleted successfully" }
  } catch (error) {
    return {
      error: "Failed to delete project",
    }
  }
}

export async function getProjects(searchParams?: {
  search?: string
  status?: string
  location?: string
  page?: string
}) {
  try {
    const page = Number(searchParams?.page) || 1
    const limit = 10
    const offset = (page - 1) * limit

    const where = {
      ...(searchParams?.search && {
        OR: [
          { title: { contains: searchParams.search, mode: "insensitive" as const } },
          { location: { contains: searchParams.search, mode: "insensitive" as const } },
        ],
      }),
      ...(searchParams?.status &&
        searchParams.status !== "all" && {
          projectStatus: searchParams.status as any,
        }),
      ...(searchParams?.location &&
        searchParams.location !== "all" && {
          location: { contains: searchParams.location, mode: "insensitive" as const },
        }),
    }

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.project.count({ where }),
    ])

    return {
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    return {
      error: "Failed to fetch projects",
    }
  }
}

export async function getProjectById(id: string) {
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

    return { project }
  } catch (error) {
    return {
      error: "Failed to fetch project",
    }
  }
}
