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
    image: touch2faImage,
    link: 'https://touch2fa.com/',
  },
  {
    title: 'Cloud Native Software Security Handbook',
    description: 'A comprehensive guide for professionals...',
    image: bookImage,
    link: '/book',
  },
  {
    title: 'VulnDroid',
    description: 'Security Toolkit for Android...',
    image: vulnDroidImage,
    link: 'https://github.com/mihir-shah99/VulnDroid',
  },
];

const ProjectsHighlight = () => {
  return (
    <motion.section
      id="projects"
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
          Highlighted Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover sm:h-64 md:h-48"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {project.description}
                </p>
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
