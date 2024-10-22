import React from 'react';
import { motion } from 'framer-motion';

// Correctly import the images
import touch2faImage from '../../assets/images/touch2fa.jpg';
import bookImage from '../../assets/images/book.jpg';
import vulnDroidImage from '../../assets/images/vulndroid.jpg';

const projects = [
  {
    title: 'Touch2FA',
    description: 'A flagship 2FA security solution...',
    image: touch2faImage,  // Use the imported image here
    link: 'https://touch2fa.com/',
  },
  {
    title: 'Cloud Native Software Security Handbook',
    description: 'A comprehensive guide for professionals...',
    image: bookImage,  // Use the imported image here
    link: '/book',
  },
  {
    title: 'VulnDroid',
    description: 'Security Toolkit for Android...',
    image: vulnDroidImage,  // Use the imported image here
    link: 'https://github.com/mihir-shah99/VulnDroid',
  },
  // Add more projects...
];

const ProjectsHighlight = () => {
  return (
    <motion.section
      id="projects"
      className="py-20 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Highlighted Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a href={project.link} className="text-blue-500 hover:text-blue-700">
                  Learn More &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsHighlight;
