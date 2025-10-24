import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import heroImage from "../../assets/hero-adventure.png";


const HeroSection: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [unsplashImage, setUnsplashImage] = useState("");
const [imageLoading, setImageLoading] = useState(true);


React.useEffect(() => {
  // ✓ Wrapped the entire fetch logic inside useEffect
  const fetchHeroImage = async () => {
    try {
      const UNSPLASH_ACCESS_KEY = "UbfZLv6s9r09ktv6YjtV2k7LG8Q3Of_gTFMCLiAh_u0";
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=travel&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      );

      if (response.ok) {
        const data = await response.json();
        setUnsplashImage(data.urls.regular);
      }
    } catch (error) {
      console.error("Error fetching hero image:", error);
    } finally {
      setImageLoading(false);
    }
  };

  fetchHeroImage();
}, []); // ✓ ADDED: Empty dependency array - runs once on component mount


  return (
    <section className="hero-section">
      {/* Background Image with Overlay */}
      <div className="relative h-[600px] sm:h-[700px] flex items-center justify-center">
        {imageLoading ? (
          <div className="w-full h-full bg-gradient-forest animate-pulse" />
        ) : (
          <>
            <img src={unsplashImage || heroImage} alt="Adventure travel" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-forest opacity-40" />
          </>
        )}
     
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-hero mb-6">
            Explore the Unseen
          </h1>
          <p className="text-hero mb-8">
            Discover hidden gems and authentic experiences with our intelligent destination finder. 
            Get personalized recommendations from locals and fellow travelers who know the real secrets.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/quiz" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
            >
              <span>Start Your Journey</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            {!isLoggedIn && (
              <Link 
                to="/signup" 
                className="btn-outline text-lg px-8 py-4"
              >
                Join the Community
              </Link>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold-accent rounded-full"></div>
              <span>50+ Unique Destinations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold-accent rounded-full"></div>
              <span>Local Expert Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gold-accent rounded-full"></div>
              <span>Authentic Experiences</span>
            </div>
          </div>
        </div>
      </div>

      {/* No Account Needed Message */}
      {!isLoggedIn && (
        <div className="mt-8 p-4 bg-sandstone-light border border-sandstone-dark rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-deep-forest">No account needed</span> to browse destinations and take the quiz. 
            <span className="font-medium text-deep-forest"> Sign up</span> to ask locals, share tips, and earn credits.
          </p>
        </div>
      )}
        
      {/* Hero Image/Visual */}
      <div className="mt-16 relative">
        <div className="bg-gradient-to-r from-ocean-sky to-warm-amber rounded-2xl p-8 text-white text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold mb-2">Your Next Adventure Awaits</h3>
          <p className="text-lg opacity-90">
            Take our quiz and discover destinations perfectly matched to your travel style
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
