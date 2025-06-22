import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bed, Bath, Square, MapPin, Search, Filter, Share2 } from "lucide-react"
import { PropertyCard } from "@/components/property/PropertyCard"
import { getPropertyListings } from "@/actions/property"

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await search parameters in Next.js 15
  const params = await searchParams;
  
  // Parse search parameters
  const page = params?.page ? parseInt(params.page as string) : 1;
  const type = params?.type as string | undefined;
  const category = params?.category as string | undefined;
  const location = params?.location as string | undefined;
  const bedrooms = params?.bedrooms as string | undefined;
  const priceRange = params?.price as string | undefined;
  
  // Fetch property listings with filters and pagination
  const result = await getPropertyListings({
    page,
    limit: 9,
    type,
    category,
    location,
    bedrooms,
    priceRange,
  });
  
  const properties = result.properties || [];
  const totalPages = result.totalPages || 1;
  const currentPage = result.currentPage || 1;

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
              <form action="/properties" className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select name="type" defaultValue={type || "all"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="category" defaultValue={category || "all"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="location" defaultValue={location || "all"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Lagos">Lagos</SelectItem>
                    <SelectItem value="Abuja">Abuja</SelectItem>
                    <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="Kano">Kano</SelectItem>
                  </SelectContent>
                </Select>
                <Select name="bedrooms" defaultValue={bedrooms || "all"}>
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
                <Select name="price" defaultValue={priceRange || "all"}>
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
                <Button type="submit" className="md:col-span-5 bg-yellow-500 hover:bg-yellow-600">
                  Apply Filters
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length > 0 ? (
              properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  city={property.city}
                  state={property.state}
                  price={property.price}
                  type={(property as any).listingType || "For Sale"}
                  category={property.category || "Residential"}
                  bedrooms={property.bedrooms ?? undefined}
                  bathrooms={property.bathrooms ?? undefined}
                  area={property.area ?? undefined}
                  coverImage={property.coverImage}
                  features={property.features || []}
                  description={property.description}
                  slug={property.slug}
                  isInWishlist={property.isInWishlist}
                />
              ))
            ) : (
              <div className="col-span-3 py-20 text-center">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <a
                  key={pageNum}
                  href={`/properties?page=${pageNum}${type ? `&type=${type}` : ''}${
                    category ? `&category=${category}` : ''
                  }${location ? `&location=${location}` : ''}${bedrooms ? `&bedrooms=${bedrooms}` : ''}${
                    priceRange ? `&price=${priceRange}` : ''
                  }`}
                >
                  <Button
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    className={pageNum === currentPage ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    {pageNum}
                  </Button>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
