// src/components/Contact/ContactInfo.jsx
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaEnvelope className="text-blue-500 mr-2" />
          <a href="mailto:hello@mihirshah.tech" className="text-gray-700 hover:text-blue-500">hello@mihirshah.tech</a>
        </li>
        <li className="flex items-center">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <span className="text-gray-700">Seattle, United States of America</span>
        </li>
      </ul>
      <div className="mt-6 flex space-x-4">
        <a href="https://github.com/mihir-shah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
          <FaGithub size={24} />
        </a>
        <a href="https://linkedin.com/in/mihir-shah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
          <FaLinkedin size={24} />
        </a>
        <a href="https://twitter.com/mihirshah99" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
