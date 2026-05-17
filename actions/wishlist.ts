"use server";

export async function addToWishlist(projectId: string) {
  return { success: "Added to wishlist" };
}

export async function removeFromWishlist(projectId: string) {
  return { success: "Removed from wishlist" };
}
