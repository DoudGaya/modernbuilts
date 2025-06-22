"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function getPropertyListings({
  page = 1,
  limit = 9,
  category,
  type,
  location,
  bedrooms,
  priceRange,
}: {
  page?: number;
  limit?: number;
  category?: string;
  type?: string;
  location?: string;
  bedrooms?: string;
  priceRange?: string;
}) {
  try {
    const skip = (page - 1) * limit;
      // Build where conditions based on filters
    const where: any = {
      status: "Active", // Use 'status' instead of 'published'
    };
    
    if (category && category !== "all") {
      where.category = category;
    }
    
    if (type && type !== "all") {
      where.type = type; // Use 'type' instead of 'listingType'
    }
    
    if (location && location !== "all") {
      where.OR = [
        { city: { contains: location, mode: 'insensitive' } },
        { state: { contains: location, mode: 'insensitive' } },
        { location: { contains: location, mode: 'insensitive' } },
      ];
    }
    
    if (bedrooms && bedrooms !== "all") {
      where.bedrooms = { gte: parseInt(bedrooms.toString()) };
    }
    
    if (priceRange && priceRange !== "all") {
      // Parse price range like "0-50m" or "200m+"
      if (priceRange.includes('-')) {
        const [min, max] = priceRange
          .replace('m', '000000')
          .split('-')
          .map(val => parseFloat(val));
          
        where.price = {
          gte: min,
          lte: max
        };
      } else if (priceRange.includes('+')) {
        const min = parseFloat(priceRange.replace('m+', '000000'));
        where.price = { gte: min };
      }
    }

    // Get current user to check wishlist status
    const session = await auth();
    const userId = session?.user?.id;
      // Get properties with pagination
    const [properties, totalCount] = await Promise.all([
      db.propertyListing.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          price: true,
          coverImage: true,
          location: true,
          city: true,
          state: true,
          bedrooms: true,
          bathrooms: true,
          area: true,
          features: true,
          type: true,
          category: true,
          createdAt: true,
        },
      }),
      db.propertyListing.count({ where }),
    ]);
    
    // Get user's wishlist items if logged in
    let userWishlistMap: Record<string, boolean> = {};
    
    if (userId) {
      const userWishlistItems = await db.wishlist.findMany({
        where: { 
          userId,
          listingId: { 
            in: properties.map(p => p.id) 
          }
        },
        select: { listingId: true },
      });
      
      userWishlistMap = userWishlistItems.reduce((acc, item) => {
        acc[item.listingId] = true;
        return acc;
      }, {} as Record<string, boolean>);
    }
    
    // Transform properties to include wishlist status
    const transformedProperties = properties.map(property => ({
      ...property,
      isInWishlist: !!userWishlistMap[property.id],
    }));
    
    return { 
      properties: transformedProperties, 
      totalCount, 
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { error: "Failed to fetch properties" };
  }
}

export async function getPropertyBySlug(slug: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const property = await db.propertyListing.findFirst({
      where: {
        slug: slug,
        status: "Active"
      }
    });

    if (!property) {
      return { success: false, error: "Property not found" };
    }

    // Check if property is in user's wishlist if logged in
    let isInWishlist = false;
    if (userId) {
      const wishlistItem = await db.wishlist.findFirst({
        where: {
          userId,
          listingId: property.id
        }
      });
      isInWishlist = !!wishlistItem;
    }

    const transformedProperty = {
      ...property,
      isInWishlist
    };

    return { success: true, property: transformedProperty };
  } catch (error) {
    console.error("Error fetching property:", error);
    return { success: false, error: "Failed to fetch property" };
  }
}
