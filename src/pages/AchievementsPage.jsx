import React from 'react';
import FellowshipsSection from '../components/Achievements/FellowshipsSection';
import MediaFeaturesSection from '../components/Achievements/MediaFeaturesSection';
import CertificationsSection from '../components/Achievements/CertificationsSection';

const AchievementsPage = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <section className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-center mb-8">Achievements</h1>
          <p className="text-lg sm:text-xl text-center text-gray-700">
            Explore Mihir Shah's exceptional accomplishments in the world of cybersecurity.
          </p>
        </section>

        {/* Media Features Section */}
        <MediaFeaturesSection />

        {/* Fellowships Section */}
        <FellowshipsSection />

        {/* Certifications Section */}
        <CertificationsSection />
      </div>
    </div>
  );
};

export default AchievementsPage;
