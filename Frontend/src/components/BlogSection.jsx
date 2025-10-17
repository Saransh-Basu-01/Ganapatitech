import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 AI Trends Shaping 2025",
    excerpt:
      "Explore the top AI innovations to watch in the coming year and how they're transforming industries.",
    author: "Priya Sharma",
    date: "2025-10-01",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    url: "#",
  },
  {
    id: 2,
    title: "Building Secure Web Apps",
    excerpt:
      "A developer’s guide to best security practices for modern web applications.",
    author: "Amit Patel",
    date: "2025-09-20",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    url: "#",
  },
  {
    id: 3,
    title: "Future of Mobile UX",
    excerpt:
      "Design tips and trends for creating delightful user experiences on mobile platforms.",
    author: "Kavya Reddy",
    date: "2025-09-12",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    url: "#",
  },
];

const BlogSection = () => {
  return (
    <section
      id="blog"
      className="py-20 bg-gray-900 min-h-screen relative w-full"
    >
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
            Insights, guides, and updates from our team to help you stay ahead
            in tech.
          </p>
        </motion.div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg flex flex-col group"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                  <span>By {post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <a
                  href={post.url}
                  className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:underline mt-auto"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
