import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bed, Bath, Square, MapPin, Search, Filter, Heart, Share2 } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Modern 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 4,
    bathrooms: 5,
    area: "450 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Swimming Pool", "BQ", "Fitted Kitchen", "Parking", "Generator", "Security"],
    description: "Luxurious 4-bedroom duplex in the prestigious Lekki Phase 1 with modern amenities.",
  },
  {
    id: 2,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: "₦120,000,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 3,
    bathrooms: 4,
    area: "280 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Ocean View", "Gym", "24/7 Security", "Generator", "Elevator", "Parking"],
    description: "Premium apartment with stunning ocean views in exclusive Banana Island.",
  },
  {
    id: 3,
    title: "Executive 5-Bedroom Villa",
    location: "Asokoro, Abuja",
    price: "₦150,000,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 5,
    bathrooms: 6,
    area: "600 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Garden", "Study Room", "Maid's Room", "Garage", "Swimming Pool", "Security"],
    description: "Spacious villa in Abuja's diplomatic zone with extensive gardens and premium finishes.",
  },
  {
    id: 4,
    title: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    price: "₦45,000,000",
    type: "For Rent",
    category: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    area: "200 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Elevator", "Conference Room", "Parking", "Generator", "AC", "Reception"],
    description: "Prime office space in Victoria Island's business district with modern facilities.",
  },
  {
    id: 5,
    title: "2-Bedroom Apartment",
    location: "Ikeja GRA, Lagos",
    price: "₦35,000,000",
    type: "For Sale",
    category: "Residential",
    bedrooms: 2,
    bathrooms: 3,
    area: "120 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Fitted Kitchen", "Parking", "Generator", "Security", "Balcony"],
    description: "Affordable 2-bedroom apartment in the heart of Ikeja with modern amenities.",
  },
  {
    id: 6,
    title: "Warehouse Complex",
    location: "Agbara Industrial Estate, Ogun",
    price: "₦200,000,000",
    type: "For Sale",
    category: "Industrial",
    bedrooms: 0,
    bathrooms: 2,
    area: "2000 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Loading Bay", "Office Space", "Security", "Power", "Water", "Access Road"],
    description: "Large warehouse complex perfect for manufacturing and distribution businesses.",
  },
]

export default function PropertiesPage() {
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 text-black">Property Listings</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-8">
              Discover premium properties across Nigeria's most sought-after locations
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by location, property type, or price range..."
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+ Bedroom</SelectItem>
                    <SelectItem value="2">2+ Bedrooms</SelectItem>
                    <SelectItem value="3">3+ Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-50m">₦0 - ₦50M</SelectItem>
                    <SelectItem value="50m-100m">₦50M - ₦100M</SelectItem>
                    <SelectItem value="100m-200m">₦100M - ₦200M</SelectItem>
                    <SelectItem value="200m+">₦200M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {property.type}
                  </Badge>
                  <Badge className="absolute top-4 left-4 bg-black/70 text-white">{property.category}</Badge>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
                    <span className="font-bold text-lg">{property.price}</span>
                  </div>
                  <div className="absolute top-4 right-16 flex gap-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-poppins">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{property.description}</p>

                  {property.bedrooms > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {property.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.features.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Contact Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Properties
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
