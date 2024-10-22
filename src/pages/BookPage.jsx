import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import bookCover from '../assets/images/book.jpg';
import threatIcon from '../assets/images/threat.jpg';
import architectureIcon from '../assets/images/architecture.jpg';
import complianceIcon from '../assets/images/compliance.jpg';

const BookPage = () => {
  // Connecting Dots Animation Logic
  useEffect(() => {
    const canvas = document.getElementById('dotsCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = 2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
    }

    function createParticles() {
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    }

    function drawLines() {
      let maxDist = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDist})`;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let particle of particles) {
        particle.update();
        particle.draw();
      }
      drawLines();
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();
  }, []);

  const highlights = [
    {
      title: 'Threat Modeling',
      description: 'Learn how to identify, analyze, and mitigate threats in cloud-native environments.',
      icon: threatIcon, // Use imported images
    },
    {
      title: 'Secure Architecture',
      description: 'Understand the fundamentals of building secure, scalable cloud architectures.',
      icon: architectureIcon,
    },
    {
      title: 'Compliance Best Practices',
      description: 'Explore regulatory compliance strategies for cloud-native environments.',
      icon: complianceIcon,
    },
  ];

  return (
    <section className="min-h-screen bg-dark-blue relative text-white">
      <canvas id="dotsCanvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.img 
          src={bookCover} 
          alt="Book Cover" 
          className="w-1/3 shadow-lg hover:scale-105 transition-transform z-10"
          animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }} 
        />
        <h1 className="text-5xl font-bold mt-8 z-10">Cloud Native Software Security Handbook</h1>
        <motion.a 
          href="#highlights" 
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-full text-xl shadow-lg hover:bg-blue-600 z-10"
          whileHover={{ scale: 1.05 }}
        >
          Start Your Journey
        </motion.a>
      </div>

      <section id="highlights" className="py-20 bg-gradient-to-r from-gray-100 to-gray-300">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Key Sections of the Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1, translateY: '-10px' }}
            >
              <img src={highlight.icon} alt={`Icon ${index + 1}`} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-4 text-gray-900">{highlight.title}</h3>
              <p className="text-gray-600 text-center">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

{/* Sliding Reviews */}
<div className="py-20 bg-gray-50">
  <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">What Readers Are Saying</h2>
  <div className="relative overflow-hidden">
    <motion.div 
      className="flex space-x-8 text-black justify-center"
      initial={{ x: 200 }}
      animate={{ x: [-200, 0], transition: { duration: 10, ease: "easeInOut", loop: Infinity } }}
    >
      <motion.div 
        className="w-80 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
      >
        <p className="text-gray-800">“A must-read for any cloud security professional.”</p>
        <p className="mt-4 text-right text-gray-600 font-semibold">- Kevin Streater</p>
      </motion.div>
      
      <motion.div 
        className="w-80 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
      >
        <p className="text-gray-800">“Highly practical and valuable for security teams.”</p>
        <p className="mt-4 text-right text-gray-600 font-semibold">- Gagan Sarawgi</p>
      </motion.div>
      
      <motion.div 
        className="w-80 p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.1 }}
      >
        <p className="text-gray-800">“An indispensable guide for navigating cloud security.”</p>
        <p className="mt-4 text-right text-gray-600 font-semibold">- Kaila Pollart</p>
      </motion.div>
    </motion.div>
  </div>
</div>



      {/* Final CTA Section */}
{/* Final CTA Section */}
<div className="py-16 bg-blue-800 text-center">
  <motion.a 
    href="https://a.co/d/d8yL6wR" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-white text-blue-800 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all"
  >
    Get Your Copy Now &rarr;
  </motion.a>
</div>

    </section>
  );
};

export default BookPage;
