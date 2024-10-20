// src/components/Skills/Skills.jsx
import React from 'react';
import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'React', icon: <FaReact size={40} color="#61DBFB" /> },
    { name: 'Node.js', icon: <FaNodeJs size={40} color="#68A063" /> },
    { name: 'MongoDB', icon: <SiMongodb size={40} color="#4DB33D" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} color="#38B2AC" /> },
    { name: 'HTML5', icon: <FaHtml5 size={40} color="#E34C26" /> },
    { name: 'CSS3', icon: <FaCss3Alt size={40} color="#1572B6" /> },
    { name: 'JavaScript', icon: <FaJsSquare size={40} color="#F0DB4F" /> },
    { name: 'Databases', icon: <FaDatabase size={40} color="#4A5568" /> },
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
