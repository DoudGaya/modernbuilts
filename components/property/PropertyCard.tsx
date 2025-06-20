"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Share2 } from "lucide-react";
import { WishlistButton } from "@/components/user/WishlistButton";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export interface PropertyCardProps {
  id: string;
  title: string;
  location?: string;
  city?: string;
  state?: string;
  price: number | string;
  type?: string;
  category?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  image?: string;
  coverImage?: string;
  features?: string[];
  description?: string;
  slug?: string;
  isInWishlist?: boolean;
}

export function PropertyCard({
  id,
  title,
  location,
  city,
  state,
  price,
  type = "For Sale",
  category = "Residential",
  bedrooms,
  bathrooms,
  area,
  image,
  coverImage,
  features = [],
  description,
  slug,
  isInWishlist = false,
}: PropertyCardProps) {
  const [inWishlist, setInWishlist] = useState<boolean>(isInWishlist);
  const displayImage = coverImage || image || "/placeholder.svg";
  const displayLocation = location || (city && state ? `${city}, ${state}` : city || state || "Nigeria");
  
  // Format price if it's a number
  const formattedPrice = typeof price === "number" ? formatCurrency(price) : price;
  
  // Prepare URL for property detail page
  const detailUrl = slug ? `/properties/${slug}` : `/properties/${id}`;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <Badge
          className={`absolute top-4 right-4 ${
            type === "For Sale" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {type}
        </Badge>
        <Badge className="absolute top-4 left-4 bg-black/70 text-white">{category}</Badge>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md">
          <span className="font-bold text-lg">{formattedPrice}</span>
        </div>
        <div className="absolute top-4 right-16 flex gap-2">
          <WishlistButton 
            listingId={id} 
            initialState={inWishlist}
            onWishlistChange={setInWishlist}
            size="sm"
            className="w-8 h-8 p-0"
          />
          <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-poppins">{title}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {displayLocation}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && <p className="text-sm text-gray-600">{description}</p>}

        {bedrooms && bedrooms > 0 && (
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{bathrooms || 0} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{area || "N/A"}</span>
            </div>
          </div>
        )}

        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{features.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Link href={detailUrl} className="flex-1">
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
  );
}
