"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2, Bed, Bath, Square, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { deleteListing } from "@/actions/listing"

// This would come from your API/database
const listings = [
  {
    id: "1",
    title: "Modern 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: 85000000,
    type: "For Sale",
    category: "Residential",
    bedrooms: 4,
    bathrooms: 5,
    area: "450 sqm",
    status: "Active",
    coverImage: "/placeholder.svg?height=250&width=400",
    features: ["Swimming Pool", "BQ", "Fitted Kitchen", "Parking"],
  },
  {
    id: "2",
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: 120000000,
    type: "For Sale",
    category: "Residential",
    bedrooms: 3,
    bathrooms: 4,
    area: "280 sqm",
    status: "Active",
    coverImage: "/placeholder.svg?height=250&width=400",
    features: ["Ocean View", "Gym", "24/7 Security", "Generator"],
  },
  {
    id: "3",
    title: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    price: 45000000,
    type: "For Rent",
    category: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    area: "200 sqm",
    status: "Active",
    coverImage: "/placeholder.svg?height=250&width=400",
    features: ["Elevator", "Conference Room", "Parking", "Generator"],
  },
]

export default function ListingsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || listing.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || listing.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || listing.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      const result = await deleteListing(id)

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

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Property Listings</h1>
          <p className="text-gray-600">Manage all property listings</p>
        </div>
        <Link href="/admin/listings/create">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search listings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="for sale">For Sale</SelectItem>
                <SelectItem value="for rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={listing.coverImage || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <Badge
                className={`absolute top-4 right-4 ${listing.type === "For Sale" ? "bg-green-500" : "bg-blue-500"}`}
              >
                {listing.type}
              </Badge>
              <Badge className="absolute top-4 left-4 bg-black/70 text-white">{listing.category}</Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-lg font-poppins">{listing.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {listing.location}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-xl font-bold">₦{listing.price.toLocaleString()}</div>

              {listing.bedrooms > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{listing.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span>{listing.area}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {listing.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {listing.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{listing.features.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Link href={`/admin/listings/${listing.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/listings/edit/${listing.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(listing.id)}
                  disabled={isDeleting === listing.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-yellow-400 text-black">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
