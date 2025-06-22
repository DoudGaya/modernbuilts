import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { getPropertyListings } from "@/actions/property"
import { formatCurrency } from "@/lib/utils"

export async function FeaturedProperties() {
  // Fetch featured properties from database
  const result = await getPropertyListings({
    page: 1,
    limit: 6, // Show 6 featured properties
  });

  const properties = result.properties || [];

  if (properties.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No properties available at the moment. Check back soon for exciting opportunities.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across Nigeria's most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.coverImage || "/placeholder.svg?height=250&width=400"}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <Badge
                  className={`absolute top-4 right-4 ${property.type === "For Sale" ? "bg-green-500" : "bg-blue-500"}`}
                >
                  {property.type}
                </Badge>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
                  <span className="font-bold text-lg">{formatCurrency(property.price)}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-poppins">{property.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.city}, {property.state}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.bedrooms && property.bedrooms > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    )}
                  </div>
                )}

                {property.features && property.features.length > 0 && (
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
                )}

                <div className="flex gap-2">
                  <Link href={`/properties/${property.slug}`} className="flex-1">
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      View Details
                    </Button>
                  </Link>
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
    </section>
  );
}
