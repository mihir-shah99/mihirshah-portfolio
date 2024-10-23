// TestimonialsPage.jsx
import React from 'react';
import LinkedInTestimonials from '../components/Testimonials/LinkedInTestimonials';
import QuoteTestimonials from '../components/Testimonials//Testimonials'; 
import { linkedinTestimonials } from '../components/Testimonials//testimonialsData';

const TestimonialsPage = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">What People Say About Me</h1>
        <p className="mt-4 text-gray-600">
          Read testimonials from my clients and connections.
        </p>
      </section>
      
      {/* LinkedIn Testimonials */}
      <LinkedInTestimonials linkedinPosts={linkedinTestimonials} />
      
      {/* Quote Testimonials */}
      <QuoteTestimonials />
      
      {/* Call to Action */}
      <section className="text-center mt-12">
        <h2 className="text-2xl font-semibold">Want to leave a testimonial?</h2>
        <a href="https://www.linkedin.com/in/mihir-shah99" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg">
          Connect with me on LinkedIn
        </a>
      </section>
    </div>
  );
};

export default TestimonialsPage;
