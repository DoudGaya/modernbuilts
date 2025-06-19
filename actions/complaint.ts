"use server"
import { complaintSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export const createComplaint = async (formData: FormData) => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    const subject = formData.get("subject") as string
    const description = formData.get("description") as string

    const validatedFields = complaintSchema.safeParse({
      subject,
      description,
    })

    if (!validatedFields.success) {
      return { error: "Invalid fields", issues: validatedFields.error.issues }
    }

    const complaint = await db.complaint.create({
      data: {
        subject,
        description,
        userId: session.user.id,
      },
    })

    return { success: true, complaint }
  } catch (error) {
    console.error("Complaint creation error:", error)
    return { error: "Failed to create complaint" }
  }
}

export const getAllComplaints = async (filters?: {
  status?: string
  search?: string
}) => {
  try {
    const where: any = {}

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status
    }

    if (filters?.search) {
      where.OR = [
        { subject: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { user: { name: { contains: filters.search, mode: "insensitive" } } },
      ]
    }

    const complaints = await db.complaint.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, complaints }
  } catch (error) {
    console.error("Complaints fetch error:", error)
    return { error: "Failed to fetch complaints" }
  }
}

export const updateComplaintStatus = async (id: string, status: string) => {
  try {
    const complaint = await db.complaint.update({
      where: { id },
      data: { status },
    })

    revalidatePath("/admin/complaints")
    return { success: true, complaint }
  } catch (error) {
    console.error("Complaint update error:", error)
    return { error: "Failed to update complaint" }
  }
}

export const respondToComplaint = async (id: string, response: string) => {
  try {
    const complaint = await db.complaint.update({
      where: { id },
      data: {
        response,
        respondedAt: new Date(),
        status: "Resolved",
      },
    })

    revalidatePath("/admin/complaints")
    return { success: true, complaint }
  } catch (error) {
    console.error("Complaint response error:", error)
    return { error: "Failed to respond to complaint" }
  }
}
