// src/pages/BlogPage.jsx
import React from 'react';
import BlogList from '../components/Blog/BlogList';

const BlogPage = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Blog</h2>
        <BlogList />
      </div>
    </div>
  );
};

export default BlogPage;
