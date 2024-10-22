import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import forgerockLogo from '../../assets/images/forgerock.png';
import aristaLogo from '../../assets/images/arista.png';
import ubloodLogo from '../../assets/images/ublood.png';
import kbsLogo from '../../assets/images/kbs.png';
import primatechLogo from '../../assets/images/primatech.png';
import stanfordLogo from '../../assets/images/stanford.png';

const experiences = [
  {
    title: 'Senior Staff Application Security Engineer',
    company: 'ForgeRock',
    logo: forgerockLogo,
    date: '2021 - Present',
    details: [
      'Led a team of 6 AppSec Engineers and authored the Cloud Security Model for software engineers.',
      'Managed Bug bounty programs, performed threat modeling, and automated security vulnerability scanning.',
      'Instrumental in the startup acquisition by building and commercializing a cloud-native AWS Threat Detection engine.',
    ],
  },
  {
    title: 'Senior Cloud Security Engineer',
    company: 'Arista NDR',
    logo: aristaLogo,
    date: '2019 - 2021',
    details: [
      'Filed a patent for automated defense in cloud-native environments, contributing to company acquisition.',
      'Led a team of 4 engineers in product development and commercialization of a cloud security product.',
    ],
  },
  {
    title: 'Security Software Engineer',
    company: 'UBlood',
    logo: ubloodLogo,
    date: '2020',
    details: [
      'Performed a security assessment before product launch and developed a secure SDLC pipeline.',
      'Identified and mitigated multiple security concerns for Android, iOS, and AWS applications.',
    ],
  },
  {
    title: 'Application Security Engineer',
    company: 'KBS Ltd.',
    logo: kbsLogo,
    date: '2016 - 2019',
    details: [
      'Implemented MFA authentication and secure token services for applications.',
      'Developed automation scripts for third-party dependency upgrades, improving efficiency by over 65%.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'PrimaTech Solutions',
    logo: primatechLogo,
    date: '2014 - 2016',
    details: [
      'Developed backend infrastructure for an investment banking startup using GCP and Kubernetes.',
      'Designed a microservice architecture, reducing AWS costs by 50% while improving performance by 30%.',
    ],
  },
  {
    title: 'Industry Mentor',
    company: 'Stanford University',
    logo: stanfordLogo,
    date: '2020 - Present',
    details: [
      'Guided mentees through research and capstone projects in web app security.',
      'Supplemented course structure with industry implementations of security concepts.',
      'Mentored professionals and students in cybersecurity practices and research.',
    ],
  },
];

const ProfessionalExperience = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const controls = useAnimation();

  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (timelineInView) {
      controls.start({ height: '100%' });
    }
  }, [timelineInView, controls]);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 py-20 relative">
      {/* Scroll Progress Bar */}
      <div
        className="fixed left-0 top-0 h-full w-1 bg-blue-600 z-50"
        style={{ height: `${scrollProgress}%` }}
      ></div>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900">Professional Experience</h1>
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            ref={timelineRef}
            className="absolute w-1 bg-blue-600 h-full left-1/2 transform -translate-x-1/2 hidden sm:block"
            initial={{ height: '0%' }}
            animate={controls}
            transition={{ duration: 1.5 }}
          ></motion.div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className={`flex flex-col sm:flex-row items-center justify-between mb-10 w-full ${
                index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setCurrentStep(index + 1)}
            >
              {/* Experience Card */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 sm:w-1/3 w-full mb-4 sm:mb-0 transform transition-transform hover:-translate-y-2 hover:shadow-xl hover:scale-105 duration-300"
              >
                <div className="flex items-center mb-4">
                  {/* Company Logo */}
                  <img src={experience.logo} alt={`${experience.company} logo`} className="w-12 h-12 mr-4" />
                  <div>
                    <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 mb-1">{experience.title}</h2>
                    <h3 className="text-lg sm:text-xl font-medium text-blue-600">{experience.company}</h3>
                    <p className="text-sm text-gray-500">{experience.date}</p>
                  </div>
                </div>
                <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                  {experience.details.map((detail, i) => (
                    <li key={i}>• {detail}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Step Marker */}
              <motion.div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                  currentStep === index + 1 ? 'bg-yellow-500' : 'bg-blue-600'
                } border-4 border-white flex items-center justify-center text-white font-bold text-sm sm:text-lg transition-colors duration-300`}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
