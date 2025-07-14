import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Globe,
  Calendar,
  BookOpen,
  Trophy,
  Heart,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data for school details
const schoolsData = {
  "addis-ababa-international": {
    id: 1,
    name: "Addis Ababa International Boarding School",
    slug: "addis-ababa-international",
    location: "Addis Ababa",
    region: "Addis Ababa",
    type: "International",
    students: 850,
    rating: 4.8,
    fees: "45,000 ETB/year",
    established: 1995,
    phone: "+251 11 234 5678",
    email: "info@aaibs.edu.et",
    website: "www.aaibs.edu.et",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Addis Ababa International Boarding School stands as Ethiopia's premier international educational institution, offering world-class education in the heart of the nation's capital. Our school combines rigorous academic standards with rich Ethiopian cultural heritage, preparing students for global citizenship while maintaining strong roots in their homeland.",
    mission:
      "To provide exceptional international education that develops critical thinking, cultural awareness, and leadership skills in a nurturing boarding environment.",
    vision:
      "To be the leading international boarding school in East Africa, producing globally competent and culturally grounded leaders.",
    curriculum: {
      primary: "International Primary Curriculum (IPC) with Ethiopian Studies",
      secondary: "Cambridge IGCSE and A-Levels",
      languages: ["English", "Amharic", "French", "Arabic"],
      specialPrograms: [
        "STEM Excellence",
        "Arts & Culture",
        "Leadership Development",
      ],
    },
    facilities: [
      "Modern Science Laboratories",
      "Digital Learning Centers",
      "Olympic-size Swimming Pool",
      "Multi-purpose Sports Complex",
      "Performing Arts Theater",
      "Library with 50,000+ books",
      "Medical Center with 24/7 care",
      "Comfortable Dormitories",
      "Dining Hall with International Cuisine",
      "Transportation Services",
    ],
    admissionRequirements: [
      "Completed application form",
      "Academic transcripts from previous school",
      "English proficiency test results",
      "Medical examination report",
      "Character reference letters",
      "Entrance examination (Mathematics, English, Science)",
      "Parent/Guardian interview",
      "Passport-size photographs",
    ],
    feesStructure: {
      tuition: "45,000 ETB/year",
      boarding: "25,000 ETB/year",
      meals: "15,000 ETB/year",
      activities: "8,000 ETB/year",
      registration: "5,000 ETB (one-time)",
      uniform: "3,000 ETB/year",
    },
    achievements: [
      "Top 5 International Schools in Ethiopia",
      "100% University Acceptance Rate",
      "Cambridge Outstanding Learner Awards",
      "National Science Olympiad Champions",
      "Model UN Regional Winners",
    ],
    extracurricular: [
      "Student Government",
      "Debate Club",
      "Drama Society",
      "Music Orchestra",
      "Football Team",
      "Basketball Team",
      "Swimming Club",
      "Environmental Club",
      "Community Service",
      "Cultural Dance Group",
    ],
  },
  "blue-nile-academy": {
    id: 2,
    name: "Blue Nile Academy",
    slug: "blue-nile-academy",
    location: "Bahir Dar",
    region: "Amhara",
    type: "Private",
    students: 650,
    rating: 4.7,
    fees: "35,000 ETB/year",
    established: 2001,
    phone: "+251 58 220 1234",
    email: "admissions@bluenileacademy.edu.et",
    website: "www.bluenileacademy.edu.et",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Blue Nile Academy offers excellence in education with a beautiful lakeside campus near Lake Tana in Bahir Dar. Our school provides a unique learning environment that combines academic rigor with the natural beauty of Ethiopia's largest lake, fostering both intellectual and personal growth.",
    mission:
      "To provide quality education in a serene lakeside environment that nurtures academic excellence, character development, and environmental consciousness.",
    vision:
      "To be recognized as the premier boarding school in the Amhara region, producing well-rounded graduates who contribute positively to society.",
    curriculum: {
      primary: "Ethiopian National Curriculum with English Enhancement",
      secondary: "Ethiopian Secondary Education with International Components",
      languages: ["Amharic", "English", "Arabic"],
      specialPrograms: [
        "Environmental Studies",
        "Lake Ecology",
        "Cultural Heritage",
      ],
    },
    facilities: [
      "Lakeside Campus",
      "Modern Classrooms",
      "Science Laboratories",
      "Computer Lab",
      "Library",
      "Sports Fields",
      "Boat House",
      "Dormitories",
      "Cafeteria",
      "Medical Clinic",
    ],
    admissionRequirements: [
      "Application form",
      "Academic records",
      "Entrance examination",
      "Medical certificate",
      "Reference letters",
      "Interview",
      "Birth certificate",
      "Photographs",
    ],
    feesStructure: {
      tuition: "35,000 ETB/year",
      boarding: "20,000 ETB/year",
      meals: "12,000 ETB/year",
      activities: "5,000 ETB/year",
      registration: "3,000 ETB (one-time)",
      uniform: "2,500 ETB/year",
    },
    achievements: [
      "Regional Academic Excellence Award",
      "Environmental Conservation Recognition",
      "Sports Championship Winners",
      "Cultural Performance Awards",
    ],
    extracurricular: [
      "Rowing Club",
      "Environmental Club",
      "Traditional Dance",
      "Football Team",
      "Volleyball Team",
      "Art Club",
      "Music Group",
      "Student Council",
    ],
  },
};

interface SchoolPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { slug } = await params;
  const school = schoolsData[slug as keyof typeof schoolsData];

  if (!school) {
    notFound();
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

      {/* School Header */}
      <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/schools" className="text-primary hover:underline mr-2">
              Schools
            </Link>
            <span className="text-gray-500">{">"}</span>
            <span className="ml-2 text-gray-700">{school.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {school.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                      {school.location}, {school.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{school.type}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{school.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{school.students} students</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {school.description}
              </p>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Established</div>
                      <div className="font-medium">{school.established}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{school.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium text-sm">{school.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-3 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <div className="font-medium text-sm">
                        {school.website}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {school.fees}
                    </div>
                    <Button asChild className="w-full" size="lg">
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
            </div>
          </div>
        </div>
      </section>

      {/* School Images */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {school.images.map((image, index) => (
              <div
                key={index}
                className="relative h-48 rounded-lg overflow-hidden"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${school.name} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="admission">Admission</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-primary" />
                      Mission & Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Mission</h4>
                      <p className="text-gray-600">{school.mission}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Vision</h4>
                      <p className="text-gray-600">{school.vision}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-primary" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {school.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Academic Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Primary Education</h4>
                      <p className="text-gray-600">
                        {school.curriculum.primary}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Secondary Education
                      </h4>
                      <p className="text-gray-600">
                        {school.curriculum.secondary}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Languages Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {school.curriculum.languages.map((language, index) => (
                          <Badge key={index} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Programs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {school.curriculum.specialPrograms.map(
                        (program, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{program}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="facilities" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {school.facilities.map((facility, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">{facility}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="admission" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Admission Requirements</CardTitle>
                  <CardDescription>
                    Please ensure you have all the following documents and
                    requirements before applying
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      {school.admissionRequirements.map(
                        (requirement, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        )
                      )}
                    </ul>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">
                        Application Process
                      </h4>
                      <ol className="space-y-2 text-sm text-gray-600">
                        <li>1. Submit online application</li>
                        <li>2. Pay application fee</li>
                        <li>3. Submit required documents</li>
                        <li>4. Take entrance examination</li>
                        <li>5. Attend interview</li>
                        <li>6. Receive admission decision</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Structure</CardTitle>
                  <CardDescription>
                    Annual fees breakdown for the academic year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {Object.entries(school.feesStructure).map(
                        ([category, amount], index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b"
                          >
                            <span className="font-medium capitalize">
                              {category.replace(/([A-Z])/g, " $1")}
                            </span>
                            <span className="text-primary font-semibold">
                              {amount}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3">Payment Options</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Annual payment (5% discount)</li>
                        <li>• Semester payment</li>
                        <li>• Monthly installments</li>
                        <li>• Scholarship opportunities available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Extracurricular Activities</CardTitle>
                  <CardDescription>
                    Diverse activities to develop well-rounded students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {school.extracurricular.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                        <span className="font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take the first step towards your child's exceptional education at{" "}
              {school.name}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href={`/apply?school=${encodeURIComponent(school.name)}`}>
                Apply Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Schedule Visit
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Download Brochure
            </Button>
          </div>
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
