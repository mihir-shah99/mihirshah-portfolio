// src/pages/BlogPage.jsx
import React from 'react';
import BlogList from '../components/Blog/BlogList';

const BlogPage = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <BlogList />
      </div>
    </div>
  );
};

export default BlogPage;
