import React from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaShieldAlt, FaBook } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="py-24 bg-gradient-to-r from-gray-100 to-gray-200 mt-20"  // Margin added for separation
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 mb-4">
          
          {/* Block 1: Cloud Security Expertise */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaCloud className="inline-block text-blue-500 text-3xl mb-2" />
            <p className="text-lg">
              <strong className="text-gray-800">Cloud Security Pioneer</strong>: With years of experience designing secure cloud infrastructures, I’ve guided Fortune 500 companies to safe digital landscapes.
            </p>
          </div>

          {/* Block 2: Author and Thought Leader */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaBook className="inline-block text-blue-500 text-3xl mb-2" />
            <p className="text-lg">
              Author of <strong className="text-blue-700">Cloud Native Software Security Handbook</strong>, I share insights that help organizations fortify their systems against modern cyber threats.
            </p>
            <a href="/book" className="text-blue-500 hover:text-blue-700 mt-4 block">Discover My Book &rarr;</a>
          </div>

          {/* Block 3: Strategic Impact */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <FaShieldAlt className="inline-block text-blue-500 text-3xl mb-2" />
            <p className="text-lg">
              With a passion for solving complex security challenges, I’ve helped companies save <strong className="text-blue-700">millions</strong> by building resilient systems that prevent costly breaches.
            </p>
          </div>
        </div>

        {/* Call to Action to Explore More */}
        <a
          href="#testimonials"
          className="mt-8 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition"
        >
          Read What Experts Say &rarr;
        </a>
      </div>
    </motion.section>
  );
};

export default AboutSection;
