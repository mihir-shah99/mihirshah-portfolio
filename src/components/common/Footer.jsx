// src/components/common/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-white shadow-inner mt-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Mihir Shah. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/mihir-shah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/mihir-shah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com/mihirshah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
