"use server"
import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { sendComplaintNotificationEmail, sendComplaintResponseEmail } from "@/lib/mail"

const complaintSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
})

export const createComplaint = async (values: z.infer<typeof complaintSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return { error: "Unauthorized" }
    }

    const validatedFields = complaintSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { subject, description } = validatedFields.data

    const complaint = await db.complaint.create({
      data: {
        subject,
        description,
        userId: user.id,
        status: "Open"
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Send notification email to admins
    await sendComplaintNotificationEmail({
      complaintId: complaint.id,
      subject: complaint.subject,
      description: complaint.description,
      userName: complaint.user.name || "Unknown",
      userEmail: complaint.user.email || ""
    })

    revalidatePath("/user/complaints")
    return { success: "Complaint submitted successfully! You will receive an email notification when we respond." }
  } catch (error) {
    console.error("Error creating complaint:", error)
    return { error: "Failed to submit complaint" }
  }
}

export const getUserComplaints = async () => {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return { error: "Unauthorized" }
    }

    const complaints = await db.complaint.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return { complaints }
  } catch (error) {
    console.error("Error fetching user complaints:", error)
    return { error: "Failed to fetch complaints" }
  }
}

export const getComplaintById = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return { error: "Unauthorized" }
    }

    const complaint = await db.complaint.findFirst({
      where: {
        id,
        userId: user.id // Ensure user can only see their own complaints
      }
    })

    if (!complaint) {
      return { error: "Complaint not found" }
    }

    return { complaint }
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return { error: "Failed to fetch complaint" }
  }
}

// Admin functions
export const getAllComplaints = async () => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const complaints = await db.complaint.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return { complaints }
  } catch (error) {
    console.error("Error fetching complaints:", error)
    return { error: "Failed to fetch complaints" }
  }
}

export const getComplaintByIdAdmin = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const complaint = await db.complaint.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!complaint) {
      return { error: "Complaint not found" }
    }

    return { complaint }
  } catch (error) {
    console.error("Error fetching complaint:", error)
    return { error: "Failed to fetch complaint" }
  }
}

export const respondToComplaint = async (id: string, response: string, status: string = "Resolved") => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    if (!response.trim()) {
      return { error: "Response cannot be empty" }
    }

    const complaint = await db.complaint.update({
      where: { id },
      data: {
        response,
        status,
        respondedAt: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Send response email to user
    if (complaint.user.email) {
      await sendComplaintResponseEmail({
        userEmail: complaint.user.email,
        userName: complaint.user.name || "User",
        subject: complaint.subject,
        response: response,
        status: status,
        complaintId: complaint.id
      })
    }

    revalidatePath("/admin/complaints")
    revalidatePath(`/admin/complaints/${id}`)
    return { success: "Response sent successfully!" }
  } catch (error) {
    console.error("Error responding to complaint:", error)
    return { error: "Failed to send response" }
  }
}
