// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AchievementsPage from './pages/AchievementsPage';
import NotFound from './pages/NotFound';
import BookPage from './pages/BookPage';
import ExperiencePage from './pages/ExperiencePage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-16"> {/* Added mt-16 to offset fixed navbar height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
