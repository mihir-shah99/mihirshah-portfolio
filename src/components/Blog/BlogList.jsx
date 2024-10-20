// src/components/Blog/BlogList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    excerpt: 'An in-depth look at React Hooks and how to use them effectively in your projects.',
    date: 'October 10, 2023',
    slug: 'understanding-react-hooks',
  },
  {
    id: 2,
    title: 'Getting Started with Tailwind CSS',
    excerpt: 'A beginner’s guide to integrating Tailwind CSS into your web development workflow.',
    date: 'September 5, 2023',
    slug: 'getting-started-with-tailwind-css',
  },
  // Add more blog posts as needed
];

const BlogList = () => {
  return (
    <div className="space-y-8">
      {blogPosts.map((post) => (
        <motion.div
          key={post.id}
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <p className="text-gray-500 text-sm mb-4">Published on {post.date}</p>
          <Link to={`/blog/${post.slug}`}>
            <Button variant="primary">Read More</Button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogPosts: PropTypes.array,
};

export default BlogList;
