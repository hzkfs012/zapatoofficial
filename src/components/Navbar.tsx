
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "Services", to: "services" },
    { name: "Book Now", to: "booking" },
    { name: "Gallery", to: "gallery" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-white shadow-md" : "py-4 bg-navy/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="home" spy={true} smooth={true} duration={500} className="cursor-pointer">
              <h1 className={`text-xl md:text-2xl font-bold ${isScrolled ? 'text-navy' : 'text-white'}`}>
                Zapato <span className="text-electric-green">Laundaria.co</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`${isScrolled ? 'text-navy' : 'text-white'} hover:text-electric-green font-medium cursor-pointer transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            <RouterLink
              to="/login"
              className={`${isScrolled ? 'text-navy' : 'text-white'} hover:text-electric-green font-medium cursor-pointer transition-colors`}
            >
              Admin Login
            </RouterLink>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-navy' : 'text-white'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-slide-up">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-navy hover:text-electric-green font-medium py-2 cursor-pointer transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <RouterLink
                to="/login"
                className="text-navy hover:text-electric-green font-medium py-2 cursor-pointer transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </RouterLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
