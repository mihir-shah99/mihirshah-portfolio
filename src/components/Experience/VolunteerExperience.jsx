import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import nullLogo from '../../assets/images/null.png';
import owaspLogo from '../../assets/images/owasp.png';
import bcsLogo from '../../assets/images/bcs.png';
import hbrLogo from '../../assets/images/hbr.png';
import bugLogo from '../../assets/images/bug.png';
import appsecLogo from '../../assets/images/appsec.png';

const volunteerExperiences = [
  {
    title: 'Fellowship Assessor',
    company: 'British Computer Society',
    logo: bcsLogo,
    date: '2023 - Present',
    details: [
      'Nominated as an FBCS assessor, in which capacity, I assess the applications for aspiring members of the BCS under the Fellowship category and admit them upon a successful assessment.'
    ],
  },
  {
    title: 'Advisory Council Member',
    company: 'Harvard Business Review',
    logo: hbrLogo,
    date: '2024 - Present',
    details: [
      'Helped in research and ongoing activities at HBR as an advisory council member.'
    ],
  },
  {
    title: 'Report Assessor',
    company: 'Bugcrowd',
    logo: bugLogo,
    date: '2022 - Present',
    details: [
      'Review reports and submissions from researchers across the globe and authorize awards based on the merit of the submissions.'
    ],
  },
  {
    title: 'Guest Speaker',
    company: 'OWASP AppSec Day',
    logo: appsecLogo,
    date: '2020 - Present',
    details: [
      'I was an invited speaker at OWASP AppSec conferences across the globe and I have talked and trained the participants on topics:',
      'Best practices in using wide operations platforms including Kubernetes/serverless stack, etc.',
      'Securing the DevOps Code pipeline.',
      'Best security practices and leveraging cloud-native solutions in deploying applications.',
      'Enhancing API performance and security.',
    ],
  },
  {
    title: 'Core Committee Member',
    company: 'null Security',
    logo: nullLogo,
    date: '2017 - Present',
    details: [
      'Managed organizational strategic planning and community development.',
      'Guided and mentored new community members in cybersecurity practices.',
      'Assessed applications for chapter leadership and community involvement.',
    ],
  },
  {
    title: 'Chapter Leader',
    company: 'OWASP Bangalore',
    logo: owaspLogo,
    date: '2017 - Present',
    details: [
      'Managed the OWASP Bangalore chapter, making strategic decisions for community growth.',
      'Organized and led numerous community events focused on cloud and application security.',
    ],
  },
];

const VolunteerExperience = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  return (
    <section className="min-h-screen bg-gray-100 py-20 relative">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-gray-900">Volunteer Experience</h1>
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            ref={timelineRef}
            className="absolute w-1 bg-blue-600 h-full left-1/2 transform -translate-x-1/2 hidden sm:block"
            initial={{ height: '0%' }}
            animate={controls}
            transition={{ duration: 1.5 }}
          ></motion.div>

          {volunteerExperiences.map((experience, index) => (
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

export default VolunteerExperience;
