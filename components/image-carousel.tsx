"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { schools, type School } from "@/utils/schools-data";

export interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  schoolName: string;
  schoolLocation: string;
}

// Function to get random schools for the carousel
const getRandomSchools = (count: number): School[] => {
  const shuffled = [...schools].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, schools.length));
};

// Generate carousel images from random schools
const generateCarouselFromSchools = (count = 7): CarouselImage[] => {
  const randomSchools = getRandomSchools(count);

  return randomSchools.map((school) => ({
    src: school.image,
    alt: `${school.name} - ${school.description}`,
    title: school.name,
    schoolName: school.name,
    schoolLocation: `${school.location}, ${school.region}`,
  }));
};

// Helper functions for carousel functionality
const getNextImageIndex = (
  currentIndex: number,
  totalImages: number
): number => {
  return (currentIndex + 1) % totalImages;
};

const getPreviousImageIndex = (
  currentIndex: number,
  totalImages: number
): number => {
  return (currentIndex - 1 + totalImages) % totalImages;
};

const getCarouselProgress = (
  currentIndex: number,
  totalImages: number
): number => {
  return ((currentIndex + 1) / totalImages) * 100;
};

// Function to get carousel images for specific school types
const getCarouselByType = (type: string, count = 7): CarouselImage[] => {
  const filteredSchools = schools.filter(
    (school) => school.type.toLowerCase() === type.toLowerCase()
  );
  const shuffled = [...filteredSchools].sort(() => 0.5 - Math.random());
  const selectedSchools = shuffled.slice(
    0,
    Math.min(count, filteredSchools.length)
  );

  return selectedSchools.map((school) => ({
    src: school.image,
    alt: `${school.name} - ${school.description}`,
    title: school.name,
    schoolName: school.name,
    schoolLocation: `${school.location}, ${school.region}`,
  }));
};

// Function to get carousel images for specific regions
const getCarouselByRegion = (region: string, count = 7): CarouselImage[] => {
  const filteredSchools = schools.filter(
    (school) => school.region.toLowerCase() === region.toLowerCase()
  );
  const shuffled = [...filteredSchools].sort(() => 0.5 - Math.random());
  const selectedSchools = shuffled.slice(
    0,
    Math.min(count, filteredSchools.length)
  );

  return selectedSchools.map((school) => ({
    src: school.image,
    alt: `${school.name} - ${school.description}`,
    title: school.name,
    schoolName: school.name,
    schoolLocation: `${school.location}, ${school.region}`,
  }));
};

interface ImageCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showProgressBar?: boolean;
  showSchoolInfo?: boolean;
  className?: string;
  images?: CarouselImage[];
  count?: number;
  filterByType?: string;
  filterByRegion?: string;
}

export function ImageCarousel({
  autoPlayInterval = 4000,
  showControls = true,
  showIndicators = true,
  showProgressBar = true,
  showSchoolInfo = true,
  className = "relative w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-2xl",
  images,
  count = 7,
  filterByType,
  filterByRegion,
}: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  // Generate carousel images based on props
  useEffect(() => {
    let generatedImages: CarouselImage[];

    if (images) {
      generatedImages = images;
    } else if (filterByType) {
      generatedImages = getCarouselByType(filterByType, count);
    } else if (filterByRegion) {
      generatedImages = getCarouselByRegion(filterByRegion, count);
    } else {
      generatedImages = generateCarouselFromSchools(count);
    }

    setCarouselImages(generatedImages);
  }, [images, count, filterByType, filterByRegion]);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => getNextImageIndex(prev, carouselImages.length));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, carouselImages.length]);

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) =>
      getPreviousImageIndex(prev, carouselImages.length)
    );
  };

  const goToNext = () => {
    setCurrentImage((prev) => getNextImageIndex(prev, carouselImages.length));
  };

  if (carouselImages.length === 0) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full bg-gray-200 rounded-lg">
          <div className="text-gray-500">Loading carousel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main Image Display */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Image Overlay with School Information */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              {showSchoolInfo ? (
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {image.schoolName}
                  </h3>
                  <div className="flex items-center text-lg opacity-90">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{image.schoolLocation}</span>
                  </div>
                </div>
              ) : (
                <h3 className="text-white text-xl font-semibold">
                  {image.title}
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showControls && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentImage
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Loading Progress Bar */}
      {showProgressBar && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${getCarouselProgress(
                currentImage,
                carouselImages.length
              )}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

// Export utility functions for external use if needed
export {
  generateCarouselFromSchools,
  getCarouselByType,
  getCarouselByRegion,
  getNextImageIndex,
  getPreviousImageIndex,
  getCarouselProgress,
};
