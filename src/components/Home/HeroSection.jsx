import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
          className="w-32 h-32 rounded-full mx-auto mb-6"
        />
        <h1 className="text-5xl font-bold mb-6">Mihir Shah</h1>
        <p className="text-lg mb-6">
          Cybersecurity Expert | Cloud Security Pioneer | Author of the <em>Cloud Native Software Security Handbook</em>
        </p>
        <div className="space-x-4">
          <motion.a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.05 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#book"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.05 }}
          >
            Learn About My Book
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
