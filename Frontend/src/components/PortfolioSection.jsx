import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioAPI } from "../services/portfolioAPI";

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolioData, setPortfolioData] = useState({
    heading: "Our Portfolio",
    subheading: "Showcasing Excellence in Every Project",
    description:
      "Explore our diverse portfolio of successful projects that have transformed businesses and delivered exceptional results.",
    categories: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch projects using the API service
      const projectsData = await portfolioAPI.getAll();

      // Extract data (handle pagination if present)
      const projects = projectsData.results || projectsData;

      // Extract unique categories from projects
      const uniqueCategories = [
        ...new Set(
          projects
            .filter((p) => p.category && p.category.is_active)
            .map((p) => p.category.name)
        ),
      ];

      const categories = ["All", ...uniqueCategories];

      // Process projects to match the frontend structure
      const processedProjects = projects.map((project) => {
        // Get full image URL or use placeholder
        const getImageUrl = (imageUrl) => {
          // Return placeholder if no image
          if (!imageUrl) {
            return "https://placehold.co/600x400/1f2937/gray?text=No+Image";
          }

          // If URL is already absolute, return as-is
          if (
            imageUrl.startsWith("http://") ||
            imageUrl.startsWith("https://")
          ) {
            return imageUrl;
          }

          // If URL is relative, prepend base URL
          const baseURL =
            import.meta.env.VITE_API_URL || "http://localhost:8000";
          const cleanBaseURL = baseURL.replace("/api", "");

          // Handle both /media/ and media/ formats
          const cleanImageUrl = imageUrl.startsWith("/")
            ? imageUrl
            : `/${imageUrl}`;
          return `${cleanBaseURL}${cleanImageUrl}`;
        };

        return {
          id: project.id,
          title: project.title,
          slug: project.slug,
          category: project.category?.name || "Uncategorized",
          categoryId: project.category?.id || null,
          description: project.short_description || "No description available",
          image: getImageUrl(project.image || project.thumbnail),
          technologies: project.technologies?.map((tech) => tech.name) || [],
          liveUrl: project.project_url || null,
          githubUrl: project.github_url || null,
          client: project.client || "Confidential",
          completedDate: project.completion_date || project.created_at,
          featured: project.featured || false,
          viewCount: project.view_count || 0,
          isPublished: project.is_published || false,
        };
      });

      // Filter only published projects
      const publishedProjects = processedProjects.filter((p) => p.isPublished);

      setPortfolioData((prev) => ({
        ...prev,
        categories,
        projects: publishedProjects,
      }));
    } catch (err) {
      console.error("Error fetching portfolio data:", err);

      // More detailed error message
      let errorMessage = "Failed to load portfolio data. ";
      if (err.response) {
        errorMessage += `Server error: ${err.response.status}`;
        if (err.response.data?.detail) {
          errorMessage += ` - ${err.response.data.detail}`;
        }
      } else if (err.request) {
        errorMessage +=
          "No response from server. Please check your connection.";
      } else {
        errorMessage += err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter(
          (project) => project.category === activeCategory
        );

  // Loading State
  if (loading) {
    return (
      <section
        id="portfolio"
        className="py-20 bg-gray-900 min-h-screen relative w-full flex items-center justify-center"
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-white mt-4 text-xl">Loading Portfolio...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section
        id="portfolio"
        className="py-20 bg-gray-900 min-h-screen relative w-full flex items-center justify-center"
      >
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 mb-4">
            <p className="text-red-500 text-lg mb-2">
              ⚠️ Error Loading Portfolio
            </p>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchPortfolioData}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Retry
          </motion.button>
        </div>
      </section>
    );
  }

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
        {portfolioData.categories.length > 0 && (
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
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
                <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

                <div className="relative z-10 bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48 bg-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Prevent infinite loop by checking if already set to placeholder
                        if (!e.target.src.includes("placehold.co")) {
                          e.target.src =
                            "https://placehold.co/600x400/1f2937/9ca3af?text=No+Image";
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.category}
                      </span>

                      {/* Featured Badge */}
                      {project.featured && (
                        <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ Featured
                        </span>
                      )}
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
                          title="View Live Project"
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
                          title="View on GitHub"
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
                    {project.technologies.length > 0 ? (
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
                    ) : (
                      <div className="mb-4">
                        <span className="text-gray-500 text-xs italic">
                          No technologies specified
                        </span>
                      </div>
                    )}

                    {/* Client & Date */}
                    <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                      <span className="font-semibold">
                        {project.client
                          ? `Client: ${project.client}`
                          : "Client: Confidential"}
                      </span>
                      <span>
                        {project.completedDate
                          ? new Date(project.completedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Ongoing"}
                      </span>
                    </div>

                    {/* View Count */}
                    {project.viewCount > 0 && (
                      <div className="text-xs text-gray-500 mt-2 text-right">
                        👁️ {project.viewCount}{" "}
                        {project.viewCount === 1 ? "view" : "views"}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-gray-800 rounded-2xl p-10 max-w-2xl mx-auto">
              <p className="text-gray-400 text-xl mb-4">
                {activeCategory === "All"
                  ? "No projects available yet."
                  : `No projects found in "${activeCategory}" category.`}
              </p>
              {activeCategory !== "All" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory("All")}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold"
                >
                  View All Projects
                </motion.button>
              )}
            </div>
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
