"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageGalleryProps = {
  images: string[];
  title: string;
};

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
        <Image
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentIndex
                  ? "border-primary"
                  : "border-border/40 hover:border-border"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {/* {images.length > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          {currentIndex + 1} of {images.length} photos
        </div>
      )} */}
    </div>
  );
}
