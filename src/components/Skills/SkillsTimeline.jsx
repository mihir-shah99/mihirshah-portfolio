import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaGoogle, FaPython, FaJava, FaDocker } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiMongodb } from 'react-icons/si';

const timelineData = [
  {
    year: '2014',
    title: 'Started with Python & Java',
    icon: <FaPython />,
    description: 'Began my programming journey by mastering Python and Java, learning the fundamentals of object-oriented programming.',
  },
  {
    year: '2016',
    title: 'Explored Cloud Technologies',
    icon: <FaAws />,
    description: 'Gained expertise in AWS and started building scalable applications using cloud infrastructure.',
  },
  {
    year: '2018',
    title: 'Mastered Docker & Kubernetes',
    icon: <FaDocker />,
    description: 'Dove deep into containerization and orchestration with Docker and Kubernetes, creating cloud-native applications.',
  },
  {
    year: '2020',
    title: 'Expanded into Google Cloud & Terraform',
    icon: <FaGoogle />,
    description: 'Learned Google Cloud and Terraform to automate cloud deployments and infrastructure provisioning.',
  },
  {
    year: '2021',
    title: 'Adopted Kubernetes Security Practices',
    icon: <SiKubernetes />,
    description: 'Focused on securing Kubernetes environments, implementing advanced security best practices for cloud-native platforms.',
  },
  {
    year: '2022',
    title: 'Advanced with Security practices',
    icon: <SiMongodb />,
    description: 'Worked extensively with MongoDB and NoSQL databases, optimizing data storage for large-scale cloud applications.',
  },
];

const SkillsTimeline = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Skills Development Timeline</h2>
      <div className="relative">
        <div className="border-l-2 border-blue-500 absolute h-full top-0 left-1/2 transform -translate-x-1/2 hidden sm:block"></div>
        <div className="space-y-12">
          {timelineData.map((event, index) => (
            <motion.div
              key={index}
              className={`flex flex-col sm:flex-row items-center justify-between ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Timeline Card */}
              <div className="w-full sm:w-1/2 p-6 text-center bg-white shadow-lg rounded-lg mb-6 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                <div className="text-blue-500 text-3xl sm:text-4xl mt-4">{event.icon}</div>
              </div>

              {/* Year Marker */}
              <div className="w-full sm:w-1/6 text-center mb-4 sm:mb-0">
                <div className="bg-blue-500 text-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <p className="font-bold text-lg">{event.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTimeline;
