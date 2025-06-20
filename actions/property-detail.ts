"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function getPropertyById(id: string) {
  try {
    // Get current user to check wishlist status
    const session = await auth();
    const userId = session?.user?.id;
    
    // First, fetch the property
    const property = await db.propertyListing.findUnique({
      where: { id },
    });
    
    if (!property) {
      return { error: "Property not found" };
    }
    
    // Then check if it's in the user's wishlist
    let isInWishlist = false;
    
    if (userId) {
      const wishlistItem = await db.wishlist.findFirst({
        where: {
          userId,
          listingId: id,
        },
      });
      
      isInWishlist = !!wishlistItem;
    }
    
    // Add isInWishlist flag
    const transformedProperty = {
      ...property,
      isInWishlist,
    };
    
    return { property: transformedProperty };
  } catch (error) {
    console.error("Error fetching property:", error);
    return { error: "Failed to fetch property" };
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    // Get current user to check wishlist status
    const session = await auth();
    const userId = session?.user?.id;
    
    // First, fetch the property
    const property = await db.propertyListing.findUnique({
      where: { slug },
    });
    
    if (!property) {
      return { error: "Property not found" };
    }
    
    // Then check if it's in the user's wishlist
    let isInWishlist = false;
    
    if (userId) {
      const wishlistItem = await db.wishlist.findFirst({
        where: {
          userId,
          listingId: property.id,
        },
      });
      
      isInWishlist = !!wishlistItem;
    }
    
    // Add isInWishlist flag
    const transformedProperty = {
      ...property,
      isInWishlist,
    };
    
    return { property: transformedProperty };
  } catch (error) {
    console.error("Error fetching property:", error);
    return { error: "Failed to fetch property" };
  }
}
