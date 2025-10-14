import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Rocket, Heart } from "lucide-react";

const AboutSection = () => {
  // This data structure will later come from Django API
  const aboutData = {
    heading: "About Us",
    subheading: "Transforming Ideas Into Digital Reality",
    description:
      "At GANPATI, we are passionate about leveraging cutting-edge technology to solve real-world problems. Our team of dedicated professionals combines creativity, technical expertise, and industry knowledge to deliver exceptional digital solutions.",
    mission: {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower businesses with innovative technology solutions that drive growth, efficiency, and digital transformation.",
    },
    vision: {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading technology partner for businesses worldwide, recognized for excellence, innovation, and client success.",
    },
    values: [
      {
        icon: Award,
        title: "Excellence",
        description: "We strive for perfection in every project we undertake.",
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "We believe in the power of teamwork and partnerships.",
      },
      {
        icon: Rocket,
        title: "Innovation",
        description:
          "We constantly push boundaries and embrace new technologies.",
      },
      {
        icon: Heart,
        title: "Integrity",
        description:
          "We conduct business with honesty, transparency, and respect.",
      },
    ],
    stats: [
      { number: "2015", label: "Founded" },
      { number: "500+", label: "Projects Delivered" },
      { number: "50+", label: "Team Members" },
      { number: "30+", label: "Countries Served" },
    ],
    story: {
      title: "Our Story",
      content:
        "Founded in 2015, GANPATI began with a simple yet powerful vision: to bridge the gap between technology and business success. What started as a small team of passionate developers has grown into a full-service digital agency, serving clients across the globe. Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to our clients' success.",
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-gray-900 min-h-screen relative w-full"
    >
      {/* Full width dark overlay to cover background images */}
      <div className="absolute inset-0 bg-gray-900 w-full h-full"></div>

      <div className="container mx-auto px-6 text-center text-white relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-900 bg-clip-text text-transparent">
            {aboutData.heading}
          </h2>
          <p className="text-2xl md:text-3xl text-orange-300 font-semibold mb-6 drop-shadow-lg">
            {aboutData.subheading}
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {aboutData.description}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[aboutData.mission, aboutData.vision].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group rounded-2xl transition-transform duration-500"
            >
              {/* Neon background on hover */}
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
              ></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg transition-shadow duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed text-left">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold text-center text-white mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative group rounded-2xl transition-transform duration-500"
              >
                {/* Neon background on hover */}
                <div
                  className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
                ></div>

                <div className="relative z-10 bg-gray-800 rounded-2xl p-6 shadow-lg text-center transition-shadow duration-500">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300"
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-orange-300 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-200 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group rounded-2xl transition-transform duration-500 mb-16"
        >
          {/* Neon background on hover */}
          <div
            className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
          ></div>

          <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutData.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-200 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group rounded-2xl transition-transform duration-500 max-w-5xl mx-auto"
        >
          {/* Neon background on hover */}
          <div
            className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 
                      bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"
          ></div>

          <div className="relative z-10 bg-gray-800 rounded-2xl p-10 shadow-lg">
            <h3 className="text-3xl font-bold text-orange-300 mb-6 text-center">
              {aboutData.story.title}
            </h3>
            <p className="text-gray-200 text-lg leading-relaxed text-center">
              {aboutData.story.content}
            </p>
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector("#team");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all"
              >
                Meet Our Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
