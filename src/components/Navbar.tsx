import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
          <GraduationCap className="h-5 w-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">CA MONK</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <a href="#" className="hover:text-black transition-colors">
          Tools
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Practice
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Events
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Job Board
        </a>
        <a href="#" className="hover:text-black transition-colors">
          Points
        </a>
      </div>

      {/* Profile Button */}
      <Button className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-md px-6 font-medium">
        Profile
      </Button>
    </nav>
  );
}
