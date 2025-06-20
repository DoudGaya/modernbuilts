"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Eye,
  Loader2,
  ExternalLink
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getListingById, deleteListing } from "@/actions/listing"
import { PropertyListing } from "@/types/admin"

export default function ListingViewPage() {
  const params = useParams()
  const router = useRouter()
  const [listing, setListing] = useState<PropertyListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const listingId = params.id as string

  useEffect(() => {
    if (listingId) {
      loadListing()
    }
  }, [listingId])

  const loadListing = async () => {
    setLoading(true)
    try {
      const result = await getListingById(listingId)
      if (result.success && result.listing) {
        setListing(result.listing)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load listing",
          variant: "destructive",
        })
        router.push("/admin/listings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load listing",
        variant: "destructive",
      })
      router.push("/admin/listings")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!listing) return
    
    if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    try {
      const result = await deleteListing(listing.id)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      })
      router.push("/admin/listings")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
        <p className="text-gray-600 mb-4">The listing you're looking for doesn't exist.</p>
        <Link href="/admin/listings">
          <Button>Back to Listings</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Link href="/admin/listings">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <p className="text-gray-600 flex items-center mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              {listing.location}, {listing.city}, {listing.state}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/property/${listing.slug}`} target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Public
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/admin/listings/edit/${listing.id}`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cover Image */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={listing.coverImage || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <Badge className={listing.type === "For Sale" ? "bg-green-500" : "bg-blue-500"}>
                    {listing.type}
                  </Badge>
                  <Badge className="bg-black/70 text-white">
                    {listing.category}
                  </Badge>
                  <Badge 
                    variant={listing.status === "Active" ? "default" : "secondary"}
                    className={
                      listing.status === "Active" 
                        ? "bg-green-600" 
                        : listing.status === "Sold" 
                        ? "bg-red-600" 
                        : "bg-yellow-600"
                    }
                  >
                    {listing.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          {listing.images && listing.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${listing.title} - Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{listing.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {listing.features && listing.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {listing.features.map((feature: string, index: number) => (
                    <Badge key={index} variant="secondary" className="justify-start">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{listing.price.toLocaleString()}
                </p>
              </div>

              <Separator />

              {(listing.bedrooms || listing.bathrooms || listing.area) && (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {listing.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">
                          {listing.bedrooms} Bedroom{listing.bedrooms !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    {listing.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">
                          {listing.bathrooms} Bathroom{listing.bathrooms !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    {listing.area && (
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">{listing.area}</span>
                      </div>
                    )}
                  </div>
                  <Separator />
                </>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm font-medium">{listing.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium">{listing.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="text-sm font-medium">{listing.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Address:</span>
                <span className="text-sm font-medium text-right">{listing.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">City:</span>
                <span className="text-sm font-medium">{listing.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">State:</span>
                <span className="text-sm font-medium">{listing.state}</span>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Listing ID:</span>
                <span className="text-sm font-medium font-mono">{listing.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm font-medium">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Updated:</span>
                <span className="text-sm font-medium">
                  {new Date(listing.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
