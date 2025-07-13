"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Star, Search, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for 50 Ethiopian boarding schools
const schools = [
  {
    id: 1,
    name: "Addis Ababa International Boarding School",
    slug: "addis-ababa-international",
    location: "Addis Ababa",
    region: "Addis Ababa",
    type: "International",
    students: 850,
    rating: 4.8,
    fees: "45,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Premier international boarding school offering world-class education in Ethiopia's capital.",
  },
  {
    id: 2,
    name: "Blue Nile Academy",
    slug: "blue-nile-academy",
    location: "Bahir Dar",
    region: "Amhara",
    type: "Private",
    students: 650,
    rating: 4.7,
    fees: "35,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Excellence in education with beautiful lakeside campus near Lake Tana.",
  },
  {
    id: 3,
    name: "Highland Preparatory School",
    slug: "highland-preparatory",
    location: "Gondar",
    region: "Amhara",
    type: "Private",
    students: 720,
    rating: 4.6,
    fees: "32,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Historic city location with modern educational facilities and rich cultural heritage.",
  },
  {
    id: 4,
    name: "Rift Valley International School",
    slug: "rift-valley-international",
    location: "Hawassa",
    region: "SNNPR",
    type: "International",
    students: 580,
    rating: 4.5,
    fees: "42,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "International curriculum in the beautiful Rift Valley region.",
  },
  {
    id: 5,
    name: "Jimma Excellence Academy",
    slug: "jimma-excellence-academy",
    location: "Jimma",
    region: "Oromia",
    type: "Private",
    students: 690,
    rating: 4.4,
    fees: "28,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Quality education in the heart of Ethiopia's coffee region.",
  },
  {
    id: 6,
    name: "Mekelle International Boarding",
    slug: "mekelle-international",
    location: "Mekelle",
    region: "Tigray",
    type: "International",
    students: 540,
    rating: 4.3,
    fees: "38,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern facilities and international standards in northern Ethiopia.",
  },
  {
    id: 7,
    name: "Dire Dawa Preparatory School",
    slug: "dire-dawa-preparatory",
    location: "Dire Dawa",
    region: "Dire Dawa",
    type: "Public",
    students: 800,
    rating: 4.2,
    fees: "15,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Established boarding school in the historic railway city.",
  },
  {
    id: 8,
    name: "Adama Science Academy",
    slug: "adama-science-academy",
    location: "Adama",
    region: "Oromia",
    type: "Private",
    students: 620,
    rating: 4.6,
    fees: "33,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Specialized in science and technology education with modern laboratories.",
  },
  {
    id: 9,
    name: "Dessie Mountain School",
    slug: "dessie-mountain-school",
    location: "Dessie",
    region: "Amhara",
    type: "Private",
    students: 480,
    rating: 4.1,
    fees: "26,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Scenic mountain location with focus on environmental studies.",
  },
  {
    id: 10,
    name: "Harar Heritage Academy",
    slug: "harar-heritage-academy",
    location: "Harar",
    region: "Harari",
    type: "Private",
    students: 420,
    rating: 4.4,
    fees: "30,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cultural immersion and academic excellence in the historic city of Harar.",
  },
  {
    id: 11,
    name: "Nekemte International School",
    slug: "nekemte-international",
    location: "Nekemte",
    region: "Oromia",
    type: "International",
    students: 380,
    rating: 4.0,
    fees: "36,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "International education standards in western Ethiopia.",
  },
  {
    id: 12,
    name: "Debre Markos Preparatory",
    slug: "debre-markos-preparatory",
    location: "Debre Markos",
    region: "Amhara",
    type: "Public",
    students: 750,
    rating: 3.9,
    fees: "18,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Well-established public boarding school with strong academic tradition.",
  },
  {
    id: 13,
    name: "Arba Minch Lakeside Academy",
    slug: "arba-minch-lakeside",
    location: "Arba Minch",
    region: "SNNPR",
    type: "Private",
    students: 520,
    rating: 4.3,
    fees: "29,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Beautiful lakeside campus with focus on environmental conservation.",
  },
  {
    id: 14,
    name: "Axum Historical School",
    slug: "axum-historical-school",
    location: "Axum",
    region: "Tigray",
    type: "Private",
    students: 350,
    rating: 4.2,
    fees: "27,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Education rooted in Ethiopia's ancient history and traditions.",
  },
  {
    id: 15,
    name: "Shashemene International",
    slug: "shashemene-international",
    location: "Shashemene",
    region: "Oromia",
    type: "International",
    students: 460,
    rating: 4.1,
    fees: "34,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Diverse international community with multicultural education approach.",
  },
  {
    id: 16,
    name: "Kombolcha Technical School",
    slug: "kombolcha-technical",
    location: "Kombolcha",
    region: "Amhara",
    type: "Technical",
    students: 600,
    rating: 4.0,
    fees: "25,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Specialized technical and vocational education with modern workshops.",
  },
  {
    id: 17,
    name: "Wolkite Excellence Center",
    slug: "wolkite-excellence-center",
    location: "Wolkite",
    region: "SNNPR",
    type: "Private",
    students: 440,
    rating: 3.8,
    fees: "24,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Comprehensive education with strong community connections.",
  },
  {
    id: 18,
    name: "Debre Birhan Highland Academy",
    slug: "debre-birhan-highland",
    location: "Debre Birhan",
    region: "Amhara",
    type: "Private",
    students: 580,
    rating: 4.2,
    fees: "31,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "High-altitude campus with excellent air quality and mountain views.",
  },
  {
    id: 19,
    name: "Gambella International School",
    slug: "gambella-international",
    location: "Gambella",
    region: "Gambella",
    type: "International",
    students: 320,
    rating: 3.9,
    fees: "37,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "International education in Ethiopia's western frontier region.",
  },
  {
    id: 20,
    name: "Wolaita Sodo Academy",
    slug: "wolaita-sodo-academy",
    location: "Wolaita Sodo",
    region: "SNNPR",
    type: "Private",
    students: 510,
    rating: 4.1,
    fees: "26,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Strong academic programs with cultural preservation focus.",
  },
  {
    id: 21,
    name: "Dilla University Preparatory",
    slug: "dilla-university-prep",
    location: "Dilla",
    region: "SNNPR",
    type: "University Prep",
    students: 640,
    rating: 4.3,
    fees: "28,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Excellent university preparation with high acceptance rates.",
  },
  {
    id: 22,
    name: "Bonga Coffee Academy",
    slug: "bonga-coffee-academy",
    location: "Bonga",
    region: "SNNPR",
    type: "Specialized",
    students: 280,
    rating: 4.0,
    fees: "23,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Unique focus on agricultural sciences and coffee cultivation.",
  },
  {
    id: 23,
    name: "Debre Zeit Aviation School",
    slug: "debre-zeit-aviation",
    location: "Debre Zeit",
    region: "Oromia",
    type: "Specialized",
    students: 360,
    rating: 4.4,
    fees: "40,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Specialized aviation and aerospace education programs.",
  },
  {
    id: 24,
    name: "Mizan Teferi Forest Academy",
    slug: "mizan-teferi-forest",
    location: "Mizan Teferi",
    region: "SNNPR",
    type: "Environmental",
    students: 390,
    rating: 3.9,
    fees: "22,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Environmental education in Ethiopia's coffee forest region.",
  },
  {
    id: 25,
    name: "Assosa Border Academy",
    slug: "assosa-border-academy",
    location: "Assosa",
    region: "Benishangul-Gumuz",
    type: "Private",
    students: 310,
    rating: 3.7,
    fees: "21,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cross-cultural education near the Sudanese border.",
  },
  {
    id: 26,
    name: "Semera Desert School",
    slug: "semera-desert-school",
    location: "Semera",
    region: "Afar",
    type: "Specialized",
    students: 250,
    rating: 3.8,
    fees: "35,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Unique desert environment education with geological focus.",
  },
  {
    id: 27,
    name: "Jijiga Pastoral Academy",
    slug: "jijiga-pastoral-academy",
    location: "Jijiga",
    region: "Somali",
    type: "Cultural",
    students: 420,
    rating: 3.9,
    fees: "24,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Education that honors pastoral traditions and modern academics.",
  },
  {
    id: 28,
    name: "Finote Selam Mountain School",
    slug: "finote-selam-mountain",
    location: "Finote Selam",
    region: "Amhara",
    type: "Private",
    students: 380,
    rating: 4.0,
    fees: "25,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Mountain campus with focus on outdoor education and leadership.",
  },
  {
    id: 29,
    name: "Welkite Agricultural School",
    slug: "welkite-agricultural",
    location: "Welkite",
    region: "SNNPR",
    type: "Agricultural",
    students: 480,
    rating: 4.1,
    fees: "20,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Hands-on agricultural education with working farm campus.",
  },
  {
    id: 30,
    name: "Debre Tabor Highland Institute",
    slug: "debre-tabor-highland",
    location: "Debre Tabor",
    region: "Amhara",
    type: "Private",
    students: 520,
    rating: 4.2,
    fees: "29,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "High-altitude learning environment with excellent facilities.",
  },
  {
    id: 31,
    name: "Hosanna Christian Academy",
    slug: "hosanna-christian-academy",
    location: "Hosanna",
    region: "SNNPR",
    type: "Religious",
    students: 450,
    rating: 4.3,
    fees: "27,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Faith-based education with strong moral and academic foundation.",
  },
  {
    id: 32,
    name: "Sebeta International School",
    slug: "sebeta-international",
    location: "Sebeta",
    region: "Oromia",
    type: "International",
    students: 680,
    rating: 4.5,
    fees: "41,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern international school near Addis Ababa with global curriculum.",
  },
  {
    id: 33,
    name: "Butajira Science Center",
    slug: "butajira-science-center",
    location: "Butajira",
    region: "SNNPR",
    type: "Science",
    students: 410,
    rating: 4.1,
    fees: "32,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "STEM-focused education with advanced laboratory facilities.",
  },
  {
    id: 34,
    name: "Ziway Lakeside School",
    slug: "ziway-lakeside-school",
    location: "Ziway",
    region: "Oromia",
    type: "Private",
    students: 360,
    rating: 3.9,
    fees: "26,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Beautiful lakeside campus with water sports and environmental programs.",
  },
  {
    id: 35,
    name: "Metu Forest Academy",
    slug: "metu-forest-academy",
    location: "Metu",
    region: "Oromia",
    type: "Environmental",
    students: 330,
    rating: 4.0,
    fees: "23,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Environmental conservation education in pristine forest setting.",
  },
  {
    id: 36,
    name: "Woldiya Technical Institute",
    slug: "woldiya-technical",
    location: "Woldiya",
    region: "Amhara",
    type: "Technical",
    students: 550,
    rating: 4.0,
    fees: "24,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Technical and vocational training with industry partnerships.",
  },
  {
    id: 37,
    name: "Robe Mountain Academy",
    slug: "robe-mountain-academy",
    location: "Robe",
    region: "Oromia",
    type: "Private",
    students: 290,
    rating: 3.8,
    fees: "22,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "High-altitude education with focus on mountain ecology.",
  },
  {
    id: 38,
    name: "Goba Highland School",
    slug: "goba-highland-school",
    location: "Goba",
    region: "Oromia",
    type: "Private",
    students: 340,
    rating: 4.1,
    fees: "28,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Mountain education with outdoor adventure programs.",
  },
  {
    id: 39,
    name: "Yirgalem Coffee School",
    slug: "yirgalem-coffee-school",
    location: "Yirgalem",
    region: "SNNPR",
    type: "Agricultural",
    students: 380,
    rating: 4.2,
    fees: "21,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Agricultural education specializing in coffee cultivation and processing.",
  },
  {
    id: 40,
    name: "Adigrat Border Academy",
    slug: "adigrat-border-academy",
    location: "Adigrat",
    region: "Tigray",
    type: "Private",
    students: 400,
    rating: 3.9,
    fees: "25,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cross-border educational programs with Eritrean cultural exchange.",
  },
  {
    id: 41,
    name: "Gimbi Agricultural Institute",
    slug: "gimbi-agricultural",
    location: "Gimbi",
    region: "Oromia",
    type: "Agricultural",
    students: 460,
    rating: 4.0,
    fees: "19,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Comprehensive agricultural education with modern farming techniques.",
  },
  {
    id: 42,
    name: "Tepi Forest College",
    slug: "tepi-forest-college",
    location: "Tepi",
    region: "SNNPR",
    type: "Environmental",
    students: 270,
    rating: 3.8,
    fees: "20,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Forest conservation and environmental science education.",
  },
  {
    id: 43,
    name: "Awash Valley School",
    slug: "awash-valley-school",
    location: "Awash",
    region: "Afar",
    type: "Specialized",
    students: 320,
    rating: 3.7,
    fees: "33,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Unique geological and archaeological education programs.",
  },
  {
    id: 44,
    name: "Moyale Border Institute",
    slug: "moyale-border-institute",
    location: "Moyale",
    region: "Oromia",
    type: "Cultural",
    students: 280,
    rating: 3.6,
    fees: "23,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cross-cultural education at the Kenya-Ethiopia border.",
  },
  {
    id: 45,
    name: "Lalibela Heritage School",
    slug: "lalibela-heritage-school",
    location: "Lalibela",
    region: "Amhara",
    type: "Cultural",
    students: 350,
    rating: 4.4,
    fees: "30,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Education immersed in Ethiopia's UNESCO World Heritage site.",
  },
  {
    id: 46,
    name: "Holeta Agricultural College",
    slug: "holeta-agricultural",
    location: "Holeta",
    region: "Oromia",
    type: "Agricultural",
    students: 520,
    rating: 4.2,
    fees: "22,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Leading agricultural research and education institution.",
  },
  {
    id: 47,
    name: "Bale Mountain Academy",
    slug: "bale-mountain-academy",
    location: "Bale",
    region: "Oromia",
    type: "Environmental",
    students: 240,
    rating: 4.3,
    fees: "31,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "High-altitude education in Bale Mountains National Park area.",
  },
  {
    id: 48,
    name: "Kebridehar Pastoral School",
    slug: "kebridehar-pastoral",
    location: "Kebridehar",
    region: "Somali",
    type: "Cultural",
    students: 300,
    rating: 3.8,
    fees: "20,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Education that bridges traditional pastoral life and modern academics.",
  },
  {
    id: 49,
    name: "Metahara Sugar Academy",
    slug: "metahara-sugar-academy",
    location: "Metahara",
    region: "Oromia",
    type: "Industrial",
    students: 410,
    rating: 3.9,
    fees: "26,500 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Industrial education with focus on sugar processing and agriculture.",
  },
  {
    id: 50,
    name: "Simien Mountain School",
    slug: "simien-mountain-school",
    location: "Simien Mountains",
    region: "Amhara",
    type: "Environmental",
    students: 180,
    rating: 4.5,
    fees: "35,000 ETB/year",
    image: "/placeholder.svg?height=300&width=400",
    description: "Exclusive mountain education in UNESCO World Heritage landscape.",
  },
]

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSchools, setFilteredSchools] = useState(schools)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  // Filter schools based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSchools(schools)
      setShowSearchResults(false)
    } else {
      const filtered = schools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredSchools(filtered)
      setShowSearchResults(true)
    }
  }, [searchQuery])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  const handleSchoolSelect = (schoolName: string) => {
    setSearchQuery(schoolName)
    setShowDropdown(false)
  }

  // Get schools that match current search query for dropdown
  const getDropdownSchools = () => {
    if (searchQuery.trim() === "") {
      return schools.slice(0, 10) // Show first 10 schools when no search
    }
    return schools.filter((school) => school.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 10) // Limit to 10 results
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">EthioBoarding</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/schools" className="text-sm font-medium text-primary">
                Schools
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ethiopian Boarding Schools</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {showSearchResults
                ? `Found ${filteredSchools.length} school${filteredSchools.length !== 1 ? "s" : ""} matching "${searchQuery}"`
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
                          <div className="px-4 py-2 text-sm text-gray-500 border-b">All Schools</div>
                        )}
                        {getDropdownSchools().map((school) => (
                          <button
                            key={school.id}
                            onClick={() => handleSchoolSelect(school.name)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{school.name}</div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {school.location}, {school.region} • {school.type}
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">No schools found matching "{searchQuery}"</div>
                    )}
                  </div>
                )}
              </div>
              <Button size="default" className="px-6 whitespace-nowrap">
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
                <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={school.image || "/placeholder.svg"} alt={school.name} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{school.name}</CardTitle>
                        <CardDescription className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {school.location}, {school.region}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{school.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{school.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {school.students} students
                      </div>
                      <div className="text-sm font-semibold text-primary">{school.fees}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/schools/${school.slug}`}>View Details</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 bg-transparent">
                        <Link href={`/schools/${school.slug}`}>Apply Now</Link>
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
                  setSearchQuery("")
                  setShowSearchResults(false)
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
                  setSearchQuery("")
                  setShowSearchResults(false)
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">EthioBoarding</span>
              </div>
              <p className="text-gray-400">Your trusted guide to Ethiopian boarding schools</p>
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
  )
}