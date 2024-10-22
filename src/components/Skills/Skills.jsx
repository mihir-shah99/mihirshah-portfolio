import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaAws, FaGoogle, FaDocker, FaPython, FaJava, FaReact, FaNodeJs, FaGitAlt,
} from 'react-icons/fa';
import {
  SiTerraform, SiAnsible, SiOracle, SiMongodb, SiPostgresql, SiKubernetes, SiSnowflake,
} from 'react-icons/si';

// Skill data categorized
const skillsData = {
  'Cloud Security': [
    { name: 'AWS', icon: <FaAws />, proficiency: 90 },
    { name: 'Google Cloud', icon: <FaGoogle />, proficiency: 85 },
    { name: 'Kubernetes', icon: <SiKubernetes />, proficiency: 85 },
    { name: 'Terraform', icon: <SiTerraform />, proficiency: 80 },
  ],
  'DevOps Tools': [
    { name: 'Docker', icon: <FaDocker />, proficiency: 90 },
    { name: 'Ansible', icon: <SiAnsible />, proficiency: 75 },
  ],
  'Programming Languages': [
    { name: 'Python', icon: <FaPython />, proficiency: 95 },
    { name: 'Java', icon: <FaJava />, proficiency: 85 },
    { name: 'React', icon: <FaReact />, proficiency: 80 },
    { name: 'NodeJS', icon: <FaNodeJs />, proficiency: 80 },
  ],
  'Databases': [
    { name: 'Oracle SQL', icon: <SiOracle />, proficiency: 70 },
    { name: 'MongoDB', icon: <SiMongodb />, proficiency: 75 },
    { name: 'PostgreSQL', icon: <SiPostgresql />, proficiency: 70 },
    { name: 'Snowflake', icon: <SiSnowflake />, proficiency: 75 },
  ],
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('Cloud Security');

  // Function to handle smooth scroll
  const handleScrollToSection = (category) => {
    setSelectedCategory(category);
    const section = document.getElementById(category);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        {/* Animated Section Header */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-8 text-blue-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Skills
        </motion.h2>

        {/* Skill Category Tabs */}
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-colors ${
                selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-500 hover:text-white`}
              onClick={() => handleScrollToSection(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display Skills by Category */}
        {Object.keys(skillsData).map((category) => (
          <div id={category} key={category} className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-blue-500">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {skillsData[category].map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center justify-center mb-4 text-5xl sm:text-6xl text-blue-500">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-center mb-4">{skill.name}</h3>
                  
                  {/* Proficiency Bar */}
                  <div className="relative group w-full bg-gray-200 rounded-full h-4 mb-4">
                    <motion.div
                      className="bg-blue-500 h-4 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1.5 }}
                    ></motion.div>
                    
                    {/* Tooltip on Hover */}
                    <span className="absolute left-0 -top-6 bg-blue-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <p className="text-center text-gray-600 text-sm sm:text-base">Proficiency: {skill.proficiency}%</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
