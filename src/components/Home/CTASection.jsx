import React from 'react';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section id="cta" className="py-16 sm:py-20 bg-blue-900 text-white text-center">
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Ready to Secure Your Cloud Infrastructure?
      </motion.h2>
      <motion.p
        className="text-base sm:text-lg mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Let’s work together to build robust, secure cloud-native applications.
      </motion.p>
      <motion.a
        href="/contact"
        className="bg-white text-blue-900 hover:bg-gray-200 font-bold py-2 px-4 sm:px-6 rounded transition-all duration-200"
        whileHover={{ scale: 1.05 }}
      >
        Get in Touch
      </motion.a>
    </section>
  );
};

export default CTASection;
