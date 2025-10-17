import React from "react";
import Navigation from "./components/Navigation";
import ServiceSection from "./components/ServiceSection";
import HeroSection from "./components/HeroSection";
import CursorAnimation from "./components/CursorAnimation";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="bg-slate-900 text-white">
      <CursorAnimation />
      <Navigation />
      <section id="hero ">
        <HeroSection />
      </section>

      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900"
      >
        <AboutSection />
      </section>

      <section id="services">
        <ServiceSection />
      </section>

      <section
        id="team"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900"
      >
        <TeamSection />
      </section>

      <BlogSection />
      {/* Portfolio Section - Deep Slate with Orange */}
      <section
        id="portfolio"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950"
      >
        <PortfolioSection />
      </section>

      {/* Contact Section - Soft Orange/Amber */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100"
      >
        <ContactSection />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default App;
