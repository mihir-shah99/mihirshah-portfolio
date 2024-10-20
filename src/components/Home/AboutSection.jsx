// src/components/Home/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../../assets/images/profile.jpg';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.img
          src={profileImage}
          alt="Mihir Shah"
          className="w-64 h-64 rounded-full mb-8 md:mb-0 md:mr-12 object-cover"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-600 mb-4">
            I'm a Full-Stack Developer with a passion for creating dynamic and responsive web applications. With expertise in React, Node.js, and more, I strive to build solutions that provide seamless user experiences.
          </p>
          <p className="text-gray-600">
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge through my blog.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
