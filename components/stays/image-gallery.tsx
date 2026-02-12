"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Display up to 5 images in the grid
  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  return (
    <>
      {/* Image Grid */}
      <div className="relative grid h-[300px] gap-2 sm:h-[400px] md:h-[450px] md:grid-cols-4 md:grid-rows-2">
        {/* Main Image */}
        <button
          type="button"
          className="relative col-span-2 row-span-2 overflow-hidden rounded-l-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          onClick={() => openLightbox(0)}
          aria-label={`View ${alt} - Image 1 of ${images.length}`}
        >
          <Image
            src={displayImages[0]}
            alt={`${alt} - Main view`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform hover:scale-105"
            priority
          />
        </button>

        {/* Secondary Images */}
        {displayImages.slice(1).map((image, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              "relative hidden overflow-hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
              index === 1 && "rounded-tr-xl",
              index === 3 && "rounded-br-xl"
            )}
            onClick={() => openLightbox(index + 1)}
            aria-label={`View ${alt} - Image ${index + 2} of ${images.length}`}
          >
            <Image
              src={image}
              alt={`${alt} - View ${index + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}

        {/* Show All Photos Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 gap-2"
          onClick={() => openLightbox(0)}
        >
          <Grid3X3 className="h-4 w-4" aria-hidden="true" />
          Show all photos
          {remainingCount > 0 && ` (+${remainingCount})`}
        </Button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 text-white hover:bg-neutral-800"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>

          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-neutral-800"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </Button>

          {/* Current Image */}
          <div className="relative h-[80vh] w-[90vw] max-w-5xl">
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-neutral-800"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-neutral-800/80 px-4 py-2 text-sm text-white">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "relative h-12 w-12 overflow-hidden rounded-md transition-all",
                  index === currentIndex
                    ? "ring-2 ring-amber-500"
                    : "opacity-60 hover:opacity-100"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
