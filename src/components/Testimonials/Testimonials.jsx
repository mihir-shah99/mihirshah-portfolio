import React from 'react';
import { motion } from 'framer-motion';
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
    testimonial: 'Mihir’s innovative approach to cloud security has been critical to improving Bugcrowd’s security offerings.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">What Experts Say</h2>
        <div className="space-y-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-8 rounded-lg shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="text-blue-500 text-3xl absolute top-4 left-4" />
              <p className="text-gray-700 italic mb-4">{testimonial.testimonial}</p>
              <FaQuoteRight className="text-blue-500 text-3xl absolute bottom-4 right-4" />
              <p className="text-gray-900 font-semibold">{testimonial.name}</p>
              <p className="text-gray-600 text-sm">{testimonial.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
