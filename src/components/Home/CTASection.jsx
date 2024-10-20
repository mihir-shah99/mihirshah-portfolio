// src/components/Home/CTASection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ready to Work Together?</h2>
        <p className="text-gray-600 mb-6">
          Whether you have a project in mind or just want to say hello, feel free to reach out!
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/contact'}>
          Contact Me
        </Button>
      </motion.div>
    </section>
  );
};

export default CTASection;
