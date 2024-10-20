// src/components/Skills/Skills.jsx
import React from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const Skills = () => {
  const skills = [
    { name: 'React', icon: <FaReact size={40} color="#61DBFB" /> },
    { name: 'Node.js', icon: <FaNodeJs size={40} color="#68A063" /> },
    { name: 'Database', icon: <FaDatabase size={40} color="#f29111" /> },
    // Add more skills as needed
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col items-center">
          {skill.icon}
          <p className="mt-2 text-gray-700">{skill.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Skills;
