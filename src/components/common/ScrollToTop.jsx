// ScrollToTop.jsx
import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTop;
