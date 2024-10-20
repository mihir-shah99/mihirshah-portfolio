// src/components/Projects/ProjectsList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import PropTypes from 'prop-types';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A brief description of Project One.',
    image: '/assets/images/project1.jpg',
    link: 'https://github.com/yourusername/project-one',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    image: '/assets/images/project2.jpg',
    link: 'https://github.com/yourusername/project-two',
  },
  // Add more projects as needed
];

const ProjectsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Button variant="primary" onClick={() => window.open(project.link, '_blank')}>
              View Project
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.array,
};

export default ProjectsList;
