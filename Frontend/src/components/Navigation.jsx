import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-detect active section on scroll - FIXED VERSION
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.3, // Changed from 0.5 to 0.3 for better detection
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []); // Empty dependency array is fine now

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".mobile-menu-button")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
      setActiveSection(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo with elegant glow */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 
                         bg-clip-text text-transparent tracking-wide cursor-pointer
                         drop-shadow-[0_0_20px_rgba(251,146,60,0.4)] transition-all"
              onClick={() => scrollToSection("#hero")}
            >
              GANPATI
            </motion.div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={
                    activeSection === item.href ? "page" : undefined
                  }
                  className={`relative font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.href
                      ? "text-orange-300 bg-white/10 shadow-md"
                      : "text-white/90 hover:text-orange-200 hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.href && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA with soft glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden md:inline-flex"
            >
              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(251, 146, 60, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 
                           hover:from-orange-400 hover:to-amber-400 
                           text-white font-bold rounded-full px-6 py-2 shadow-lg
                           border border-orange-300/30 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5 relative z-50 mobile-menu-button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 7 : 0,
                }}
                className="w-6 h-0.5 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className="w-6 h-0.5 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -7 : 0,
                }}
                className="w-6 h-0.5 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm
                       bg-gradient-to-br from-slate-800/95 via-slate-700/95 to-slate-800/95
                       backdrop-blur-xl shadow-2xl p-8 flex flex-col md:hidden space-y-2 z-50 mobile-menu
                       border-l border-orange-400/20"
          >
            {/* Mobile menu header */}
            <div className="mb-8 mt-16">
              <h2
                className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 
                             bg-clip-text text-transparent drop-shadow-lg"
              >
                GANPATI
              </h2>
            </div>

            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                className={`text-left text-lg font-semibold rounded-xl py-3.5 px-5 transition-all duration-300 ${
                  activeSection === item.href
                    ? "bg-gradient-to-r from-orange-500/80 to-amber-500/80 text-white shadow-lg shadow-orange-500/20"
                    : "text-white/90 hover:text-orange-200 hover:bg-white/10"
                }`}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 
                         hover:from-orange-400 hover:to-amber-400 
                         text-white font-bold rounded-full mt-8 px-7 py-4 shadow-lg
                         border border-orange-300/30 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
