// src/pages/SkillsPage.jsx
import React from 'react';
import Skills from '../components/Skills/Skills';
import SkillsTimeline from '../components/Skills/SkillsTimeline';

const SkillsPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900">
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <Skills />
        <SkillsTimeline />
      </div>
    </div>
    </section>
  );
};

export default SkillsPage;
