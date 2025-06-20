"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Trash2, Loader2 } from "lucide-react"
import { getUserWishlist, removeFromWishlist } from "@/actions/wishlist"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

type WishlistItem = {
  id: string;
  userId: string;
  listingId: string;
  propertyListing: {
    id: string;
    title: string;
    location: string;
    price: number;
    coverImage: string;
    city: string;
    state: string;
    slug: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export const UserWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    setLoading(true)
    try {
      const result = await getUserWishlist()
      if (result.success) {
        setItems(result.wishlistItems)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load wishlist",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading wishlist:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleRemoveFromWishlist = async (listingId: string) => {
    setRemoving(listingId)
    try {
      const result = await removeFromWishlist(listingId)
      if (result.success) {
        toast({
          title: "Success",
          description: "Property removed from wishlist",
        })
        // Update the local state to remove the item
        setItems((prev) => prev.filter(item => item.propertyListing.id !== listingId))
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to remove from wishlist",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
    setRemoving(null)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Wishlist</CardTitle>
            <CardDescription>Properties you're interested in</CardDescription>
          </div>
          <Link href="/user/wishlist">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {items.length > 0 ? (
              items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.propertyListing.coverImage || "/placeholder.svg"}
                    alt={item.propertyListing.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.propertyListing.title}</h4>
                    <p className="text-xs text-gray-600">{item.propertyListing.location}</p>
                    <p className="text-sm font-semibold text-green-600">
                      {formatCurrency(item.propertyListing.price)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link href={`/properties/${item.propertyListing.slug}`}>
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </Link>                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 px-2 text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveFromWishlist(item.propertyListing.id)}
                      disabled={removing === item.propertyListing.id}
                    >
                      {removing === item.propertyListing.id ? 
                        <Loader2 className="w-3 h-3 animate-spin" /> : 
                        <Trash2 className="w-3 h-3" />
                      }
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Heart className="w-10 h-10 mx-auto mb-2 opacity-20" />
                <p>Your wishlist is empty</p>
                <Link href="/properties">
                  <Button variant="link" className="mt-2">
                    Browse Properties
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
