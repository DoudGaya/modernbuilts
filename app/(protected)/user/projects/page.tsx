"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bath, Bed, Filter, Heart, MapPinned, Route, Search, Square, WalletCards } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { propertyListings } from "@/lib/property-data"

export default function UserProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [wishlist, setWishlist] = useState<string[]>([])

  const filteredProperties = useMemo(() => {
    return propertyListings.filter((property) => {
      const query = searchTerm.toLowerCase()
      const matchesSearch =
        !query ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.category.toLowerCase().includes(query) ||
        property.gis.accessRoads.some((road) => road.toLowerCase().includes(query))

      const matchesCategory = categoryFilter === "all" || property.category.toLowerCase() === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, categoryFilter])

  const toggleWishlist = (slug: string) => {
    setWishlist((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Properties and land</h1>
          <p className="mt-2 text-gray-600">Review listings, walk-around media, GIS access, and payment-plan details.</p>
        </div>
        <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
          <Link href="/properties">Open public catalog</Link>
        </Button>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary-700" />
            Search and filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search property, location, access road..."
                className="pl-10"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setWishlist([])}>
              <Heart className="h-4 w-4" />
              Clear saved
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredProperties.map((property) => (
          <Card key={property.slug} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="relative h-56">
              <Image src={property.coverImage} alt={property.title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
              <Badge className="absolute left-4 top-4 bg-gray-950 text-white hover:bg-gray-950">{property.category}</Badge>
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-4 top-4 bg-white/90 hover:bg-white"
                onClick={() => toggleWishlist(property.slug)}
              >
                <Heart className={`h-4 w-4 ${wishlist.includes(property.slug) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-950">{property.title}</CardTitle>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <MapPinned className="h-4 w-4" />
                {property.location}
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm leading-6 text-gray-600">{property.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <span className="rounded-md bg-primary-50 p-3 font-semibold text-gray-950">{property.price}</span>
                <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700">
                  <Square className="h-4 w-4" />
                  {property.area}
                </span>
                {property.bedrooms ? (
                  <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms} beds
                  </span>
                ) : (
                  <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700">
                    <Route className="h-4 w-4" />
                    Plot access
                  </span>
                )}
                {property.bathrooms ? (
                  <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms} baths
                  </span>
                ) : (
                  <span className="flex items-center gap-2 rounded-md bg-gray-100 p-3 text-gray-700">
                    <MapPinned className="h-4 w-4" />
                    {property.gis.coordinates}
                  </span>
                )}
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-gray-950">
                  <WalletCards className="h-4 w-4 text-primary-700" />
                  {property.paymentPlan.deposit}
                </p>
                <p className="mt-1 text-sm text-gray-600">{property.paymentPlan.tenor} - {property.paymentPlan.monthly}</p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/properties/${property.slug}`}>Walk-around and GIS</Link>
                </Button>
                <Button asChild className="flex-1 bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href="/user/enquiries">Request details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="rounded-md border border-gray-200 bg-white py-12 text-center">
          <p className="text-gray-500">No properties match your search.</p>
        </div>
      )}
    </div>
  )
}
