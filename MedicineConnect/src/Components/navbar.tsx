import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isHome = location.pathname === "/";

  const handleHomeClick = () => {
    if (!isHome) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollLinkClass = "cursor-pointer hover:text-blue-600";
  const linkClass = "hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div
        onClick={handleHomeClick}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Medicine Connect
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <span onClick={handleHomeClick} className={scrollLinkClass}>
          Home
        </span>

        {isHome ? (
          <>
            <ScrollLink
              to="services"
              smooth
              duration={500}
              offset={-70}
              className={scrollLinkClass}
            >
              Services
            </ScrollLink>
            <ScrollLink
              to="doctors"
              smooth
              duration={500}
              offset={-70}
              className={scrollLinkClass}
            >
              Doctors
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth
              duration={500}
              offset={-70}
              className={scrollLinkClass}
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="login"
              smooth
              duration={500}
              offset={-70}
              className={scrollLinkClass}
            >
              Login
            </ScrollLink>
            <ScrollLink
              to="register"
              smooth
              duration={500}
              offset={-70}
              className={scrollLinkClass}
            >
              Register
            </ScrollLink>
          </>
        ) : (
          <>
            <Link to="/" className={linkClass}>
              Services
            </Link>
            <Link to="/" className={linkClass}>
              Doctors
            </Link>
            <Link to="/" className={linkClass}>
              About Us
            </Link>
            <Link to="/login" className={linkClass}>
              Login
            </Link>
            <Link to="/signup" className={linkClass}>
              Register
            </Link>
          </>
        )}

        <Link to="/dashboard" className={linkClass}>
          Dashboard
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-50 text-gray-700 font-medium">
          <span
            onClick={handleHomeClick}
            className="py-2 hover:text-blue-600 cursor-pointer"
          >
            Home
          </span>

          {isHome ? (
            <>
              <ScrollLink
                to="services"
                smooth
                duration={500}
                offset={-70}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Services
              </ScrollLink>
              <ScrollLink
                to="doctors"
                smooth
                duration={500}
                offset={-70}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Doctors
              </ScrollLink>
              <ScrollLink
                to="about"
                smooth
                duration={500}
                offset={-70}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                About Us
              </ScrollLink>
              <ScrollLink
                to="login"
                smooth
                duration={500}
                offset={-70}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Login
              </ScrollLink>
              <ScrollLink
                to="register"
                smooth
                duration={500}
                offset={-70}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Register
              </ScrollLink>
            </>
          ) : (
            <>
              <Link to="/" className="py-2 hover:text-blue-600">
                Services
              </Link>
              <Link to="/" className="py-2 hover:text-blue-600">
                Doctors
              </Link>
              <Link to="/" className="py-2 hover:text-blue-600">
                About Us
              </Link>
              <Link to="/" className="py-2 hover:text-blue-600">
                Login
              </Link>
              <Link to="/" className="py-2 hover:text-blue-600">
                Register
              </Link>
            </>
          )}

          <Link to="/dashboard" className="py-2 hover:text-blue-600">
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
