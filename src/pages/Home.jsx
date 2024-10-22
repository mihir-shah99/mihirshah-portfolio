import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AboutSection from '../components/Home/AboutSection';
import ProjectsHighlight from '../components/Home/ProjectsHighlight';
import Testimonials from '../components/Testimonials/Testimonials';
import CTASection from '../components/Home/CTASection';
import ImpactSection from '../components/Home/ImpactSection';  // New import

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProjectsHighlight />
      <Testimonials />
      <ImpactSection /> 
      <CTASection />
    </div>
  );
};

export default Home;
