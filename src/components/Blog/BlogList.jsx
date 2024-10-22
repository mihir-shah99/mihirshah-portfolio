// src/components/Blog/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollToTop from '../common/ScrollToTop';

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg p-6">
    <div className="h-48 bg-gray-300 mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-6 bg-gray-300"></div>
  </div>
);

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mihirshah99'
        );
        const data = await response.json();
        const fetchedBlogs = data.items.map((item) => {
          const imageMatch = item.content.match(/<img.*?src="(.*?)"/);
          const imageUrl = imageMatch ? imageMatch[1] : '/default-placeholder.jpg';

          return {
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate).toDateString(),
            thumbnail: imageUrl,
            excerpt: item.description.replace(/(<([^>]+)>)/gi, "").slice(0, 150) + '...',
          };
        });

        setBlogs(fetchedBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Medium blog posts:', error);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Explore Insights on Cloud Security
          </motion.h1>
          <motion.p
            className="text-lg mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Stay updated with the latest trends, tips, and best practices in the world of cloud security.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentBlogs.map((blog, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="overflow-hidden">
                    <motion.img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                      onError={(e) => { e.target.src = '/default-placeholder.jpg'; }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <p className="text-sm text-gray-500 mb-4">Published on {blog.pubDate}</p>
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-8">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`mx-2 px-4 py-2 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition-colors`}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
<ScrollToTop />
export default BlogList;
