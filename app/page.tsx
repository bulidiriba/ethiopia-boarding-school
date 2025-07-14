"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, MapPin, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data for all 50 schools (simplified for search functionality)
const allSchools = [
  {
    id: 1,
    name: "Addis Ababa International Boarding School",
    location: "Addis Ababa",
    region: "Addis Ababa",
    type: "International",
    students: 850,
    rating: 4.8,
    fees: "45,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Premier international boarding school in the heart of Ethiopia's capital",
  },
  {
    id: 2,
    name: "Blue Nile Academy",
    location: "Bahir Dar",
    region: "Amhara",
    type: "Private",
    students: 650,
    rating: 4.7,
    fees: "35,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Excellence in education with beautiful lakeside campus",
  },
  {
    id: 3,
    name: "Highland Preparatory School",
    location: "Gondar",
    region: "Amhara",
    type: "Private",
    students: 720,
    rating: 4.6,
    fees: "32,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Historic city location with modern educational facilities",
  },
  {
    id: 4,
    name: "Rift Valley International School",
    location: "Hawassa",
    region: "SNNPR",
    type: "International",
    students: 580,
    rating: 4.5,
    fees: "42,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "International curriculum in the beautiful Rift Valley region",
  },
  {
    id: 5,
    name: "Jimma Excellence Academy",
    location: "Jimma",
    region: "Oromia",
    type: "Private",
    students: 690,
    rating: 4.4,
    fees: "28,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Quality education in the heart of Ethiopia's coffee region",
  },
  {
    id: 6,
    name: "Mekelle International Boarding",
    location: "Mekelle",
    region: "Tigray",
    type: "International",
    students: 540,
    rating: 4.3,
    fees: "38,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Modern facilities and international standards in northern Ethiopia",
  },
  {
    id: 7,
    name: "Dire Dawa Preparatory School",
    location: "Dire Dawa",
    region: "Dire Dawa",
    type: "Public",
    students: 800,
    rating: 4.2,
    fees: "15,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Established boarding school in the historic railway city",
  },
  {
    id: 8,
    name: "Adama Science Academy",
    location: "Adama",
    region: "Oromia",
    type: "Private",
    students: 620,
    rating: 4.6,
    fees: "33,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Specialized in science and technology education with modern laboratories",
  },
  {
    id: 9,
    name: "Dessie Mountain School",
    location: "Dessie",
    region: "Amhara",
    type: "Private",
    students: 480,
    rating: 4.1,
    fees: "26,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Scenic mountain location with focus on environmental studies",
  },
  {
    id: 10,
    name: "Harar Heritage Academy",
    location: "Harar",
    region: "Harari",
    type: "Private",
    students: 420,
    rating: 4.4,
    fees: "30,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Cultural immersion and academic excellence in the historic city of Harar",
  },
  {
    id: 11,
    name: "Nekemte International School",
    location: "Nekemte",
    region: "Oromia",
    type: "International",
    students: 380,
    rating: 4.0,
    fees: "36,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "International education standards in western Ethiopia",
  },
  {
    id: 12,
    name: "Debre Markos Preparatory",
    location: "Debre Markos",
    region: "Amhara",
    type: "Public",
    students: 750,
    rating: 3.9,
    fees: "18,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Well-established public boarding school with strong academic tradition",
  },
  {
    id: 13,
    name: "Arba Minch Lakeside Academy",
    location: "Arba Minch",
    region: "SNNPR",
    type: "Private",
    students: 520,
    rating: 4.3,
    fees: "29,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Beautiful lakeside campus with focus on environmental conservation",
  },
  {
    id: 14,
    name: "Axum Historical School",
    location: "Axum",
    region: "Tigray",
    type: "Private",
    students: 350,
    rating: 4.2,
    fees: "27,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Education rooted in Ethiopia's ancient history and traditions",
  },
  {
    id: 15,
    name: "Shashemene International",
    location: "Shashemene",
    region: "Oromia",
    type: "International",
    students: 460,
    rating: 4.1,
    fees: "34,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Diverse international community with multicultural education approach",
  },
];

function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of school images from public/school-images folder
  const schoolImages = [
    {
      src: "/school-images/hailemanas6.jpg",
      alt: "Happy Ethiopian students in navy uniforms in their classroom",
      title: "Vibrant Student Community",
    },
    {
      src: "/school-images/campus-1.png",
      alt: "Beautiful school campus with modern buildings",
      title: "Modern Campus Facilities",
    },
    {
      src: "/school-images/students-1.png",
      alt: "Students in classroom learning",
      title: "Quality Education",
    },
    {
      src: "/school-images/dormitory-1.png",
      alt: "Comfortable dormitory rooms",
      title: "Comfortable Boarding",
    },
    {
      src: "/school-images/sports-1.png",
      alt: "Students playing sports",
      title: "Sports & Recreation",
    },
    {
      src: "/school-images/library-1.png",
      alt: "Well-equipped library",
      title: "Learning Resources",
    },
    {
      src: "/school-images/science-lab-1.png",
      alt: "Modern science laboratory",
      title: "Science Excellence",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % schoolImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [schoolImages.length]);

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  const goToPrevious = () => {
    setCurrentImage(
      (prev) => (prev - 1 + schoolImages.length) % schoolImages.length
    );
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % schoolImages.length);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-2xl">
      {/* Main Image Display */}
      <div className="relative w-full h-full">
        {schoolImages.map((image, index) => (
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
            {/* Image Overlay with Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
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

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {schoolImages.map((_, index) => (
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

      {/* Loading Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentImage + 1) / schoolImages.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState(
    allSchools.slice(0, 3)
  ); // Show first 3 by default
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter schools based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSchools(allSchools.slice(0, 3)); // Show default featured schools
      setShowSearchResults(false);
    } else {
      const filtered = allSchools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSchools(filtered);
      setShowSearchResults(true);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">EthioBoarding</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link
                href="/schools"
                className="text-sm font-medium hover:text-primary"
              >
                Schools
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Find the Perfect
                <span className="text-primary block">Boarding School</span>
                in Ethiopia
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover 50+ premium boarding schools across Ethiopia. Compare
                facilities, programs, and admission requirements to find the
                best fit for your child's education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/schools">Explore Schools</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:col-span-3 relative">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {showSearchResults
                ? "Search Results"
                : "Featured Boarding Schools"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {showSearchResults
                ? `Found ${filteredSchools.length} school${
                    filteredSchools.length !== 1 ? "s" : ""
                  } matching "${searchQuery}"`
                : "Explore some of our top-rated boarding schools"}
            </p>

            {/* Search Field */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search schools by name, location, or type..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 placeholder-gray-500"
                />
              </div>
              <Button size="lg" className="px-8 whitespace-nowrap">
                Search
              </Button>
            </div>
          </div>

          {/* School Results */}
          {filteredSchools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSchools.map((school) => (
                <Card
                  key={school.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={school.image || "/placeholder.svg"}
                      alt={school.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {school.name}
                        </CardTitle>
                        <CardDescription className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {school.location}, {school.region}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {school.rating}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {school.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {school.students} students
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {school.fees}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href="/schools">View Details</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        <Link
                          href={`/apply?school=${encodeURIComponent(
                            school.name
                          )}`}
                        >
                          Apply Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No schools found</h3>
                <p>Try adjusting your search terms or browse all schools.</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/schools">View All Schools</Link>
              </Button>
            </div>
          )}

          {!showSearchResults && (
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/schools">View All Schools</Link>
              </Button>
            </div>
          )}

          {showSearchResults && filteredSchools.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                variant="outline"
                className="mr-4"
              >
                Clear Search
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/schools">View All Schools</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect School?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey today and discover the best boarding school for
            your child
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/schools">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">EthioBoarding</span>
              </div>
              <p className="text-gray-400">
                Your trusted guide to Ethiopian boarding schools
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/schools" className="hover:text-white">
                    All Schools
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Regions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Addis Ababa</li>
                <li>Amhara</li>
                <li>Oromia</li>
                <li>Tigray</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+251 11 123 4567</li>
                <li>info@ethioboarding.com</li>
                <li>Addis Ababa, Ethiopia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EthioBoarding. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
