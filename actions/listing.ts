"use server"
import { propertyListingSchema } from "@/lib/schema"
import { db } from "@/lib/db"
import { uploadToS3, deleteFromS3 } from "@/lib/s3"
import { revalidatePath } from "next/cache"
import { sendBulkEmail } from "@/lib/mail"

export const createListing = async (formData: FormData) => {
  try {
    // Extract and validate form data
    const title = formData.get("title") as string
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const description = formData.get("description") as string
    const price = Number.parseInt(formData.get("price") as string)
    const location = formData.get("location") as string
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const bedrooms = formData.get("bedrooms") ? Number.parseInt(formData.get("bedrooms") as string) : undefined
    const bathrooms = formData.get("bathrooms") ? Number.parseInt(formData.get("bathrooms") as string) : undefined
    const area = (formData.get("area") as string) || undefined
    const type = formData.get("type") as string
    const category = formData.get("category") as string
    const features = JSON.parse((formData.get("features") as string) || "[]")
    const status = (formData.get("status") as string) || "Active"
    const notifyUsers = formData.get("notifyUsers") === "on"

    // Get image URLs - either from pre-uploaded files or direct uploads
    let coverImageUrl: string;
    let imageUrls: string[] = [];
    
    // Check if we're using the new approach with pre-uploaded URLs
    const preUploadedCoverUrl = formData.get("coverImageUrl") as string;
    const imageUrlsStr = formData.get("imageUrls") as string;
    
    if (preUploadedCoverUrl) {
      // New approach - URLs are already provided
      console.log("Using pre-uploaded cover image URL");
      coverImageUrl = preUploadedCoverUrl;
      
      if (imageUrlsStr) {
        try {
          imageUrls = JSON.parse(imageUrlsStr);
          console.log(`Found ${imageUrls.length} pre-uploaded image URLs`);
        } catch (parseError) {
          console.error("Error parsing imageUrls JSON:", parseError);
        }
      }
    } else {
      // Traditional approach - handling direct file uploads
      console.log("Using traditional file upload approach");
      const coverImageFile = formData.get("coverImage") as File;
      const imageFiles = formData.getAll("images") as File[];
      
      if (coverImageFile) {
        coverImageUrl = await uploadToS3(coverImageFile, "listings/covers");
      } else {
        coverImageUrl = "placeholder.jpg";
      }
      
      if (imageFiles && imageFiles.length > 0) {
        imageUrls = await Promise.all(
          imageFiles.map((file) => uploadToS3(file, "listings/images"))
        );
      }
    }

    // Validate data
    const validatedFields = propertyListingSchema.safeParse({
      title,
      description,
      price,
      location,
      state,
      city,
      bedrooms,
      bathrooms,
      area,
      type,
      category,
      features,
      coverImage: coverImageUrl || "placeholder.jpg",
      images: imageUrls.length > 0 ? imageUrls : ["placeholder.jpg"],
      status,
    })

    if (!validatedFields.success) {
      return { error: "Invalid fields", issues: validatedFields.error.issues }
    }

    // Create listing in database
    const listing = await db.propertyListing.create({
      data: {
        title,
        slug,
        description,
        price,
        location,
        state,
        city,
        bedrooms,
        bathrooms,
        area,
        type,
        category,
        features,
        coverImage: coverImageUrl,
        images: imageUrls,
        status,
      },
    })

    // Send notification emails if checkbox is checked
    if (notifyUsers) {
      await sendListingNotificationEmails(listing)
    }

    revalidatePath("/admin/listings")
    return { success: true, listing }
  } catch (error) {
    console.error("Listing creation error:", error)
    return { error: "Failed to create listing" }
  }
}

// Helper function to send notification emails to all users
async function sendListingNotificationEmails(listing: any) {
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
      name: user.name || "Valued Customer"
    }))

    if (recipients.length > 0) {
      // Format price with commas for thousands
      const formattedPrice = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(listing.price)

      // Create email content
      const subject = `New Property Listing: ${listing.title}`
      const message = `
        <p>We're excited to announce a new property listing that might interest you:</p>
        
        <h3>${listing.title}</h3>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Type:</strong> ${listing.type}</p>
        <p><strong>Category:</strong> ${listing.category}</p>
        <p><strong>Location:</strong> ${listing.location}, ${listing.city}, ${listing.state}</p>
        
        ${listing.bedrooms ? `<p><strong>Bedrooms:</strong> ${listing.bedrooms}</p>` : ''}
        ${listing.bathrooms ? `<p><strong>Bathrooms:</strong> ${listing.bathrooms}</p>` : ''}
        ${listing.area ? `<p><strong>Area:</strong> ${listing.area} sqm</p>` : ''}
        
        <p>${listing.description.substring(0, 200)}${listing.description.length > 200 ? '...' : ''}</p>
        
        <p>Visit our website to learn more about this property and schedule a viewing!</p>
        <a href="https://stablebricks.com/properties/${listing.id}" style="background-color: #f7d046; color: #000; text-decoration: none; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 15px;">View Property</a>
      `

      // Send bulk email
      await sendBulkEmail(recipients, subject, message)
    }
  } catch (error) {
    console.error("Failed to send listing notification emails:", error)
  }
}

export const updateListing = async (id: string, formData: FormData) => {
  try {
    // Find existing listing
    const existingListing = await db.propertyListing.findUnique({
      where: { id },
    })

    if (!existingListing) {
      return { error: "Listing not found" }
    }

    // Extract and validate form data
    const title = formData.get("title") as string
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const description = formData.get("description") as string
    const price = Number.parseInt(formData.get("price") as string)
    const location = formData.get("location") as string
    const state = formData.get("state") as string
    const city = formData.get("city") as string
    const bedrooms = formData.get("bedrooms") ? Number.parseInt(formData.get("bedrooms") as string) : undefined
    const bathrooms = formData.get("bathrooms") ? Number.parseInt(formData.get("bathrooms") as string) : undefined
    const area = (formData.get("area") as string) || undefined
    const type = formData.get("type") as string
    const category = formData.get("category") as string
    const features = JSON.parse((formData.get("features") as string) || "[]")
    const status = (formData.get("status") as string) || "Active"

    // Handle image updates
    let coverImageUrl = existingListing.coverImage
    let imageUrls = existingListing.images || []

    // Check if new image URLs are provided
    const preUploadedCoverUrl = formData.get("coverImageUrl") as string
    const imageUrlsStr = formData.get("imageUrls") as string

    if (preUploadedCoverUrl) {
      coverImageUrl = preUploadedCoverUrl
    }

    if (imageUrlsStr) {
      try {
        imageUrls = JSON.parse(imageUrlsStr)
      } catch (parseError) {
        console.error("Error parsing imageUrls JSON:", parseError)
      }
    }

    // Handle traditional file uploads if provided
    const coverImageFile = formData.get("coverImage") as File
    const imageFiles = formData.getAll("images") as File[]

    if (coverImageFile && coverImageFile.size > 0) {
      // Delete old cover image if it's not a placeholder
      if (existingListing.coverImage !== "placeholder.jpg") {
        await deleteFromS3(existingListing.coverImage)
      }
      coverImageUrl = await uploadToS3(coverImageFile, "listings/covers")
    }

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      // Delete old images if they're not placeholders
      await Promise.all(
        existingListing.images
          .filter(img => img !== "placeholder.jpg")
          .map(img => deleteFromS3(img))
      )
      imageUrls = await Promise.all(
        imageFiles.map(file => uploadToS3(file, "listings/images"))
      )
    }

    // Validate data
    const validatedFields = propertyListingSchema.safeParse({
      title,
      description,
      price,
      location,
      state,
      city,
      bedrooms,
      bathrooms,
      area,
      type,
      category,
      features,
      coverImage: coverImageUrl,
      images: imageUrls,
      status,
    })

    if (!validatedFields.success) {
      return { error: "Invalid fields", issues: validatedFields.error.issues }
    }

    // Update listing in database
    const listing = await db.propertyListing.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        price,
        location,
        state,
        city,
        bedrooms,
        bathrooms,
        area,
        type,
        category,
        features,
        coverImage: coverImageUrl,
        images: imageUrls,
        status,
      },
    })

    revalidatePath(`/admin/listings/${id}`)
    revalidatePath("/admin/listings")
    return { success: true, listing }
  } catch (error) {
    console.error("Listing update error:", error)
    return { error: "Failed to update listing" }
  }
}

export const deleteListing = async (id: string) => {
  try {
    // Find listing to get file URLs
    const listing = await db.propertyListing.findUnique({
      where: { id },
    })

    if (!listing) {
      return { error: "Listing not found" }
    }

    // Delete files from S3
    await deleteFromS3(listing.coverImage)
    await Promise.all(listing.images.map((image) => deleteFromS3(image)))

    // Delete listing from database
    await db.propertyListing.delete({
      where: { id },
    })

    revalidatePath("/admin/listings")
    return { success: true }
  } catch (error) {
    console.error("Listing deletion error:", error)
    return { error: "Failed to delete listing" }
  }
}

export const getListingById = async (id: string) => {
  try {
    const listing = await db.propertyListing.findUnique({
      where: { id },
    })

    if (!listing) {
      return { error: "Listing not found" }
    }

    return { success: true, listing }
  } catch (error) {
    console.error("Listing fetch error:", error)
    return { error: "Failed to fetch listing" }
  }
}

export const getAllListings = async (filters?: {
  status?: string
  type?: string
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}) => {
  try {
    const where: any = {}

    if (filters?.status && filters.status !== "all") {
      where.status = filters.status
    }

    if (filters?.type && filters.type !== "all") {
      where.type = filters.type
    }

    if (filters?.category && filters.category !== "all") {
      where.category = filters.category
    }

    if (filters?.minPrice) {
      where.price = { ...where.price, gte: filters.minPrice }
    }

    if (filters?.maxPrice) {
      where.price = { ...where.price, lte: filters.maxPrice }
    }

    if (filters?.bedrooms) {
      where.bedrooms = { gte: filters.bedrooms }
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { location: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const listings = await db.propertyListing.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return { success: true, listings }
  } catch (error) {
    console.error("Listings fetch error:", error)
    return { error: "Failed to fetch listings" }
  }
}
