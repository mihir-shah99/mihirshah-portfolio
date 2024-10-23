import React from 'react';
import { motion } from 'framer-motion';
import bcsLogo from '../../assets/images/bcs.png';
import ciisecLogo from '../../assets/images/ciisec.jpeg';
import ietLogo from '../../assets/images/iet.png';

const fellowships = [
  {
    title: 'Fellow of BCS',
    logo: bcsLogo,
    description: 'Recognized for contributions and leadership in cybersecurity.',
  },
  {
    title: 'Fellow of CIISec',
    logo: ciisecLogo,
    description: 'Awarded fellowship for expertise and influence in the field of cybersecurity.',
  },
  {
    title: 'Fellow of IET',
    logo: ietLogo,
    description: 'Honored as a leading figure in cloud security and technology innovation.',
  },
];

const FellowshipsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-50 relative">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Awards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {fellowships.map((fellowship, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 cursor-pointer border-t-4 border-indigo-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.img
              src={fellowship.logo}
              alt={fellowship.title}
              className="w-full h-auto object-cover mb-4 rounded"
              whileHover={{ scale: 1.1, rotate: 3 }}
            />
            <h3 className="text-lg font-semibold text-center">{fellowship.title}</h3>
            <p className="text-gray-600 text-center">{fellowship.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Adding a subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-indigo-400 rounded-full opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-purple-500 rounded-full opacity-20"></div>
      </div>
    </section>
  );
};

export default FellowshipsSection;
