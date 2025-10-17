import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { blogAPI } from "../services/blogAPI";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        console.log("Blog API response:", data);

        // Handle both cases: if backend returns an array or an object with `results` or `blogs`
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (data.results) {
          setBlogs(data.results);
        } else if (data.blogs) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gray-900 text-center text-white">
        <h2 className="text-3xl">Loading Blog Posts...</h2>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gray-900 text-center text-white">
        <h2 className="text-3xl text-red-500">Error loading blogs</h2>
        <p className="text-gray-400 mt-2">{error}</p>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-900 min-h-screen relative w-full">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
            Our Blog
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Insights, guides, and updates from our team to help you stay ahead in tech.
          </p>
        </motion.div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs && blogs.length > 0 ? (
            blogs.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col group"
              >
                {/* Blog Image */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={post.image || "https://via.placeholder.com/600x400?text=No+Image"}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 flex-1">{post.excerpt || post.summary}</p>

                  <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                <span>
  By{" "}
  {typeof post.author === "object"
    ? `${post.author.first_name || ""} ${post.author.last_name || post.author.username || ""}`.trim()
    : post.author || "Unknown"}
</span>

                    {post.created_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <a
                    href={post.url || `/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:underline mt-auto"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              <p>No blog posts found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
