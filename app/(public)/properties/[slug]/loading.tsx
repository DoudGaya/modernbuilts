import { PublicNavigations } from "@/components/PublicNavigations";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back to properties */}
          <div className="mb-6">
            <Link href="/properties">
              <Button variant="ghost" className="flex items-center gap-2" disabled>
                <ArrowLeft className="w-4 h-4" /> Back to Properties
              </Button>
            </Link>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cover Image */}
              <Skeleton className="h-[500px] w-full rounded-lg" />
              
              {/* Property Title and Location */}
              <div>
                <div className="flex justify-between items-start">
                  <div className="w-3/4">
                    <Skeleton className="h-10 w-full mb-2" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton className="h-14 w-40" />
                </div>
              </div>
              
              {/* Property Details */}
              <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg">
                <div className="flex flex-col items-center justify-center px-4">
                  <Skeleton className="h-6 w-6 mb-2" />
                  <Skeleton className="h-6 w-8 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex flex-col items-center justify-center px-4">
                  <Skeleton className="h-6 w-6 mb-2" />
                  <Skeleton className="h-6 w-8 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex flex-col items-center justify-center px-4">
                  <Skeleton className="h-6 w-6 mb-2" />
                  <Skeleton className="h-6 w-16 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              
              {/* Property Description */}
              <div className="bg-white p-6 rounded-lg">
                <Skeleton className="h-8 w-60 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              {/* Property Features */}
              <div className="bg-white p-6 rounded-lg">
                <Skeleton className="h-8 w-60 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Contact and other info */}
            <div className="space-y-6">
              {/* Contact Agent */}
              <div className="bg-white p-6 rounded-lg">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <Skeleton className="h-10 w-full mb-3" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              {/* Property Details */}
              <div className="bg-white p-6 rounded-lg">
                <Skeleton className="h-8 w-40 mb-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
