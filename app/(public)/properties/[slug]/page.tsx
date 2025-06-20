import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { getPropertyBySlug } from "@/actions/property-detail";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/user/WishlistButton";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Share2, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { property, error } = await getPropertyBySlug(slug);
  
  if (error || !property) {
    notFound();
  }
  
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Property Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back to properties */}
          <div className="mb-6">
            <Link href="/properties">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Properties
              </Button>
            </Link>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cover Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={property.coverImage || "/placeholder.svg?height=500&width=800"}
                  alt={property.title}
                  className="w-full h-[500px] object-cover"
                />                <Badge
                  className={`absolute top-4 right-4 text-sm ${
                    property.type === "For Rent" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {property.type || "For Sale"}
                </Badge>
                <Badge className="absolute top-4 left-4 bg-black/70 text-white text-sm">
                  {property.category || "Residential"}
                </Badge>
              </div>
              
              {/* Property Title and Location */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold font-poppins">{property.title}</h1>
                    <div className="flex items-center mt-2 text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {property.location || (property.city && property.state ? `${property.city}, ${property.state}` : property.city || property.state || "Nigeria")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <WishlistButton
                      listingId={property.id}
                      initialState={property.isInWishlist}
                      size="default"
                      showText
                    />
                    <Button variant="outline" size="default">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-400 text-black px-4 py-3 rounded-md inline-block">
                  <span className="font-bold text-2xl">
                    {typeof property.price === 'number' ? formatCurrency(property.price) : property.price}
                  </span>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-sm">
                {property.bedrooms != null && (
                  <div className="flex flex-col items-center justify-center border-r border-gray-200 px-4">
                    <Bed className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="font-semibold text-lg">{property.bedrooms}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="flex flex-col items-center justify-center border-r border-gray-200 px-4">
                    <Bath className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="font-semibold text-lg">{property.bathrooms}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex flex-col items-center justify-center px-4">
                    <Square className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="font-semibold text-lg">{property.area}</span>
                    <span className="text-sm text-gray-500">Area</span>
                  </div>
                )}
              </div>
              
              {/* Property Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>
              
              {/* Property Features */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column - Contact and other info */}
            <div className="space-y-6">
              {/* Contact Agent */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <p className="text-gray-600 mb-6">Interested in this property? Contact our agent for more information.</p>
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mb-3">
                  Request Info
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
              </div>
              
              {/* Property Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property ID:</span>
                    <span className="font-medium">{property.id.substring(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property Type:</span>
                    <span className="font-medium">{property.category || "Residential"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Listed:</span>
                    <span className="font-medium">{formatDate(property.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
