import React from 'react';
import { motion } from 'framer-motion';
import oscpLogo from '../../assets/images/oscp.png';
import ckaLogo from '../../assets/images/cka.png';
import cksLogo from '../../assets/images/cks.png';

// Sample data for certifications
const certifications = [
  {
    title: 'OSCP',
    description: 'Offensive Security Certified Professional',
    image: oscpLogo,
  },
  {
    title: 'CKA',
    description: 'Certified Kubernetes Administrator',
    image: ckaLogo,
  },
  {
    title: 'CKS',
    description: 'Certified Kubernetes Security Specialist',
    image: cksLogo,
  },
];

const CertificationsSection = () => {
  return (
    <section className="py-12 px-4 sm:px-8 bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-auto object-cover mb-4 border-4 border-transparent hover:border-yellow-500 rounded-lg"
            />
            <h3 className="text-lg font-semibold text-center text-gray-900">{cert.title}</h3>
            <p className="text-gray-600 text-center">{cert.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
