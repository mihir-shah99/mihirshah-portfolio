// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import CTASection from '../components/Home/CTASection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CTASection />
    </div>
  );
};

export default Home;
