// src/components/Blog/BlogPost.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    content: `
      <p>React Hooks have revolutionized the way we write React components...</p>
      <!-- Add more content as needed -->
    `,
    date: 'October 10, 2023',
    slug: 'understanding-react-hooks',
  },
  {
    id: 2,
    title: 'Getting Started with Tailwind CSS',
    content: `
      <p>Tailwind CSS is a utility-first CSS framework that provides...</p>
      <!-- Add more content as needed -->
    `,
    date: 'September 5, 2023',
    slug: 'getting-started-with-tailwind-css',
  },
  // Add more blog posts as needed
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-800">Post Not Found</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-20 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">Published on {post.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </motion.div>
  );
};

export default BlogPost;
