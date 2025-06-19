import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin } from "lucide-react"

const featuredProperties = [
  {
    id: 1,
    title: "Modern 4-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    type: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    area: "450 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Swimming Pool", "BQ", "Fitted Kitchen", "Parking"],
  },
  {
    id: 2,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: "₦120,000,000",
    type: "For Sale",
    bedrooms: 3,
    bathrooms: 4,
    area: "280 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Ocean View", "Gym", "24/7 Security", "Generator"],
  },
  {
    id: 3,
    title: "Executive 5-Bedroom Villa",
    location: "Asokoro, Abuja",
    price: "₦150,000,000",
    type: "For Sale",
    bedrooms: 5,
    bathrooms: 6,
    area: "600 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Garden", "Study Room", "Maid's Room", "Garage"],
  },
  {
    id: 4,
    title: "Commercial Office Space",
    location: "Victoria Island, Lagos",
    price: "₦45,000,000",
    type: "For Rent",
    bedrooms: 0,
    bathrooms: 4,
    area: "200 sqm",
    image: "/placeholder.svg?height=250&width=400",
    features: ["Elevator", "Conference Room", "Parking", "Generator"],
  },
]

export const FeaturedProperties = () => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium properties in Nigeria's most sought-after locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"}`}
                >
                  {property.type}
                </Badge>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
                  <span className="font-bold text-lg">{property.price}</span>
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

        <div className="text-center">
          <Link href="/properties">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
