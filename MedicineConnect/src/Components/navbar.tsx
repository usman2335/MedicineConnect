import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">Medicine Connect</div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <a href="#home" className="hover:text-blue-600">
          Home
        </a>
        <a href="#services" className="hover:text-blue-600">
          Services
        </a>
        <a href="#doctors" className="hover:text-blue-600">
          Doctors
        </a>
        <a href="#about" className="hover:text-blue-600">
          About Us
        </a>
        <a href="#login" className="hover:text-blue-600">
          Login
        </a>
        <a href="#register" className="hover:text-blue-600">
          Register
        </a>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-50">
          <a href="#home" className="py-2 hover:text-blue-600">
            Home
          </a>
          <a href="#services" className="py-2 hover:text-blue-600">
            Services
          </a>
          <a href="#doctors" className="py-2 hover:text-blue-600">
            Doctors
          </a>
          <a href="#about" className="py-2 hover:text-blue-600">
            About Us
          </a>
          <a href="#login" className="py-2 hover:text-blue-600">
            Login
          </a>
          <a href="#register" className="py-2 hover:text-blue-600">
            Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
