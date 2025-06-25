"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  type: z.string().min(1, "Event type is required"),
  maxAttendees: z.number().optional(),
  registrationDeadline: z.string().optional(),
  image: z.string().optional(),
  isPublic: z.boolean().default(true),
})

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
})

export const createEvent = async (values: z.infer<typeof eventSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const validatedFields = eventSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { title, description, date, time, location, type, maxAttendees, registrationDeadline, image, isPublic } = validatedFields.data

    const event = await db.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        type,
        maxAttendees: maxAttendees || null,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        image: image || null,
        isPublic,
        createdBy: user.id,
      }
    })

    revalidatePath("/admin/events")
    revalidatePath("/investor-relations")

    return { success: "Event created successfully!", event }
  } catch (error) {
    console.error("Event creation error:", error)
    return { error: "Failed to create event" }
  }
}

export const getAllEvents = async (filters?: {
  status?: string
  type?: string
  search?: string
}) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const where: any = {}

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status
    }

    if (filters?.type && filters.type !== "all") {
      where.type = filters.type
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { location: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const events = await db.event.findMany({
      where,
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          }
        },
        registrations: {
          select: {
            id: true,
            status: true,
          }
        },
        _count: {
          select: {
            registrations: true,
          }
        }
      },
      orderBy: { date: "desc" },
    })

    return { success: true, events }
  } catch (error) {
    console.error("Events fetch error:", error)
    return { error: "Failed to fetch events" }
  }
}

export const getPublicEvents = async () => {
  try {
    const events = await db.event.findMany({
      where: {
        isPublic: true,
        status: "Active",
        date: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        time: true,
        location: true,
        type: true,
        maxAttendees: true,
        registrationDeadline: true,
        image: true,
        _count: {
          select: {
            registrations: true,
          }
        }
      },
      orderBy: { date: "asc" },
    })

    return { success: true, events }
  } catch (error) {
    console.error("Public events fetch error:", error)
    return { error: "Failed to fetch events" }
  }
}

export const getEventById = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const event = await db.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            name: true,
            email: true,
          }
        },
        registrations: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              }
            }
          },
          orderBy: { registeredAt: "desc" }
        },
      }
    })

    if (!event) {
      return { error: "Event not found" }
    }

    return { success: true, event }
  } catch (error) {
    console.error("Error fetching event:", error)
    return { error: "Failed to fetch event" }
  }
}

export const updateEvent = async (id: string, values: z.infer<typeof eventSchema>) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const validatedFields = eventSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { title, description, date, time, location, type, maxAttendees, registrationDeadline, image, isPublic } = validatedFields.data

    const event = await db.event.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        type,
        maxAttendees: maxAttendees || null,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        image: image || null,
        isPublic,
      }
    })

    revalidatePath("/admin/events")
    revalidatePath(`/admin/events/${id}`)
    revalidatePath("/investor-relations")

    return { success: "Event updated successfully!", event }
  } catch (error) {
    console.error("Event update error:", error)
    return { error: "Failed to update event" }
  }
}

export const deleteEvent = async (id: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    await db.event.delete({
      where: { id }
    })

    revalidatePath("/admin/events")
    revalidatePath("/investor-relations")

    return { success: "Event deleted successfully!" }
  } catch (error) {
    console.error("Event deletion error:", error)
    return { error: "Failed to delete event" }
  }
}

export const registerForEvent = async (eventId: string, values: z.infer<typeof registrationSchema>) => {
  try {
    const user = await currentUser()
    const validatedFields = registrationSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { name, email, phone, company } = validatedFields.data

    // Check if event exists and is open for registration
    const event = await db.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            registrations: true,
          }
        }
      }
    })

    if (!event) {
      return { error: "Event not found" }
    }

    if (event.status !== "Active") {
      return { error: "Event is not accepting registrations" }
    }

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return { error: "Registration deadline has passed" }
    }

    if (event.maxAttendees && event._count.registrations >= event.maxAttendees) {
      return { error: "Event is full" }
    }

    // Check for duplicate registration
    const existingRegistration = await db.eventRegistration.findFirst({
      where: {
        eventId,
        OR: [
          { userId: user?.id },
          { email }
        ]
      }
    })

    if (existingRegistration) {
      return { error: "You are already registered for this event" }
    }

    const registration = await db.eventRegistration.create({
      data: {
        eventId,
        userId: user?.id || null,
        name,
        email,
        phone: phone || null,
        company: company || null,
      }
    })

    return { success: "Successfully registered for the event!", registration }
  } catch (error) {
    console.error("Event registration error:", error)
    return { error: "Failed to register for event" }
  }
}

export const updateRegistrationStatus = async (registrationId: string, status: string) => {
  try {
    const user = await currentUser()

    if (!user?.id || user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const registration = await db.eventRegistration.update({
      where: { id: registrationId },
      data: { status }
    })

    revalidatePath("/admin/events")

    return { success: "Registration status updated!", registration }
  } catch (error) {
    console.error("Registration update error:", error)
    return { error: "Failed to update registration status" }
  }
}
