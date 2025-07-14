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
import { Input } from "@/components/ui/input";
import { MapPin, Users, Star, Search, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { schools, filterSchools, type School } from "@/utils/schools-data";

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>(schools);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  // Filter schools based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSchools(schools);
      setShowSearchResults(false);
    } else {
      const filtered = filterSchools(searchQuery);
      setFilteredSchools(filtered);
      setShowSearchResults(true);
    }
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleSchoolSelect = (schoolName: string) => {
    setSearchQuery(schoolName);
    setShowDropdown(false);
  };

  // Get schools that match current search query for dropdown
  const getDropdownSchools = () => {
    if (searchQuery.trim() === "") {
      return schools.slice(0, 10); // Show first 10 schools when no search
    }
    return schools
      .filter((school) =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 10); // Limit to 10 results
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ethiopian Boarding Schools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {showSearchResults
                ? `Found ${filteredSchools.length} school${
                    filteredSchools.length !== 1 ? "s" : ""
                  } matching "${searchQuery}"`
                : "Discover 50 exceptional boarding schools across Ethiopia. Find the perfect educational environment for your child."}
            </p>
          </div>

          {/* Search Field */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <div className="relative flex-1" ref={setDropdownRef}>
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Input
                  placeholder="Search schools by name, location, or type..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  className="pl-10"
                />

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto mt-1">
                    {getDropdownSchools().length > 0 ? (
                      <>
                        {searchQuery.trim() === "" && (
                          <div className="px-4 py-2 text-sm text-gray-500 border-b">
                            All Schools
                          </div>
                        )}
                        {getDropdownSchools().map((school) => (
                          <button
                            key={school.id}
                            onClick={() => handleSchoolSelect(school.name)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {school.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {school.location}, {school.region} • {school.type}
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No schools found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button
                size="default"
                className="px-6 whitespace-nowrap bg-blue-700 hover:bg-blue-800 text-white"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
                        <Link href={`/schools/${school.slug}`}>
                          View Details
                        </Link>
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
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                variant="outline"
              >
                Clear Search
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
              <span className="text-gray-600">
                Showing {filteredSchools.length} of {schools.length} schools
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
