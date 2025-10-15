import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Team", href: "#team" },
      { label: "Portfolio", href: "#portfolio" },
    ],
    resources: [
      { label: "Blog", href: "#blog" },
      { label: "Case Studies", href: "#portfolio" },
      { label: "Contact", href: "#contact" },
      { label: "Dashboard", href: "#dashboard" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "Disclaimer", href: "#disclaimer" },
    ],
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: FaEnvelope, text: "contact@ganapatitech.com" },
    { icon: FaPhone, text: "+1 (555) 123-4567" },
    { icon: FaMapMarkerAlt, text: "123 Tech Street, Innovation City" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-4">
              Ganapatitech
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming ideas into digital reality. We specialize in creating innovative solutions that drive business growth and digital transformation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-orange-400 transition-colors"
                >
                  <item.icon className="text-orange-400 flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-orange-300 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm"
          >
            <p>© {currentYear} Ganapatitech. All rights reserved.</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
              >
                <social.icon className="text-lg" />
              </motion.a>
            ))}
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => scrollToSection("#hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
          >
            Back to Top ↑
          </motion.button>
        </div>

        {/* Extra Info Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 text-xs text-gray-600"
        >
          <p>Built with ❤️ using React, Vite, and Tailwind CSS</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;