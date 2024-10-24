import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter, FaMedium, FaEnvelope } from 'react-icons/fa'; // Importing icons
import profileImage from '../../assets/images/profile.jpg';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 300], [0, 100]); // Parallax effect

  return (
    <motion.section
      className="relative h-screen bg-gradient-to-r from-blue-800 to-gray-900 text-white flex flex-col justify-center items-center"
      style={{ y: backgroundY }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <img
          src={profileImage}
          alt="Mihir Shah"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6"
        />
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Mihir Shah</h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6">
          Cybersecurity Expert | Cloud Security Pioneer | Author of the <em>Cloud Native Software Security Handbook</em>
        </p>
        <div className="space-x-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center mb-6">
          <motion.a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mb-3 sm:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/book"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
            whileHover={{ scale: 1.05 }}
          >
            Learn About My Book
          </motion.a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 justify-center">
          <motion.a
            href="https://www.linkedin.com/in/mihir-shah99"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-gray-400"
          >
            <FaLinkedin size={30} />
          </motion.a>
          <motion.a
            href="https://github.com/mihir-shah99"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={30} />
          </motion.a>
          <motion.a
            href="https://twitter.com/mihirshah99"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-gray-400"
          >
            <FaTwitter size={30} />
          </motion.a>
          <motion.a
            href="https://mihirshah99.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-gray-400"
          >
            <FaMedium size={30} />
          </motion.a>
          <motion.a
            href="mailto:mihir@mihirshah.tech"
            whileHover={{ scale: 1.1 }}
            className="text-white hover:text-gray-400"
          >
            <FaEnvelope size={30} />
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
