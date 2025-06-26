"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { 
  sendLandSubmissionStatusEmail, 
  sendLandSubmissionFeedbackEmail,
  sendLandSubmissionNotificationEmail
} from "@/lib/mail"

// Schema for getting land submissions
const landSubmissionFilterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

// Schema for updating land submission status
const updateStatusSchema = z.object({
  status: z.enum(["Pending", "Approved", "Rejected"]),
})

// Schema for providing feedback
const feedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback cannot be empty"),
})

// Schema for creating a new land submission
const createLandSubmissionSchema = z.object({
  location: z.string().min(1, "Location is required"),
  size: z.string().min(1, "Size is required"),
  titleType: z.string().min(1, "Title type is required"),
  currentUse: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  documents: z.array(z.string()).optional(),
  plans: z.array(z.string()).optional(),
})

/**
 * Get all land submissions with optional filtering
 */
export async function getAllLandSubmissions(
  filters?: z.infer<typeof landSubmissionFilterSchema>
) {
  try {
    const validatedFilters = landSubmissionFilterSchema.safeParse(filters)

    if (!validatedFilters.success) {
      return { 
        error: "Invalid filters", 
        issues: validatedFilters.error.issues 
      }
    }

    const { search, status, page = 1, limit = 10 } = validatedFilters.data
    const skip = (page - 1) * limit

    // Build the where clause
    const where: any = {}

    // Add search filter if provided
    if (search) {
      where.OR = [
        { location: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }

    // Add status filter if provided and not "all"
    if (status && status !== "all") {
      where.status = status
    }

    // Query submissions with pagination
    const [submissions, total] = await Promise.all([
      db.landSubmission.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      db.landSubmission.count({ where }),
    ])

    return {
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    // console.error("Error fetching land submissions:", error)
    return { error: "Failed to fetch land submissions" }
  }
}

/**
 * Get a land submission by ID
 */
export async function getLandSubmissionById(id: string) {
  try {
    const submission = await db.landSubmission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!submission) {
      return { error: "Land submission not found" }
    }

    return { success: true, submission }
  } catch (error) {
    // console.error("Error fetching land submission:", error)
    return { error: "Failed to fetch land submission" }
  }
}

/**
 * Update a land submission's status
 */
export async function updateLandSubmissionStatus(id: string, status: string) {
  try {
    // Validate the user is authenticated and is an admin
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Validate the status
    const validatedData = updateStatusSchema.safeParse({ status })
    if (!validatedData.success) {
      return { error: "Invalid status" }
    }

    // Check if the submission exists and get current data
    const submission = await db.landSubmission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!submission) {
      return { error: "Land submission not found" }
    }

    // Update the status
    await db.landSubmission.update({
      where: { id },
      data: {
        status: validatedData.data.status,
      },
    })

    // Send email notification if we have user email and status changed
    if (submission.description.includes("Email:")) {
      try {
        // Extract email from description for anonymous submissions
        const emailMatch = submission.description.match(/Email:\s*([^\n\r]+)/)
        const nameMatch = submission.description.match(/Name:\s*([^\n\r]+)/)
        
        if (emailMatch && nameMatch) {
          const userEmail = emailMatch[1].trim()
          const userName = nameMatch[1].trim()
          
          await sendLandSubmissionStatusEmail({
            userEmail,
            userName,
            location: submission.location,
            status: validatedData.data.status,
            submissionId: submission.id,
            feedback: submission.feedback || undefined,
          })
        }
      } catch (emailError) {
        console.error("Error sending status email:", emailError)
        // Don't fail the whole operation if email fails
      }
    } else if (submission.user?.email) {
      // Send email for authenticated users
      try {
        await sendLandSubmissionStatusEmail({
          userEmail: submission.user.email,
          userName: submission.user.name || "User",
          location: submission.location,
          status: validatedData.data.status,
          submissionId: submission.id,
          feedback: submission.feedback || undefined,
        })
      } catch (emailError) {
        console.error("Error sending status email:", emailError)
        // Don't fail the whole operation if email fails
      }
    }

    revalidatePath("/admin/land-submissions")
    return { success: true }
  } catch (error) {
    console.error("Error updating land submission status:", error)
    return { error: "Failed to update status" }
  }
}

/**
 * Provide feedback for a land submission
 */
export async function provideLandSubmissionFeedback(id: string, feedback: string) {
  try {
    // Validate the user is authenticated and is an admin
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Validate the feedback
    const validatedData = feedbackSchema.safeParse({ feedback })
    if (!validatedData.success) {
      return { error: validatedData.error.issues[0].message }
    }

    // Check if the submission exists and get current data
    const submission = await db.landSubmission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!submission) {
      return { error: "Land submission not found" }
    }

    // Update the feedback
    await db.landSubmission.update({
      where: { id },
      data: {
        feedback: validatedData.data.feedback,
      },
    })

    // Send email notification if we have user email
    if (submission.description.includes("Email:")) {
      try {
        // Extract email from description for anonymous submissions
        const emailMatch = submission.description.match(/Email:\s*([^\n\r]+)/)
        const nameMatch = submission.description.match(/Name:\s*([^\n\r]+)/)
        
        if (emailMatch && nameMatch) {
          const userEmail = emailMatch[1].trim()
          const userName = nameMatch[1].trim()
          
          await sendLandSubmissionFeedbackEmail({
            userEmail,
            userName,
            location: submission.location,
            submissionId: submission.id,
            feedback: validatedData.data.feedback,
          })
        }
      } catch (emailError) {
        console.error("Error sending feedback email:", emailError)
        // Don't fail the whole operation if email fails
      }
    } else if (submission.user?.email) {
      // Send email for authenticated users
      try {
        await sendLandSubmissionFeedbackEmail({
          userEmail: submission.user.email,
          userName: submission.user.name || "User",
          location: submission.location,
          submissionId: submission.id,
          feedback: validatedData.data.feedback,
        })
      } catch (emailError) {
        console.error("Error sending feedback email:", emailError)
        // Don't fail the whole operation if email fails
      }
    }

    revalidatePath("/admin/land-submissions")
    return { success: true }
  } catch (error) {
    console.error("Error providing feedback:", error)
    return { error: "Failed to provide feedback" }
  }
}

/**
 * Create a new land submission
 */
export async function createLandSubmission(formData: FormData) {
  try {
    // Validate the user is authenticated
    const session = await auth()
    if (!session || !session.user.id) {
      return { error: "Unauthorized" }
    }

    const userId = session.user.id
    
    // Extract data from FormData
    const location = formData.get("location") as string
    const size = formData.get("size") as string
    const titleType = formData.get("titleType") as string
    const currentUse = formData.get("currentUse") as string
    const description = formData.get("description") as string
    
    // Handle document and plan URLs that might be pre-uploaded
    const documentsStr = formData.get("documents") as string
    const plansStr = formData.get("plans") as string
    
    let documents: string[] = []
    let plans: string[] = []
    
    try {
      if (documentsStr) documents = JSON.parse(documentsStr)
      if (plansStr) plans = JSON.parse(plansStr)
    } catch (error) {
      console.error("Error parsing JSON:", error)
    }
    
    // Validate the data
    const validatedData = createLandSubmissionSchema.safeParse({
      location,
      size,
      titleType,
      currentUse,
      description,
      documents,
      plans
    })

    if (!validatedData.success) {
      return { 
        error: "Invalid submission data", 
        issues: validatedData.error.issues 
      }
    }
    
    // Create the land submission
    const submission = await db.landSubmission.create({
      data: {
        ...validatedData.data,
        userId,
      },
    })

    revalidatePath("/land-submissions")
    return { success: true, submission }
  } catch (error) {
    console.error("Error creating land submission:", error)
    return { error: "Failed to create land submission" }
  }
}

/**
 * Delete a land submission
 */
export async function deleteLandSubmission(id: string) {
  try {
    // Validate the user is authenticated and is an admin
    const session = await auth()
    if (!session) {
      return { error: "Unauthorized" }
    }
    
    // Check if the user is admin or the owner of the submission
    if (session.user.role !== "ADMIN") {
      const submission = await db.landSubmission.findUnique({
        where: { id },
        select: { userId: true },
      })
      
      if (!submission || submission.userId !== session.user.id) {
        return { error: "Unauthorized" }
      }
    }

    await db.landSubmission.delete({
      where: { id },
    })

    revalidatePath("/admin/land-submissions")
    revalidatePath("/land-submissions")
    return { success: true }
  } catch (error) {
    console.error("Error deleting land submission:", error)
    return { error: "Failed to delete land submission" }
  }
}

/**
 * Upload plans for a land submission
 */
export async function uploadLandSubmissionPlans(id: string, plans: string[]) {
  try {
    // Validate the user is authenticated and is an admin
    const session = await auth()
    if (!session || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Check if the submission exists
    const submission = await db.landSubmission.findUnique({
      where: { id },
    })

    if (!submission) {
      return { error: "Land submission not found" }
    }

    // Update the plans
    await db.landSubmission.update({
      where: { id },
      data: {
        plans,
      },
    })

    revalidatePath("/admin/land-submissions")
    return { success: true }
  } catch (error) {
    console.error("Error uploading plans:", error)
    return { error: "Failed to upload plans" }
  }
}

/**
 * Create a new land submission for public users (no authentication required)
 */
export async function submitLandPublic(data: {
  name: string
  email: string
  phone: string
  location: string
  size: string
  titleType: string
  currentUse?: string
  description: string
  developmentPreferences?: string
  documents?: string[]
  plans?: string[]
}) {
  try {
    // console.log("submitLandPublic called with data:", JSON.stringify(data, null, 2))
    // console.log("Data types:", Object.entries(data).map(([key, value]) => `${key}: ${typeof value}`))
    
    const validatedData = z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      phone: z.string().min(10, "Phone number must be at least 10 characters"),
      location: z.string().min(10, "Location must be at least 10 characters"),
      size: z.string().min(1, "Land size is required"),
      titleType: z.string().min(1, "Title type is required"),
      currentUse: z.union([z.string(), z.undefined()]).optional(),
      description: z.string().min(20, "Description must be at least 20 characters"),
      developmentPreferences: z.union([z.string(), z.undefined()]).optional(),
      documents: z.array(z.string()).optional(),
      plans: z.array(z.string()).optional(),
    }).safeParse(data)

    // console.log("Validation result:", {
    //   success: validatedData.success,
    //   error: validatedData.success ? null : validatedData.error?.issues
    // })

    if (!validatedData.success) {
      console.error("Validation errors:", validatedData.error.issues)
      return { 
        error: "Invalid submission data", 
        issues: validatedData.error.issues,
        details: validatedData.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ')
      }
    }

    const { name, email, phone, location, size, titleType, currentUse, description, developmentPreferences, documents, plans } = validatedData.data

    // Create a comprehensive description that includes contact info
    const fullDescription = `Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Land Description:
${description}

${developmentPreferences ? `Development Preferences:
${developmentPreferences}` : ''}`

    // Create the land submission without userId (for anonymous submissions)
    const submission = await db.landSubmission.create({
      data: {
        location,
        size,
        titleType,
        currentUse: currentUse || undefined,
        description: fullDescription,
        documents: documents || [],
        plans: plans || [],
        status: "Pending",
      },
    })

    // Send email notification to admins about new submission
    try {
      await sendLandSubmissionNotificationEmail({
        submissionId: submission.id,
        name,
        email,
        phone,
        location,
        size,
        titleType,
        description,
      })
    } catch (emailError) {
      console.error("Error sending admin notification email:", emailError)
      // Don't fail the submission if email fails
    }

    revalidatePath("/admin/land-submissions")
    return { 
      success: "Land submission received successfully! Our team will review and contact you within 3-5 business days.",
      submissionId: submission.id
    }
  } catch (error) {
    console.error("Error creating public land submission:", error)
    return { error: "Failed to submit land. Please try again." }
  }
}
