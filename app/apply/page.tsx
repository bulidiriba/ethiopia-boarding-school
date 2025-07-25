"use client";

import type React from "react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";
import { schools } from "@/utils/schools-data";

function ApplicationFormContent() {
  const searchParams = useSearchParams();
  const schoolName = searchParams.get("school") || "Selected School";
  const school = schools.find((s) => s.name === schoolName);

  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    grandfatherName: "",
    studentEmail: "",
    gender: "",
    parentGuardianName1: "",
    parentGuardianEmail1: "",
    parentGuardianName2: "",
    parentGuardianEmail2: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    primaryPhone: "",
    alternatePhone: "",
    townCity: "",
    region: "",
    parentAgreement: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Application submitted:", formData);
    alert("Application submitted successfully!");
    // You could redirect to a success page here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/schools" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Schools
            </Link>
          </Button>
        </div>

        {/* Page Header with School Background */}
        <div className="relative mb-8 rounded-lg overflow-hidden">
          {/* Background Image */}
          {school?.image && (
            <div className="absolute inset-0 h-32 md:h-40">
              <Image
                src={school.image || "/placeholder.svg"}
                alt={school.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          )}

          {/* Content */}
          <div
            className={`relative z-10 text-center py-8 md:py-12 px-4 ${
              school?.image ? "text-white" : "text-gray-800"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Apply to {schoolName}
            </h1>
            <p
              className={`text-lg ${
                school?.image ? "text-gray-200" : "text-gray-600"
              }`}
            >
              Complete the application form below to apply for admission
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Instructions */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  Please answer all the questions. Incomplete applications will
                  not be accepted.
                </li>
                <li>
                  Please upload clear and readable copies of the front and back
                  pages of your report cards. Unreadable report cards will be
                  rejected.
                </li>
              </ol>
            </div>

            {/* Parent/Guardian Agreement */}
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Checking the box below confirms that the student's
                parent/guardian agrees to the submission of this application. *
              </p>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="agreement"
                  checked={formData.parentAgreement}
                  onCheckedChange={(checked) =>
                    handleInputChange("parentAgreement", checked as boolean)
                  }
                  required
                />
                <Label htmlFor="agreement" className="text-sm font-medium">
                  Yes, I agree to the submission of this application
                </Label>
              </div>
            </div>

            {/* Student Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">
                Student Information
              </h3>

              {/* Student Name */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Student Name *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      placeholder="Name"
                      value={formData.studentName}
                      onChange={(e) =>
                        handleInputChange("studentName", e.target.value)
                      }
                      required
                    />
                    <Label className="text-xs text-gray-500 mt-1">Name</Label>
                  </div>
                  <div>
                    <Input
                      placeholder="Father's Name"
                      value={formData.fatherName}
                      onChange={(e) =>
                        handleInputChange("fatherName", e.target.value)
                      }
                      required
                    />
                    <Label className="text-xs text-gray-500 mt-1">
                      Father's Name
                    </Label>
                  </div>
                  <div>
                    <Input
                      placeholder="Grandfather's Name"
                      value={formData.grandfatherName}
                      onChange={(e) =>
                        handleInputChange("grandfatherName", e.target.value)
                      }
                      required
                    />
                    <Label className="text-xs text-gray-500 mt-1">
                      Grandfather's Name
                    </Label>
                  </div>
                </div>
              </div>

              {/* Student Email and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentEmail" className="text-sm font-medium">
                    Student Email
                  </Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    placeholder="example@example.com"
                    value={formData.studentEmail}
                    onChange={(e) =>
                      handleInputChange("studentEmail", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">
                Parent/Guardian Information
              </h3>

              {/* Parent/Guardian 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentName1" className="text-sm font-medium">
                    Parent/Guardian Name 1 *
                  </Label>
                  <Input
                    id="parentName1"
                    placeholder="Full name"
                    value={formData.parentGuardianName1}
                    onChange={(e) =>
                      handleInputChange("parentGuardianName1", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail1" className="text-sm font-medium">
                    Parent/Guardian 1 Email *
                  </Label>
                  <Input
                    id="parentEmail1"
                    type="email"
                    placeholder="example@example.com"
                    value={formData.parentGuardianEmail1}
                    onChange={(e) =>
                      handleInputChange("parentGuardianEmail1", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Parent/Guardian 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentName2" className="text-sm font-medium">
                    Parent/Guardian Name 2 (optional)
                  </Label>
                  <Input
                    id="parentName2"
                    placeholder="Full name"
                    value={formData.parentGuardianName2}
                    onChange={(e) =>
                      handleInputChange("parentGuardianName2", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail2" className="text-sm font-medium">
                    Parent/Guardian 2 Email
                  </Label>
                  <Input
                    id="parentEmail2"
                    type="email"
                    placeholder="example@example.com"
                    value={formData.parentGuardianEmail2}
                    onChange={(e) =>
                      handleInputChange("parentGuardianEmail2", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth and Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date of Birth */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Date of Birth - Gregorian Calendar *
                </Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">
                      Day
                    </Label>
                    <Select
                      value={formData.birthDay}
                      onValueChange={(value) =>
                        handleInputChange("birthDay", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">
                      Month
                    </Label>
                    <Select
                      value={formData.birthMonth}
                      onValueChange={(value) =>
                        handleInputChange("birthMonth", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">
                      Year
                    </Label>
                    <Select
                      value={formData.birthYear}
                      onValueChange={(value) =>
                        handleInputChange("birthYear", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => {
                          const year = new Date().getFullYear() - 5 - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryPhone" className="text-sm font-medium">
                    Primary Phone Number *
                  </Label>
                  <Input
                    id="primaryPhone"
                    type="tel"
                    placeholder="+251 911 123 456"
                    value={formData.primaryPhone}
                    onChange={(e) =>
                      handleInputChange("primaryPhone", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="alternatePhone"
                    className="text-sm font-medium"
                  >
                    Alternate Phone Number
                  </Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    placeholder="+251 911 123 456"
                    value={formData.alternatePhone}
                    onChange={(e) =>
                      handleInputChange("alternatePhone", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold border-b pb-2">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="townCity" className="text-sm font-medium">
                    Town/City you live in *
                  </Label>
                  <Input
                    id="townCity"
                    placeholder="Enter your town/city"
                    value={formData.townCity}
                    onChange={(e) =>
                      handleInputChange("townCity", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Region *</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) =>
                      handleInputChange("region", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                      <SelectItem value="afar">Afar</SelectItem>
                      <SelectItem value="amhara">Amhara</SelectItem>
                      <SelectItem value="benishangul-gumuz">
                        Benishangul-Gumuz
                      </SelectItem>
                      <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                      <SelectItem value="gambella">Gambella</SelectItem>
                      <SelectItem value="harari">Harari</SelectItem>
                      <SelectItem value="oromia">Oromia</SelectItem>
                      <SelectItem value="sidama">Sidama</SelectItem>
                      <SelectItem value="snnpr">SNNPR</SelectItem>
                      <SelectItem value="somali">Somali</SelectItem>
                      <SelectItem value="tigray">Tigray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Financial Aid Information */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-lg">
                Financial Aid Information
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                School fees support faculty and staff salaries, room and board
                for students, and every aspect of running our boarding school.
                Limited financial aid is available for high achieving students
                with clearly documented financial need. If you are applying for
                financial aid, please complete the financial aid application.
              </p>
              <p className="text-sm text-gray-700 font-amharic">
                የትምህርት ቤት ክፍያዎች የመምህራንና የሰራተኞች ደሞዝ፣ የተማሪዎች መኖሪያና ምግብ እንዲሁም የመኖሪያ
                ትምህርት ቤታችንን ለማስኬድ የሚያስፈልጉ ሁሉንም ነገሮች ይደግፋሉ። ለከፍተኛ ተሳትፎ ላላቸው እና
                በግልጽ የተመዘገበ የገንዘብ ፍላጎት ላላቸው ተማሪዎች የተወሰነ የገንዘብ እርዳታ ይገኛል።
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
              <Button type="button" variant="outline" asChild>
                <Link href="/schools">Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="px-8 bg-blue-700 hover:bg-blue-800 text-white"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationFormContent />
    </Suspense>
  );
}
