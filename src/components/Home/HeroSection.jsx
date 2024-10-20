// src/components/Home/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-blue-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Hi, I'm Mihir Shah</h1>
        <p className="text-xl text-gray-600 mb-6">
          A passionate Full-Stack Developer specializing in building exceptional digital experiences.
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/projects'}>
          View My Projects
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
