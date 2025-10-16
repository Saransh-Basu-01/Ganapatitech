import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [openSection, setOpenSection] = useState(null); // for mobile collapsible sections

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

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>

            <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-3 md:mb-4">
                            Ganapatitech
                        </h3>
                        <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                            Transforming ideas into digital reality. We specialize in creating innovative solutions that drive business growth.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors text-sm"
                                >
                                    <item.icon className="text-orange-400 flex-shrink-0" />
                                    <span>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Sections */}
                    {["company", "resources", "legal"].map((section, i) => (
                        <motion.div
                            key={section}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                        >
                            <button
                                onClick={() => toggleSection(section)}
                                className="w-full flex justify-between items-center md:block text-left text-gray-300 hover:text-orange-400 font-semibold mb-2 md:mb-4"
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                <span className="md:hidden">{openSection === section ? "−" : "+"}</span>
                            </button>
                            <ul
                                className={`space-y-1 md:space-y-2 overflow-hidden transition-all duration-300
    md:max-h-full ${openSection === section ? "max-h-96" : "max-h-0"}`}
                            >
                                {footerLinks[section].map((link, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm md:text-base hover:translate-x-1 inline-block"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-6 md:my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-500 text-sm"
                    >
                        <p>© {currentYear} Ganapatitech. All rights reserved.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex space-x-3 md:space-x-4"
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
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white transition-all duration-300 shadow-md md:shadow-lg"
                            >
                                <social.icon className="text-sm md:text-lg" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Extra Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mt-4 text-xs text-gray-500"
                >
                    <p>Built with ❤️ using React, Vite, and Tailwind CSS</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
