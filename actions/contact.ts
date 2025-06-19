"use server"
import { contactSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createContact = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    const validatedFields = contactSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    })

    if (!validatedFields.success) {
      return { error: "Invalid fields", issues: validatedFields.error.issues }
    }

    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    })

    return { success: true, contact }
  } catch (error) {
    console.error("Contact creation error:", error)
    return { error: "Failed to create contact" }
  }
}

export const getAllContacts = async (filters?: {
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
