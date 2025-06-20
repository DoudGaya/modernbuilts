"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Loader2, ArrowLeft, Trash2, Heart } from "lucide-react"
import { WishlistButton } from "@/components/user/WishlistButton"
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

export default function WishlistPage() {
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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/user">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden group">
                      <div className="relative h-48">
                        <img
                          src={item.propertyListing.coverImage || "/placeholder.svg"}
                          alt={item.propertyListing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{item.propertyListing.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {item.propertyListing.location}
                        </p>
                        <p className="text-lg font-semibold text-green-600 mb-3">
                          {formatCurrency(item.propertyListing.price)}
                        </p>
                        <div className="flex gap-2">
                          <Link href={`/properties/${item.propertyListing.slug}`} className="flex-1">
                            <Button size="sm" className="w-full">
                              <Eye className="w-3 h-3 mr-1" /> View Property
                            </Button>
                          </Link>                          <WishlistButton
                            listingId={item.propertyListing.id}
                            initialState={true}
                            onWishlistChange={(inWishlist) => {
                              if (!inWishlist) {
                                // If removed, update the local state to remove the item
                                setItems((prev) => prev.filter(i => i.propertyListing.id !== item.propertyListing.id))
                              }
                            }}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (                <div className="text-center py-12 px-4">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Save properties you're interested in to compare them later or keep track of price changes
                  </p>
                  <Link href="/properties">
                    <Button>
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
