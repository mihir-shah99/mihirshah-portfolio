// src/pages/ProjectsPage.jsx
import React from 'react';
import ProjectsList from '../components/Projects/ProjectsList';

const ProjectsPage = () => {
  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Projects</h2>
        <ProjectsList />
      </div>
    </div>
  );
};

export default ProjectsPage;
