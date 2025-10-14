import React from "react";
import { Globe, Bot, Zap, Wrench, ArrowRight } from "lucide-react";

// Example Button component
const Button = ({
  children,
  className = "",
  variant = "outline",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300";
  const variants = {
    outline: "border border-white text-white bg-transparent hover:bg-white/10",
    solid: "bg-white text-black hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const services = [
  {
    icon: Globe,
    title: "CCTV Installation",
    features: [
      "Professional CCTV setup for homes and businesses",
      "Ensures security and surveillance 24/7",
      "Expert installation with high-quality cameras",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Bot,
    title: "AI Models & Solutions",
    features: [
      "Custom ML models for your business needs",
      "Natural language processing integration",
      "Computer vision applications",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Microagents",
    features: [
      "Automate workflows and data processing",
      "Intelligent agents for decision making",
      "Seamless API integrations",
    ],
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: Wrench,
    title: "Web Development",
    features: [
      "Full-stack web applications",
      "React, Next.js, Node.js, and APIs",
      "Database design and cloud deployment",
    ],
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    icon: Bot,
    title: "AI Agents",
    features: [
      "Custom autonomous AI agents",
      "Automate tasks and processes efficiently",
      "Integrates with existing systems",
    ],
    gradient: "from-pink-500 to-purple-400",
  },
  {
    icon: Wrench,
    title: "ML/AI App Development",
    features: [
      "Develop AI-powered applications",
      "Machine learning model integration",
      "User-friendly and scalable solutions",
    ],
    gradient: "from-orange-500 to-red-400",
  },
];

const ServiceSection = () => {
  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
          Our Services
        </h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          Technology solutions to accelerate your digital transformation.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group rounded-2xl transition-transform duration-500 hover:scale-105"
            >
              {/* Neon background on hover */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
              ></div>

              <div
                className={`relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg transition-shadow duration-500 group-hover:shadow-neon`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-4 mx-auto rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.gradient} transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

                {/* Features */}
                <ul className="text-gray-200 mb-6 space-y-2 text-left">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-3 mt-1"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
