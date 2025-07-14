import Link from "next/link";
import {
  GraduationCap,
  Facebook,
  Send,
  Youtube,
  Music,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-start space-x-4 mb-6">
              {/* Colorful stripe */}
              <div className="w-2 h-32 bg-gradient-to-b from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>

              {/* Logo */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mb-3">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-800">
                    ETHIO BOARDING
                  </div>
                  <div className="text-xs text-gray-600">SCHOOL DIRECTORY</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              EthioBoarding is a comprehensive directory platform connecting
              families with Ethiopia's finest boarding schools. We provide
              detailed information about educational institutions across all
              regions of Ethiopia.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <Link
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Send className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Music className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Twitter className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Menu</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  All Schools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/regions"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  School Regions
                </Link>
              </li>
              <li>
                <Link
                  href="/admission-guide"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Admission Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Useful Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/policies"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Policies and Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/standards"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Education Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  School Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/statistics"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Education Statistics
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              We value your input and want to hear from you. If you have any
              questions or feedback about our services, please contact us.
            </p>

            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="font-semibold text-gray-800">Working Hours</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <div>
                  <div>Monday to Friday</div>
                  <div>8 AM - 5:30 PM</div>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+251 11 123 4567</span>
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@ethioboarding.com</span>
              </div>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            <Button className="w-full bg-blue-700 hover:bg-blue-800">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-right">
          <p className="text-sm text-gray-500">
            ©2024 EthioBoarding School Directory 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
