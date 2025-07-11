"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, MapPin, Users, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  // Array of school images from public/school-images folder
  const schoolImages = [
    {
      src: "/school-images/hailemanas6.jpg",
      alt: "Happy Ethiopian students in navy uniforms in their classroom",
      title: "Vibrant Student Community",
    },
    {
      src: "/school-images/hailemanas2.jpg",
      alt: "Beautiful school campus with modern buildings",
      title: "Modern Campus Facilities",
    },
    {
      src: "/school-images/hailemanas3.jpg",
      alt: "Students in classroom learning",
      title: "Quality Education",
    },
    {
      src: "/school-images/hailemanas4.jpg",
      alt: "Comfortable dormitory rooms",
      title: "Comfortable Boarding",
    },
    {
      src: "/school-images/hailemanas6.png",
      alt: "Students playing sports",
      title: "Sports & Recreation",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % schoolImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(timer)
  }, [schoolImages.length])

  const goToSlide = (index: number) => {
    setCurrentImage(index)
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + schoolImages.length) % schoolImages.length)
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % schoolImages.length)
  }

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
              <h3 className="text-white text-xl font-semibold">{image.title}</h3>
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
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
        aria-label="Next image"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {schoolImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentImage ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
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
  )
}

export default function HomePage() {
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
              <Link href="/schools" className="text-sm font-medium hover:text-primary">
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
                Discover 50+ premium boarding schools across Ethiopia. Compare facilities, programs, and admission
                requirements to find the best fit for your child's education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/schools">Explore Schools</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Boarding Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-gray-600">Regions Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25K+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Ethiopian Boarding Schools?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our boarding schools offer world-class education with rich Ethiopian culture and values
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Top-tier curriculum following international standards with Ethiopian cultural integration
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Character Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Holistic education focusing on leadership, ethics, and personal growth
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Strategic Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Schools located in beautiful, safe environments across Ethiopia's regions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>University Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Excellent preparation for Ethiopian and international university admissions
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Boarding Schools</h2>
            <p className="text-xl text-gray-600">Explore some of our top-rated boarding schools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Addis Ababa International Boarding School",
                location: "Addis Ababa",
                image: "/placeholder.svg?height=300&width=400",
                description: "Premier international boarding school in the heart of Ethiopia's capital",
              },
              {
                name: "Blue Nile Academy",
                location: "Bahir Dar",
                image: "/placeholder.svg?height=300&width=400",
                description: "Excellence in education with beautiful lakeside campus",
              },
              {
                name: "Highland Preparatory School",
                location: "Gondar",
                image: "/placeholder.svg?height=300&width=400",
                description: "Historic city location with modern educational facilities",
              },
            ].map((school, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={school.image || "/placeholder.svg"} alt={school.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{school.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {school.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{school.description}</p>
                  <Button asChild className="w-full">
                    <Link href="/schools">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/schools">View All Schools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect School?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey today and discover the best boarding school for your child
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
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

