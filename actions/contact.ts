"use server"
import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { sendContactNotificationEmail, sendContactResponseEmail } from "@/lib/mail"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const userContactSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

export const createContact = async (values: z.infer<typeof contactSchema>) => {
  try {
    const validatedFields = contactSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { name, email, phone, subject, message } = validatedFields.data

    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "Unread"
      }
    })

    // Send notification email to admins
    await sendContactNotificationEmail({
      contactId: contact.id,
      name,
      email,
      phone: phone || "",
      subject,
      message
    })

    return { success: "Message sent successfully! We'll get back to you soon." }
  } catch (error) {
    console.error("Contact creation error:", error)
    return { error: "Failed to send message" }
  }
}

export const createUserContact = async (values: z.infer<typeof userContactSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return { error: "You must be logged in to send a message" }
    }

    const validatedFields = userContactSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { subject, category, priority, message } = validatedFields.data

    const contact = await db.contact.create({
      data: {
        name: user.name || "Unknown User",
        email: user.email || "",
        subject: `[${category}] ${subject}`,
        message: `Priority: ${priority}\nCategory: ${category}\n\n${message}`,
        status: "Unread",
        userId: user.id,
        category,
        priority
      }
    })

    // Send notification email to admins
    await sendContactNotificationEmail({
      contactId: contact.id,
      name: user.name || "Unknown User",
      email: user.email || "",
      phone: "",
      subject: `[${category}] ${subject}`,
      message: `Priority: ${priority}\nCategory: ${category}\nUser ID: ${user.id}\n\n${message}`
    })

    return { success: "Message sent successfully! Our support team will respond within 24 hours." }
  } catch (error) {
    console.error("User contact creation error:", error)
    return { error: "Failed to send message" }
  }
}

export const getAllContacts = async (filters?: {
  status?: string
  search?: string
  category?: string
  priority?: string
}) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }    const where: any = {}

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status
    }

    if (filters?.category && filters.category !== "all") {
      where.category = filters.category
    }

    if (filters?.priority && filters.priority !== "all") {
      where.priority = filters.priority
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
        { subject: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const contacts = await db.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return { success: true, contacts }
  } catch (error) {
    console.error("Contacts fetch error:", error)
    return { error: "Failed to fetch contacts" }
  }
}

export const updateContactStatus = async (id: string, status: string) => {
  try {
    const contact = await db.contact.update({
      where: { id },
      data: { status },
    })

    revalidatePath("/admin/contacts")
    return { success: true, contact }
  } catch (error) {
    console.error("Contact update error:", error)
    return { error: "Failed to update contact" }
  }
}

export const deleteContact = async (id: string) => {
  try {
    await db.contact.delete({
      where: { id },
    })

    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error) {
    console.error("Contact deletion error:", error)
    return { error: "Failed to delete contact" }
  }
}

export const getContactById = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const contact = await db.contact.findUnique({
      where: { id }
    })

    if (!contact) {
      return { error: "Contact not found" }
    }

    // Mark as read when viewed
    if (contact.status === "Unread") {
      await db.contact.update({
        where: { id },
        data: { status: "Read" }
      })
    }

    return { contact }
  } catch (error) {
    console.error("Error fetching contact:", error)
    return { error: "Failed to fetch contact" }
  }
}

export const respondToContact = async (id: string, response: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    if (!response.trim()) {
      return { error: "Response cannot be empty" }
    }    const contact = await db.contact.update({
      where: { id },
      data: {
        status: "Responded",
        response: response,
        respondedAt: new Date()
      }
    })

    // Send response email to user
    await sendContactResponseEmail({
      userEmail: contact.email,
      userName: contact.name,
      subject: contact.subject,
      response: response,
      originalMessage: contact.message
    })

    revalidatePath("/admin/contacts")
    revalidatePath(`/admin/contacts/${id}`)
    return { success: "Response sent successfully!" }
  } catch (error) {
    console.error("Error responding to contact:", error)
    return { error: "Failed to send response" }
  }
}
