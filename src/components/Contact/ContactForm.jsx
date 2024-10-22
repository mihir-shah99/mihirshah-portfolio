import React, { useState } from 'react';
import Button from '../common/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
  
    try {
      const response = await fetch('https://formspree.io/f/xvgograa', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send Me a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            name="message"
            id="message"
            rows="4"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            {status ? status : 'Send Message'}
          </Button>
        </div>
      </form>
      {status && (
        <p className="mt-4 text-center text-sm text-gray-600">{status}</p>
      )}
    </div>
  );
};

export default ContactForm;
