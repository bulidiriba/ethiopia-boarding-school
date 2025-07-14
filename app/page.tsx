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
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ImageCarousel } from "@/components/image-carousel";
import {
  filterSchools,
  getFeaturedSchools,
  type School,
} from "@/utils/schools-data";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>(
    getFeaturedSchools(3)
  ); // Show first 3 by default
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter schools based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSchools(getFeaturedSchools(3)); // Show default featured schools
      setShowSearchResults(false);
    } else {
      const filtered = filterSchools(searchQuery);
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
      <Header />

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
                Discover 50+ boarding schools across Ethiopia. Compare
                facilities, programs, and admission requirements to find your
                best and apply.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 bg-blue-700 hover:bg-blue-800 text-white"
                >
                  <Link href="/schools">Explore Schools</Link>
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
              <Button
                size="lg"
                className="px-8 whitespace-nowrap bg-blue-700 hover:bg-blue-800 text-white"
              >
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
                      <Button
                        asChild
                        className="flex-1 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      >
                        <Link href="/schools">View Details</Link>
                      </Button>
                      <Button
                        asChild
                        className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
