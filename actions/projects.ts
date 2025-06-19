"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import * as z from "zod"

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  totalValue: z.string().min(1, "Total value is required"),
  expectedReturn: z.string().min(1, "Expected return is required"),
  duration: z.string().min(1, "Duration is required"),
  minInvestment: z.string().min(1, "Minimum investment is required"),
  status: z.enum(["Active", "Pending", "Completed"]),
  category: z.string().min(1, "Category is required"),
})

export async function createProject(formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    totalValue: formData.get("totalValue"),
    expectedReturn: formData.get("expectedReturn"),
    duration: formData.get("duration"),
    minInvestment: formData.get("minInvestment"),
    status: formData.get("status"),
    category: formData.get("category"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const project = await db.project.create({
      data: {
        ...validatedFields.data,
        slug: validatedFields.data.title.toLowerCase().replace(/\s+/g, "-"),
        funded: 0,
        totalInvested: "0",
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
    description: formData.get("description"),
    location: formData.get("location"),
    totalValue: formData.get("totalValue"),
    expectedReturn: formData.get("expectedReturn"),
    duration: formData.get("duration"),
    minInvestment: formData.get("minInvestment"),
    status: formData.get("status"),
    category: formData.get("category"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await db.project.update({
      where: { id },
      data: {
        ...validatedFields.data,
        slug: validatedFields.data.title.toLowerCase().replace(/\s+/g, "-"),
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
          { title: { contains: searchParams.search, mode: "insensitive" } },
          { location: { contains: searchParams.search, mode: "insensitive" } },
        ],
      }),
      ...(searchParams?.status &&
        searchParams.status !== "all" && {
          status: searchParams.status,
        }),
      ...(searchParams?.location &&
        searchParams.location !== "all" && {
          location: { contains: searchParams.location, mode: "insensitive" },
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
        investments: {
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
