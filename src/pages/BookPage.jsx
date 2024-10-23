import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import bookCover from '../assets/images/book.jpg';
import threatIcon from '../assets/images/threat.jpg';
import architectureIcon from '../assets/images/architecture.jpg';
import complianceIcon from '../assets/images/compliance.jpg';

// Citation logos (replace with actual image assets)
import bookAuthorityLogo from '../assets/images/bookAuthorityLogo.png';
import cyberSkillsLogo from '../assets/images/cyberSkillsLogo.jpeg';
import tariMoeLogo from '../assets/images/tariMoeLogo.png';
import vikoLibraryLogo from '../assets/images/vikoLibraryLogo.png';
import cloudLogo from '../assets/images/cloud.png';

const BookPage = () => {
  // Canvas Animation Logic
  useEffect(() => {
    const canvas = document.getElementById('dotsCanvas');
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particleCount = window.innerWidth < 640 ? 50 : 100;
    let particles = [];

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particleCount = window.innerWidth < 640 ? 50 : 100;
      particles = [];
      createParticles();
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = window.innerWidth < 640 ? 1 : 2;
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
      for (let i = 0; i < particleCount; i++) {
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
      icon: threatIcon,
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

  const citations = [
    {
      title: 'Book Authority Awards',
      link: 'https://bookauthority.org/books/best-selling-software-security-books',
      logo: bookAuthorityLogo,
    },
    {
      title: 'Cloud Native Security Book (Tari Moe)',
      link: 'https://tari.moe/2024/cloud-native-security-book.html',
      logo: tariMoeLogo,
    },
    {
      title: 'University of Lithuania',
      link: 'https://biblioteka.viko.lt/media/uploads/sites/25/2023/12/EIF-2024-m.-sausis.pdf',
      logo: vikoLibraryLogo,
    },
    {
      title: 'University of Ireland',
      link: 'https://cyberskills.ie/media/Module-Cloud-Security-ArchitectingDescriptor_Final.pdf',
      logo: cyberSkillsLogo,
    },
    {
      title: 'Cloud Marathon Runner',
      link: 'https://thecloudmarathoner.com/index.php/2023/10/08/book-review-what-you-need-to-know-about-cloud-native-software-%f0%9f%94%90-security-handbook-%e2%81%89-%f0%9f%a4%94/',
      logo: cloudLogo,
    },
  ];

  return (
    <section className="min-h-screen bg-dark-blue relative text-white">
      <canvas id="dotsCanvas" className="absolute top-0 left-0 w-full h-full z-10"></canvas>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.img
          src={bookCover}
          alt="Book Cover"
          className="w-2/3 sm:w-1/3 shadow-lg hover:scale-105 transition-transform z-10"
          animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 2 } }}
        />
        <h1 className="text-3xl sm:text-5xl font-bold mt-8 z-10">Cloud Native Software Security Handbook</h1>
        <motion.a
          href="#highlights"
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-full text-lg sm:text-xl shadow-lg hover:bg-blue-600 z-10"
          whileHover={{ scale: 1.05 }}
        >
          Start Your Journey
        </motion.a>
      </div>

      <section id="highlights" className="py-16 sm:py-20 bg-gradient-to-r from-gray-100 to-gray-300">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Key Sections of the Book</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
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
              <img src={highlight.icon} alt={`Icon ${index + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-gray-900">{highlight.title}</h3>
              <p className="text-gray-600 text-center">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Citations & Mentions Section */}
        <section className="py-16 sm:py-20 bg-gray-100 relative z-20">  {/* Ensure this section is above the canvas */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">Citations & Mentions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {citations.map((citation, index) => (
              <motion.a
                key={index}
                href={citation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer z-30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ zIndex: 30, pointerEvents: 'auto' }}
              >
                <img 
                  src={citation.logo} 
                  alt={citation.title} 
                  className="w-24 h-24 mb-4 transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <p className="text-center text-lg font-semibold text-gray-900 hover:text-blue-600">
                  {citation.title}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

      {/* What Readers Are Saying */}
      <div className="py-12 sm:py-20 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 text-center">What Readers Are Saying</h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-4 sm:space-x-8 text-black justify-center"
            initial={{ x: 200 }}
            animate={{ x: [-200, 0], transition: { duration: 10, ease: 'easeInOut', loop: Infinity } }}
          >
            <motion.div
              className="w-72 sm:w-80 p-4 sm:p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-gray-800">“A must-read for any cloud security professional.”</p>
              <p className="mt-4 text-right text-gray-600 font-semibold">- Kevin Streater</p>
            </motion.div>

            <motion.div
              className="w-72 sm:w-80 p-4 sm:p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-gray-800">“Highly practical and valuable for security teams.”</p>
              <p className="mt-4 text-right text-gray-600 font-semibold">- Gagan Sarawgi</p>
            </motion.div>

            <motion.div
              className="w-72 sm:w-80 p-4 sm:p-6 bg-white rounded-lg border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-gray-800">“An indispensable guide for navigating cloud security.”</p>
              <p className="mt-4 text-right text-gray-600 font-semibold">- Kaila Pollart</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-12 sm:py-16 bg-blue-800 text-center relative z-50">
        <motion.a
          href="https://a.co/d/d8yL6wR"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-800 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full shadow-lg hover:shadow-xl transition-all"
          style={{ pointerEvents: 'auto' }} // Ensure pointer events are active
        >
          Get Your Copy Now &rarr;
        </motion.a>
      </div>
    </section>
  );
};

export default BookPage;
