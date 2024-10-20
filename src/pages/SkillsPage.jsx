// src/pages/SkillsPage.jsx
import React from 'react';
import Skills from '../components/Skills/Skills';

const SkillsPage = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Skills</h2>
        <Skills />
      </div>
    </div>
  );
};

export default SkillsPage;
