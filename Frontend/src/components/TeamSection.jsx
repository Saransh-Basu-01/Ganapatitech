import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const TeamSection = () => {
  // This data structure will later come from Django API
  const teamData = {
    heading: "Our Team",
    subheading: "Meet the Minds Behind the Magic",
    description:
      "Our diverse team of talented professionals brings together expertise in technology, design, and innovation to deliver exceptional results.",
    members: [
      {
        id: 1,
        name: "Rajesh Kumar",
        role: "CEO & Founder",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        bio: "Visionary leader with 15+ years in tech industry. Passionate about AI and digital transformation.",
        expertise: ["Leadership", "Strategy", "AI"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "rajesh@ganpati.com",
        },
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "CTO",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        bio: "Tech innovator specializing in scalable architectures and cloud solutions. ML/AI expert.",
        expertise: ["Cloud", "ML/AI", "Architecture"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "priya@ganpati.com",
        },
      },
      {
        id: 3,
        name: "Amit Patel",
        role: "Lead Full Stack Developer",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        bio: "Full-stack wizard with expertise in React, Node.js, and modern web technologies.",
        expertise: ["React", "Node.js", "DevOps"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "amit@ganpati.com",
        },
      },
      {
        id: 4,
        name: "Sneha Gupta",
        role: "AI/ML Engineer",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        bio: "Machine learning specialist with a passion for creating intelligent systems and automation.",
        expertise: ["Python", "TensorFlow", "NLP"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "sneha@ganpati.com",
        },
      },
      {
        id: 5,
        name: "Vikram Singh",
        role: "Senior Backend Developer",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
        bio: "Backend expert specializing in scalable APIs, databases, and microservices architecture.",
        expertise: ["Django", "PostgreSQL", "AWS"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "vikram@ganpati.com",
        },
      },
      {
        id: 6,
        name: "Kavya Reddy",
        role: "UI/UX Designer",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        bio: "Creative designer focused on user-centered design and creating delightful experiences.",
        expertise: ["Figma", "Design Systems", "UX Research"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: null,
          email: "kavya@ganpati.com",
        },
      },
      {
        id: 7,
        name: "Arjun Mehta",
        role: "DevOps Engineer",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        bio: "DevOps specialist ensuring smooth deployments and robust infrastructure management.",
        expertise: ["Docker", "Kubernetes", "CI/CD"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "arjun@ganpati.com",
        },
      },
      {
        id: 8,
        name: "Ananya Desai",
        role: "Mobile App Developer",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        bio: "Mobile development expert creating seamless experiences for iOS and Android platforms.",
        expertise: ["React Native", "Flutter", "Mobile UI"],
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          github: "https://github.com",
          email: "ananya@ganpati.com",
        },
      },
    ],
    stats: [
      { number: "50+", label: "Team Members" },
      { number: "15+", label: "Years Experience" },
      { number: "20+", label: "Countries" },
      { number: "98%", label: "Client Satisfaction" },
    ],
  };

  return (
    <section
      id="team"
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
            {teamData.heading}
          </h2>
          <p className="text-2xl md:text-3xl text-orange-300 font-semibold mb-6 drop-shadow-lg">
            {teamData.subheading}
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {teamData.description}
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group rounded-2xl transition-transform duration-500 mb-16"
        >
          <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"></div>

          <div className="relative z-10 bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {teamData.stats.map((stat, index) => (
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

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group rounded-2xl transition-all duration-500"
            >
              {/* Neon glow on hover */}
              <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"></div>

              <div className="relative z-10 bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                {/* Member Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  {/* Social Links Overlay */}
                  <div className="absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {member.social.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {member.social.github && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {member.social.email && (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`mailto:${member.social.email}`}
                        className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-orange-400 text-sm font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="relative group rounded-2xl transition-transform duration-500 inline-block">
            <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl animate-pulse"></div>

            <div className="relative z-10 bg-gray-800 rounded-2xl p-10 shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who are passionate
                about technology and innovation.
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
                View Open Positions
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
