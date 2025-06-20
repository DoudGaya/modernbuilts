"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

/**
 * Get all wishlist items for the current user
 */
export async function getUserWishlist() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    const wishlistItems = await db.wishlist.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        propertyListing: {
          select: {
            id: true,
            title: true,
            location: true,
            price: true,
            coverImage: true,
            city: true,
            state: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, wishlistItems }
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return { error: "Failed to fetch wishlist" }
  }
}

/**
 * Add item to wishlist
 */
export async function addToWishlist(listingId: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    // Check if the listing exists
    const listing = await db.propertyListing.findUnique({
      where: { id: listingId },
    })

    if (!listing) {
      return { error: "Property listing not found" }
    }    // Check if already in wishlist
    const existingItem = await db.wishlist.findFirst({
      where: {
        userId: session.user.id,
        listingId,
      },
    })

    if (existingItem) {
      return { error: "Already in wishlist" }
    }

    // Add to wishlist
    await db.wishlist.create({
      data: {
        userId: session.user.id,
        listingId,
      },
    })

    revalidatePath("/user/wishlist")
    revalidatePath("/properties")
    
    return { success: true }
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return { error: "Failed to add to wishlist" }
  }
}

/**
 * Remove item from wishlist
 */
export async function removeFromWishlist(listingId: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }    // Remove from wishlist
    await db.wishlist.deleteMany({
      where: {
        userId: session.user.id,
        listingId,
      },
    })

    revalidatePath("/user/wishlist")
    revalidatePath("/properties")
    
    return { success: true }
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    return { error: "Failed to remove from wishlist" }
  }
}

/**
 * Check if an item is in the user's wishlist
 */
export async function isInWishlist(listingId: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { inWishlist: false }
    }    const wishlistItem = await db.wishlist.findFirst({
      where: {
        userId: session.user.id,
        listingId,
      },
    })

    return { inWishlist: !!wishlistItem }
  } catch (error) {
    console.error("Error checking wishlist:", error)
    return { error: "Failed to check wishlist", inWishlist: false }
  }
}
