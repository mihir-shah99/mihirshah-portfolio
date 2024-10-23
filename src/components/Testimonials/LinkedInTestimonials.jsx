import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LinkedInTestimonials = ({ linkedinPosts }) => {
  const sliderSettings = {
    dots: true,
    infinite: linkedinPosts.length > 1,  // Enable infinite scrolling only if there's more than 1 post
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Allows users to manually scroll with arrows
    swipe: true,  // Allow users to swipe to scroll
    draggable: true, // Ensures that desktop users can drag to scroll
    touchMove: true,  // Enables touch move for touch devices
    autoplay: false,  // Disable autoplay to ensure you can see the manual scroll feature
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,  // Hide arrows on mobile for better UI
        }
      }
    ]
  };

  return (
    <section className="linkedin-testimonials py-12">
      <h2 className="text-3xl font-bold text-center mb-6">LinkedIn Testimonials</h2>
      {linkedinPosts.length > 0 ? (
        <Slider {...sliderSettings}>
          {linkedinPosts.map((post, index) => (
            <div key={index} className="p-4">
              <iframe
                src={post.url}
                height="500"
                width="100%"
                frameBorder="0"
                allowFullScreen={true}
                title={`LinkedIn Testimonial ${index + 1}`}
                className="rounded-lg shadow-lg"
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-600">No LinkedIn testimonials available at the moment.</p>
      )}
    </section>
  );
};

LinkedInTestimonials.propTypes = {
  linkedinPosts: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LinkedInTestimonials;
