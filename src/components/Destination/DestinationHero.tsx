import React from 'react';
import { Destination } from '../../types';

interface DestinationHeroProps {
  destination: Destination;
  isSaved: boolean;
  isVisited: boolean;
  onSave: () => void;
  onVisit: () => void;
  isLoggedIn: boolean;
}

const DestinationHero: React.FC<DestinationHeroProps> = ({
  destination,
  isSaved,
  isVisited,
  onSave,
  onVisit,
  isLoggedIn
}) => {
  return (
    <div className="card overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        {destination.image_url ? (
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sandstone to-sandstone-light flex items-center justify-center">
            <span className="text-6xl">🏛️</span>
          </div>
        )}
        
        {/* Action Buttons Overlay */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={onSave}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                isSaved
                  ? 'bg-sandstone text-white'
                  : 'bg-white text-gray-700 hover:bg-sandstone hover:text-white'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save destination'}
            >
              {isSaved ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={onVisit}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
                isVisited
                  ? 'bg-sandstone text-white'
                  : 'bg-white text-gray-700 hover:bg-sandstone hover:text-white'
              }`}
              title={isVisited ? 'Remove from visited' : 'Mark as visited'}
            >
              {isVisited ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-deep-forest mb-2">
              {destination.name}
            </h1>
            <p className="text-lg text-gray-600">
              {destination.country}
            </p>
          </div>
          
          {/* Trip Style Tags */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {destination.trip_style_tags.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-sandstone-light text-sandstone-dark rounded-full text-sm font-medium"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {destination.overview}
          </p>
        </div>

        {/* Interest Tags */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {destination.interest_tags.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationHero;






