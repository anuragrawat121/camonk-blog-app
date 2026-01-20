import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 pb-8 border-b border-gray-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                CA MONK
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering the next generation of Chartered Accountants with
              knowledge, resources, and community.
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white uppercase text-sm tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white uppercase text-sm tracking-wider">
              Policies
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="mb-4 font-semibold text-white uppercase text-sm tracking-wider">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 CA Monk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
