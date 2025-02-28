

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Benefits", href: "#personas" },
    { name: "Roadmap", href: "#roadmap" },
  ];

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
        >
          {link.name}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-neutral-900 flex items-center">
            <span className="text-neutral-900">Poker</span>
            <span className="text-neutral-600">Face</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center">
          <Button variant="ghost" className="mr-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100">
            Log in
          </Button>
          <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors duration-200 flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <ChevronRight size={16} />
                </motion.a>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="pt-4 space-y-3"
              >
                <Button variant="ghost" className="w-full justify-start text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100">
                  Log in
                </Button>
                <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white">
                  Get Started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
