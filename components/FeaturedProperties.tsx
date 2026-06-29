import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, MapPin, Route, Square } from "lucide-react"
import { propertyListings } from "@/lib/property-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const FeaturedProperties = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-primary-700">Available inventory</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 lg:text-4xl">Featured property and land sales</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Homes, commercial spaces, and plots with walk-around media, location context, and flexible payment options.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/properties">View all listings</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {propertyListings.map((property) => (
            <Card key={property.slug} className="overflow-hidden border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src={property.coverImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <Badge className="absolute left-4 top-4 bg-gray-950 text-white hover:bg-gray-950">{property.category}</Badge>
                <Badge className="absolute right-4 top-4 bg-primary text-gray-950 hover:bg-primary">{property.type}</Badge>
                <div className="absolute bottom-4 left-4 rounded-md bg-black/80 px-3 py-2 text-white">
                  <span className="text-lg font-bold">{property.price}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-950">{property.title}</CardTitle>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-6 text-gray-600">{property.description}</p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                  {property.bedrooms ? (
                    <span className="inline-flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms} beds
                    </span>
                  ) : null}
                  {property.bathrooms ? (
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.bathrooms} baths
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {property.area}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Route className="h-4 w-4" />
                    GIS route access
                  </span>
                </div>

                <div className="rounded-md bg-primary-50 p-4">
                  <p className="text-xs font-bold uppercase text-primary-800">Payment plan</p>
                  <p className="mt-1 text-sm font-semibold text-gray-950">{property.paymentPlan.deposit} - {property.paymentPlan.tenor}</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild className="flex-1 bg-primary text-gray-950 hover:bg-primary-400">
                    <Link href={`/properties/${property.slug}`}>View details</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/contact">Request inspection</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
