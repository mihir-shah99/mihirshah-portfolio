import React from 'react';
import { motion } from 'framer-motion';
import nywLogo from '../../assets/images/nyw.png';
import wstLogo from '../../assets/images/wst.webp';
import usiLogo from '../../assets/images/usi.jpeg';
import sbLogo from '../../assets/images/sb.png';

// Sample data for media features
const mediaFeatures = [
  {
    title: 'New York Weekly',
    description: 'Featured for contributions to cybersecurity and cloud security innovations.',
    logo: nywLogo,
    link: 'https://nyweekly.com/tech/mihir-shah-a-trailblazer-in-cybersecurity-and-thought-leader-in-the-industry/', 
  },
  {
    title: 'Wall Street Times',
    description: 'Recognized as a leading voice in cloud security solutions.',
    logo: wstLogo,
    link: 'https://wallstreettimes.com/mihir-shah-pioneering-the-future-of-cybersecurity-through-expertise-and-innovation/', 
  },
  {
    title: 'US Insider',
    description: 'Recognized as a pioneer in cybersecurity.',
    logo: usiLogo,
    link: 'https://usinsider.com/mihir-shah-pioneering-cybersecurity-excellence-and-inspiring-future-innovator/', 
  },
  {
    title: 'Security Boulevard',
    description: 'Interviewed about future trends in cybersecurity and cloud-native security.',
    logo: sbLogo,
    link: 'https://securityboulevard.com/2024/04/how-to-secure-cloud-native-applications/', 
  },
];

const MediaFeaturesSection = () => {
  return (
    <section className="py-12 px-4 sm:px-8 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-900">Featured In Media</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mediaFeatures.map((feature, index) => (
          <motion.a
            key={index}
            href={feature.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition-transform hover:scale-105 hover:rotate-1 relative overflow-hidden block"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-yellow-500 to-transparent opacity-0 hover:opacity-100 transition-all duration-500"
            />
            <img
              src={feature.logo}
              alt={feature.title}
              className="w-32 h-32 object-contain mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default MediaFeaturesSection;
