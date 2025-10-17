import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { teamAPI } from "../services/teamapi";

const TeamSection = () => {
  const [teamData, setTeamData] = useState({ members: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamAPI.getAll();
        console.log("Team API response:", data);
        
        // Handle both cases: if data is an array or an object with members property
        if (Array.isArray(data)) {
          setTeamData({ members: data });
        } else {
          setTeamData(data);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-900 text-center text-white">
        <h2 className="text-3xl">Loading Team Members...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-900 text-center text-white">
        <h2 className="text-3xl text-red-500">Error loading team members</h2>
        <p className="text-gray-400 mt-2">{error}</p>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-gray-900 min-h-screen relative w-full">
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
            Our Team
          </h2>
          <p className="text-2xl md:text-3xl text-orange-300 font-semibold mb-6 drop-shadow-lg">
            Meet the Minds Behind the Magic
          </p>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of talented professionals brings together expertise in technology, design, and innovation to deliver exceptional results.
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.members && teamData.members.length > 0 ? (
            teamData.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group rounded-2xl transition-all duration-500"
              >
                <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 blur-3xl"></div>

                <div className="relative z-10 bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                  {/* Member Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                    {/* Social Links Overlay */}
                    <div className="absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {member.linkedin && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                      {member.twitter && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <Twitter className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                      {member.github && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition-colors"
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                      )}
                      {member.email && (
                        <motion.a
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          href={`mailto:${member.email}`}
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
                    {member.expertise && (
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
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              <p>No team members found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;