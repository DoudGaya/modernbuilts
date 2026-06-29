import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Filter, MapPinned, Route, Search, Square, WalletCards } from "lucide-react"
import { Footer } from "@/components/Footer"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { propertyListings } from "@/lib/property-data"

export default function PropertiesPage() {
  return (
    <>
      <PublicNavigations />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-gray-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-primary">Property, land, routes, payment plans</p>
              <h1 className="mt-3 text-4xl font-bold tracking-normal lg:text-5xl">Property listings with site intelligence.</h1>
              <p className="mt-5 text-lg leading-8 text-white/75">
                Browse homes, commercial property, and land plots with walk-around images, GIS-style access notes,
                route context, and flexible payment-plan details.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <Card className="mb-8 border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5 text-primary-700" />
                Search and filter properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search location, access road, property type..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="land">Land and plots</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any plan</SelectItem>
                    <SelectItem value="12">Up to 12 months</SelectItem>
                    <SelectItem value="24">Up to 24 months</SelectItem>
                    <SelectItem value="36">Up to 36 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {propertyListings.map((property) => (
              <Card key={property.slug} className="overflow-hidden border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-[300px]">
                    <Image
                      src={property.coverImage}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                    <Badge className="absolute left-4 top-4 bg-gray-950 text-white hover:bg-gray-950">{property.category}</Badge>
                    <Badge className="absolute right-4 top-4 bg-primary text-gray-950 hover:bg-primary">{property.type}</Badge>
                  </div>
                  <div className="flex flex-col p-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-950">{property.title}</h2>
                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <MapPinned className="h-4 w-4" />
                        {property.location}
                      </p>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-600">{property.description}</p>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-700">
                      <span className="rounded-md bg-primary-50 p-3 font-semibold">{property.price}</span>
                      <span className="rounded-md bg-gray-100 p-3">{property.area}</span>
                      {property.bedrooms ? (
                        <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3">
                          <Bed className="h-4 w-4" />
                          {property.bedrooms} beds
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3">
                          <Square className="h-4 w-4" />
                          {property.plotSize}
                        </span>
                      )}
                      {property.bathrooms ? (
                        <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3">
                          <Bath className="h-4 w-4" />
                          {property.bathrooms} baths
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3">
                          <Route className="h-4 w-4" />
                          Access mapped
                        </span>
                      )}
                    </div>

                    <div className="mt-5 rounded-md border border-primary-100 bg-primary-50 p-4">
                      <p className="flex items-center gap-2 text-sm font-bold text-gray-950">
                        <WalletCards className="h-4 w-4" />
                        {property.paymentPlan.deposit}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{property.paymentPlan.tenor} - {property.paymentPlan.monthly}</p>
                    </div>

                    <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
                      <Button asChild className="flex-1 bg-primary text-gray-950 hover:bg-primary-400">
                        <Link href={`/properties/${property.slug}`}>View details</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/contact">Request inspection</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
