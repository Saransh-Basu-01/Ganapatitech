import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // This data structure will later come from Django API
  const portfolioData = {
    heading: "Our Portfolio",
    subheading: "Showcasing Excellence in Every Project",
    description:
      "Explore our diverse portfolio of successful projects that have transformed businesses and delivered exceptional results.",
    categories: [
      "All",
      "Web Development",
      "AI/ML",
      "Mobile Apps",
      "CCTV",
      "E-commerce",
    ],
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web Development",
        description:
          "A full-featured e-commerce platform with advanced analytics and payment integration.",
        image:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Retail Corp",
        completedDate: "2024-08",
      },
      {
        id: 2,
        title: "AI Chatbot System",
        category: "AI/ML",
        description:
          "Intelligent customer service chatbot with NLP capabilities and multi-language support.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        technologies: ["Python", "TensorFlow", "OpenAI", "FastAPI"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Tech Solutions Inc",
        completedDate: "2024-06",
      },
      {
        id: 3,
        title: "Smart CCTV Surveillance",
        category: "CCTV",
        description:
          "Advanced CCTV system with AI-powered facial recognition and real-time alerts.",
        image:
          "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=400&fit=crop",
        technologies: ["Computer Vision", "IoT", "Cloud Storage", "Mobile App"],
        liveUrl: "https://example.com",
        githubUrl: null,
        client: "Security Pro Ltd",
        completedDate: "2024-09",
      },
      {
        id: 4,
        title: "Mobile Banking App",
        category: "Mobile Apps",
        description:
          "Secure and user-friendly mobile banking application with biometric authentication.",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
        technologies: ["React Native", "Firebase", "Blockchain", "Biometrics"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "FinBank",
        completedDate: "2024-07",
      },
      {
        id: 5,
        title: "Food Delivery Platform",
        category: "E-commerce",
        description:
          "Complete food delivery ecosystem with real-time tracking and restaurant management.",
        image:
          "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=400&fit=crop",
        technologies: ["React", "Express", "PostgreSQL", "Google Maps API"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "QuickBite",
        completedDate: "2024-05",
      },
      {
        id: 6,
        title: "Predictive Analytics Dashboard",
        category: "AI/ML",
        description:
          "Business intelligence dashboard with machine learning-powered predictions.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        technologies: ["Python", "Scikit-learn", "React", "D3.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        client: "Data Corp",
        completedDate: "2024-04",
      },
    ],
  };

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section
      id="portfolio"
      className="py-20 bg-gray-900 min-h-screen relative w-full"
    >
      {/* Full width dark overlay */}
      <div className="absolute inset-0 bg-gray-900 w-full h-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
            {portfolioData.heading}
          </h2>
          <p className="text-2xl md:text-3xl text-orange-300 font-semibold mb-6 drop-shadow-lg">
            {portfolioData.subheading}
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {portfolioData.description}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {portfolioData.categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl overflow-hidden transition-all duration-500"
            >
              {/* Neon glow on hover */}
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl "></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-900" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                      >
                        <Github className="w-4 h-4 text-gray-900" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Client & Date */}
                  <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                    <span className="font-semibold">
                      Client: {project.client}
                    </span>
                    <span>
                      {new Date(project.completedDate).toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="relative group rounded-2xl transition-transform duration-500 inline-block">
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

            <div className="relative z-10 bg-gray-800 rounded-2xl p-10 shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's work together to bring your vision to life with
                cutting-edge technology and innovative solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector("#contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all"
              >
                Get In Touch
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
