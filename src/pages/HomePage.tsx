import React from 'react';
import HeroSection from '../components/Sections/HeroSection';
import FeatureCards from '../components/Sections/FeatureCards';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Cards Section */}
      <FeatureCards />
    </div>
  );
};

export default HomePage;



