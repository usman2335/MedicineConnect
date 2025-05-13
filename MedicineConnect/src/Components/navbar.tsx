import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("patientName");
    setIsLoggedIn(!!token);
    setPatientName(name);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientName");
    setIsLoggedIn(false);
    setPatientName(null);
    navigate("/");
  };

  const scrollLinkClass = "cursor-pointer hover:text-blue-600";
  const linkClass = "hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div
        onClick={handleHomeClick}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Medicine Connect
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center relative">
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
          </>
        )}

        {/* Authentication Buttons */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {patientName?.split(" ")[0]}
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center md:hidden z-40 text-gray-700 font-medium space-y-2 pb-4">
          <span
            onClick={() => {
              toggleMenu();
              handleHomeClick();
            }}
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
                onClick={toggleMenu}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Services
              </ScrollLink>
              <ScrollLink
                to="doctors"
                smooth
                duration={500}
                offset={-70}
                onClick={toggleMenu}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                Doctors
              </ScrollLink>
              <ScrollLink
                to="about"
                smooth
                duration={500}
                offset={-70}
                onClick={toggleMenu}
                className="py-2 cursor-pointer hover:text-blue-600"
              >
                About Us
              </ScrollLink>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={toggleMenu}
                className="py-2 hover:text-blue-600"
              >
                Services
              </Link>
              <Link
                to="/"
                onClick={toggleMenu}
                className="py-2 hover:text-blue-600"
              >
                Doctors
              </Link>
              <Link
                to="/"
                onClick={toggleMenu}
                className="py-2 hover:text-blue-600"
              >
                About Us
              </Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
