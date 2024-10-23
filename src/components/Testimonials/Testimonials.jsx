import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Russ Kirby',
    title: 'CISO at Ping Identity',
    testimonial: 'Mihir led the implementation of a new security model at ForgeRock, saving us over $500,000 and securing our critical cloud infrastructure.',
  },
  {
    name: 'Kaila Pollart',
    title: 'Director at Bugcrowd',
    testimonial: 'Mihir’s innovative approach to cloud security has been critical to improving Bugcrowd\’s security offerings.',
  },
  {
    name: 'Abhimanyu Dhamjia',
    title: 'CEO at Koala Labs',
    testimonial: 'Mr. Shah is highly regarded for his accomplishments. He is certainly one of the highest-level of cybersecurity engineers I\'ve met.',
  },
  {
    name: 'Dr. D Paul Benjamin',
    title: 'Professor of Computer Science at Pace University',
    testimonial: 'It is my conclusion that Mr. Shah is indeed among a select few individuals to have risen to the peak of the field of cybersecurity.',
  },
  {
    name: 'Dr. Weifeng Chen',
    title: 'Professor of Computer Science at Pennsylvania Western University',
    testimonial: 'Mihir Shah has put forth numerous innovations and tools that have been widely accepted by the global cybersecurity community and has also received national and international recognitions for these contributions.',
  },
  {
    name: 'Mr. Vadan Kumar',
    title: 'Cofounder at UBlood',
    testimonial: 'Meeting the highest standard of security for our applications was a mission-critical top prority for our company. It is for this reason that I sought the expertise of Mr. Mihir Shah to perform a security assessment for the AWS, Android, iOS, and Web App for UBlood.',
  },
  {
    name: 'Mr. Gagan Sarawgi',
    title: 'Cofounder at NvisnX',
    testimonial: 'Mr. Mihir Shah is an exceptional leader and one of the luminary expefis who has made contributions of maior importance to the field. Although I didn\'t know Mr. Shah personally, I became familiar with his work from his groundbreaking didactic publication, Cloud Native Software Security Handbook',
  },
  {
    name: 'Mr. Asheer Malhotra',
    title: 'Security Research Leader at Cisco',
    testimonial: 'Mr. Mihir Shah\'s book has been a crucial resource in the success of our business inititatives ',
  },
  {
    name: 'Mr. Arun Perumal',
    title: 'Site Reliability Engineer at Adobe',
    testimonial: 'Mr. Shah\'s "Cloud Native Software Security Handbook" represents a significant breakthrough in our field. ',
  },
  {
    name: 'Mr. Mayank Jindal',
    title: 'Software Engineer at Amazon',
    testimonial: 'I want to express my sincere appreciation for Mr. Shah\'s remarkable book, "Cloud Native Software Security Handbook." It has truly had a profound impact on my endeavors. The way the book seamlessly weaves together intricate security concerns, merging both theoretical concepts and practical applications, is truly commendable',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically switch testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Automatically switch to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Variants for smooth scrolling transition
  const animationVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">What Experts Say</h2>
        <div className="relative overflow-hidden h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={animationVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute w-full flex flex-col items-center"
            >
              <div className="bg-gray-100 p-8 rounded-lg shadow-md mx-auto w-3/4">
                <FaQuoteLeft className="text-blue-500 text-3xl absolute top-4 left-4" />
                <p className="text-gray-700 italic mb-4">{testimonials[currentIndex].testimonial}</p>
                <FaQuoteRight className="text-blue-500 text-3xl absolute bottom-4 right-4" />
                <p className="text-gray-900 font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600 text-sm">{testimonials[currentIndex].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination indicators */}
        <div className="mt-6 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
