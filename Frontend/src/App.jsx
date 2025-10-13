import React from "react";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div className="bg-slate-900 text-white">
      <Navigation />

      {/* Hero Section - Soft Blue with Orange accents */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px]"></div>
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 drop-shadow-2xl z-10 animate-pulse">
          Hero Section
        </h1>
      </section>

      {/* About Section - Soft Teal */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-cyan-900 to-slate-900"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-orange-300 drop-shadow-2xl">
          About
        </h2>
      </section>

      {/* Services Section - Warm Orange/Amber */}
      <section
        id="services"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-amber-300 drop-shadow-2xl">
          Services
        </h2>
      </section>

      {/* Team Section - Soft Purple/Blue */}
      <section
        id="team"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-orange-300 drop-shadow-2xl">
          Team
        </h2>
      </section>

      {/* Portfolio Section - Deep Slate with Orange */}
      <section
        id="portfolio"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-amber-200 drop-shadow-2xl">
          Portfolio
        </h2>
      </section>

      {/* Contact Section - Soft Orange/Amber */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-slate-800 drop-shadow-lg">
          Contact
        </h2>
      </section>
    </div>
  );
};

export default App;
