import Image from "next/image"
import Link from "next/link"
import { MapPin, Route } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { propertyListings } from "@/lib/property-data"

export const RecommendedProjects = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended properties</CardTitle>
        <CardDescription>Listings with payment plans, walkthrough media, and route access details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {propertyListings.slice(0, 2).map((property) => (
            <div key={property.slug} className="overflow-hidden rounded-md border transition hover:shadow-lg">
              <div className="relative h-36">
                <Image src={property.coverImage} alt={property.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                <Badge className="absolute right-2 top-2 bg-primary text-gray-950 hover:bg-primary">{property.category}</Badge>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h4 className="font-semibold">{property.title}</h4>
                  <p className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1 h-3 w-3" />
                    {property.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <div className="font-semibold">{property.price}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Plan:</span>
                    <div className="font-semibold">{property.paymentPlan.tenor}</div>
                  </div>
                </div>

                <Button asChild className="w-full bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href={`/properties/${property.slug}`}>
                    <Route className="mr-2 h-4 w-4" />
                    Walk-around and GIS
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
