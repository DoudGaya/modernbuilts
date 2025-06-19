"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white font-medium">Click to view full size</span>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none">
          <img 
            src={src || "/placeholder.svg"} 
            alt={alt} 
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Video</CardTitle>
      </CardHeader>
      <CardContent>
        <video 
          src={src} 
          controls 
          className="w-full rounded-lg"
          poster={poster}
        >
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative cursor-pointer aspect-square overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${title} - Image ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">View full size</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt={title} 
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
