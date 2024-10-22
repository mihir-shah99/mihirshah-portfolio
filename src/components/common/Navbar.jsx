// src/components/common/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-500'
      : 'text-gray-700 hover:text-blue-500';

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          Mihir Shah
        </Link>
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/skills" className={navLinkClass}>
            Skills
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Projects
          </NavLink>
          <NavLink
            to="/skills"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Skills
          </NavLink>
          <NavLink
            to="/blog"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
