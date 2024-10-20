// src/pages/ContactPage.jsx
import React from 'react';
import ContactForm from '../components/Contact/ContactForm';
import ContactInfo from '../components/Contact/ContactInfo';

const ContactPage = () => {
  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <ContactForm />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
