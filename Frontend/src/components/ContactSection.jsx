
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Check,
  AlertCircle,
} from "lucide-react";
import { contactAPI } from "../services/contactAPI";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    type: "", // 'success', 'error', or ''
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // This data structure will later come from Django API
  const contactData = {
    heading: "Get In Touch",
    subheading: "Let's Build Something Amazing Together",
    description:
      "Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    contactInfo: [
      {
        icon: Mail,
        title: "Email Us",
        content: "info@ganpati.com",
        link: "mailto:info@ganpati.com",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        icon: Phone,
        title: "Call Us",
        content: "+91 98765 43210",
        link: "tel:+919876543210",
        gradient: "from-green-500 to-teal-500",
      },
      {
        icon: MapPin,
        title: "Visit Us",
        content: "Mumbai, Maharashtra, India",
        link: "https://maps.google.com",
        gradient: "from-orange-500 to-red-500",
      },
      {
        icon: Clock,
        title: "Working Hours",
        content: "Mon - Fri: 9:00 AM - 6:00 PM",
        link: null,
        gradient: "from-purple-500 to-pink-500",
      },
    ],
    socialLinks: [
      { name: "LinkedIn", url: "https://linkedin.com", color: "bg-blue-600" },
      { name: "Twitter", url: "https://twitter.com", color: "bg-sky-500" },
      { name: "Facebook", url: "https://facebook.com", color: "bg-blue-700" },
      { name: "Instagram", url: "https://instagram.com", color: "bg-pink-600" },
      { name: "GitHub", url: "https://github.com", color: "bg-gray-800" },
    ],
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: "", message: "" });

    try {
      // Submit to Django API
      const response = await contactAPI.submitMessage(formData);

      setFormStatus({
        type: "success",
        message: response.message || "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      });

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Handle validation errors
      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorMessage = "Please fix the following errors:\n";
        
        Object.keys(errors).forEach((key) => {
          if (Array.isArray(errors[key])) {
            errorMessage += `${key}: ${errors[key].join(', ')}\n`;
          } else {
            errorMessage += `${key}: ${errors[key]}\n`;
          }
        });
        
        setFormStatus({
          type: "error",
          message: errorMessage,
        });
      } else {
        setFormStatus({
          type: "error",
          message: "Oops! Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
            {contactData.heading}
          </h2>
          <p className="text-2xl md:text-3xl text-orange-300 font-semibold mb-6 drop-shadow-lg">
            {contactData.subheading}
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {contactData.description}
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactData.contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group rounded-2xl transition-all duration-500"
            >
              {/* Neon glow on hover */}
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl p-6 shadow-lg text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-orange-300 transition-colors text-sm"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-300 text-sm">{info.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Contact Form & Map Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

            <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 mb-2 text-sm font-semibold"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 mb-2 text-sm font-semibold"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-300 mb-2 text-sm font-semibold"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-300 mb-2 text-sm font-semibold"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-300 mb-2 text-sm font-semibold"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows="5"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                {/* Status Message */}
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 p-4 rounded-lg ${
                      formStatus.type === "success"
                        ? "bg-green-500/20 text-green-300 border border-green-500/50"
                        : "bg-red-500/20 text-red-300 border border-red-500/50"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm whitespace-pre-line">{formStatus.message}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Map & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Map */}
            <div className="relative group rounded-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709658!3d19.082177513865436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1697284800000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GANPATI Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="relative group rounded-2xl transition-all duration-500">
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Choose GANPATI?
                </h3>
                <ul className="space-y-3">
                  {[
                    "24/7 Customer Support",
                    "Expert Team of Professionals",
                    "Cutting-Edge Technology",
                    "Affordable Pricing",
                    "On-Time Delivery",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative group rounded-2xl transition-transform duration-500 inline-block">
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

            <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {contactData.socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all`}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
