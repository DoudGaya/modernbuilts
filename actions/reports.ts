"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const reportSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.string().min(1, "Report type is required"),
  fileUrl: z.string().url("Invalid file URL"),
  fileName: z.string().min(1, "File name is required"),
  fileSize: z.string().min(1, "File size is required"),
  publishDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  isPublic: z.boolean().default(true),
})

export const createReport = async (values: z.infer<typeof reportSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const validatedFields = reportSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { title, description, type, fileUrl, fileName, fileSize, publishDate, isPublic } = validatedFields.data

    const report = await db.report.create({
      data: {
        title,
        description,
        type,
        fileUrl,
        fileName,
        fileSize,
        publishDate: new Date(publishDate),
        isPublic,
        createdBy: user.id,
      }
    })

    revalidatePath("/admin/reports")
    revalidatePath("/investor-relations")

    return { success: "Report created successfully!", report }
  } catch (error) {
    console.error("Report creation error:", error)
    return { error: "Failed to create report" }
  }
}

export const getAllReports = async (filters?: {
  type?: string
  search?: string
  isPublic?: boolean
}) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const where: any = {}

    if (filters?.type && filters.type !== "all") {
      where.type = filters.type
    }

    if (filters?.isPublic !== undefined) {
      where.isPublic = filters.isPublic
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { type: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const reports = await db.report.findMany({
      where,
      orderBy: { publishDate: "desc" },
    })

    return { success: true, reports }
  } catch (error) {
    console.error("Reports fetch error:", error)
    return { error: "Failed to fetch reports" }
  }
}

export const getPublicReports = async () => {
  try {
    const reports = await db.report.findMany({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        fileUrl: true,
        fileName: true,
        fileSize: true,
        publishDate: true,
      },
      orderBy: { publishDate: "desc" },
    })

    return { success: true, reports }
  } catch (error) {
    console.error("Public reports fetch error:", error)
    return { error: "Failed to fetch reports" }
  }
}

export const getReportById = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const report = await db.report.findUnique({
      where: { id },
    })

    if (!report) {
      return { error: "Report not found" }
    }

    return { success: true, report }
  } catch (error) {
    console.error("Error fetching report:", error)
    return { error: "Failed to fetch report" }
  }
}

export const updateReport = async (id: string, values: z.infer<typeof reportSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const validatedFields = reportSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { title, description, type, fileUrl, fileName, fileSize, publishDate, isPublic } = validatedFields.data

    const report = await db.report.update({
      where: { id },
      data: {
        title,
        description,
        type,
        fileUrl,
        fileName,
        fileSize,
        publishDate: new Date(publishDate),
        isPublic,
      }
    })

    revalidatePath("/admin/reports")
    revalidatePath("/investor-relations")

    return { success: "Report updated successfully!", report }
  } catch (error) {
    console.error("Report update error:", error)
    return { error: "Failed to update report" }
  }
}

export const deleteReport = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    await db.report.delete({
      where: { id }
    })

    revalidatePath("/admin/reports")
    revalidatePath("/investor-relations")

    return { success: "Report deleted successfully!" }
  } catch (error) {
    console.error("Report deletion error:", error)
    return { error: "Failed to delete report" }
  }
}
