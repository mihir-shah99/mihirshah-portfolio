import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ImpactSection = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);  // ForgeRock amount
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  useEffect(() => {
    const target1 = 50;  // Industry testimonials
    const target2 = 500000;  // $ saved for ForgeRock
    const target3 = 100;  // Projects impacted
    const target4 = 30;  // Talks, workshops, and mentoring sessions

    const incrementCounter = (count, setCount, target, interval = 50, stepFactor = 100) => {
      const step = Math.ceil(target / stepFactor);
      if (count < target) {
        const timer = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount + step >= target) {
              clearInterval(timer);
              return target;
            }
            return prevCount + step;
          });
        }, interval);
      }
    };

    // ForgeRock amount increments faster
    incrementCounter(count1, setCount1, target1, 50, 150);  // Slower
    incrementCounter(count2, setCount2, target2, 10, 100);  // Faster
    incrementCounter(count3, setCount3, target3, 50, 150);  // Slower
    incrementCounter(count4, setCount4, target4, 50, 150);  // Slower

    // Clear intervals if the component is unmounted
    return () => {
      clearInterval(incrementCounter);
    };
  }, [count1, count2, count3, count4]);

  return (
    <motion.section
      className="py-16 bg-blue-900 text-white text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">My Professional Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl sm:text-6xl font-bold">{count1}+</h3>
            <p className="text-md sm:text-lg">Industry Leaders' Testimonials</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-6xl font-bold">${count2.toLocaleString()}</h3>
            <p className="text-md sm:text-lg">Saved for ForgeRock</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-6xl font-bold">{count3}+</h3>
            <p className="text-md sm:text-lg">Projects Secured Globally</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-6xl font-bold">{count4}+</h3>
            <p className="text-md sm:text-lg">Talks & Workshops Delivered</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ImpactSection;
