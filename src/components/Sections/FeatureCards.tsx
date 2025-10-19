import React from 'react';

const FeatureCards: React.FC = () => {
  const features = [
    {
      icon: '🧭',
      title: 'Smart Matching',
      description: 'Our intelligent quiz learns your preferences to suggest the perfect destinations tailored to your travel style and interests.',
      color: 'from-deep-forest to-deep-forest-light'
    },
    {
      icon: '🏠',
      title: 'Local Insights',
      description: 'Get authentic recommendations from locals and experienced travelers who know the real secrets of each destination.',
      color: 'from-warm-amber to-warm-amber-light'
    },
    {
      icon: '⭐',
      title: 'Community Driven',
      description: 'Share your experiences, earn credits, and help fellow travelers discover amazing places off the beaten path.',
      color: 'from-ocean-sky to-ocean-sky-light'
    },
    {
      icon: '💎',
      title: 'Hidden Gems',
      description: 'Discover unique attractions and experiences that most tourists miss, curated by our community of travel experts.',
      color: 'from-gold-accent to-yellow-400'
    },
    {
      icon: '🌍',
      title: 'Sustainable Travel',
      description: 'Find destinations that promote responsible tourism and support local communities while preserving natural beauty.',
      color: 'from-green-500 to-green-400'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Access your travel recommendations anywhere with our mobile-optimized platform designed for travelers on the go.',
      color: 'from-purple-500 to-purple-400'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section">
            Why Choose Uncharted?
          </h2>
          <p className="text-hero max-w-3xl mx-auto">
            We're not just another travel app. We're your gateway to authentic experiences 
            and hidden destinations that create lasting memories.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-deep-forest mb-4">
                {feature.title}
              </h3>
              <p className="text-feature">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sandstone to-sandstone-light rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-deep-forest mb-4">
              Ready to Discover Your Next Adventure?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who have found their perfect destinations through Uncharted. 
              Your next unforgettable experience is just a quiz away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quiz" 
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center space-x-2"
              >
                <span>Start the Quiz</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/about" 
                className="btn-outline text-lg px-8 py-3"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;








