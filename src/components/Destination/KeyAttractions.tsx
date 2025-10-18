import React from 'react';
import { Destination } from '../../types';

interface KeyAttractionsProps {
  destination: Destination;
  onAddExperience: () => void;
  isLoggedIn: boolean;
}

const KeyAttractions: React.FC<KeyAttractionsProps> = ({
  destination,
  onAddExperience,
  isLoggedIn
}) => {
  const attractions = destination.key_attractions || [];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-deep-forest">
          Key Attractions
        </h2>
        {isLoggedIn && (
          <button
            onClick={onAddExperience}
            className="btn-outline text-sm px-4 py-2"
          >
            Add Experience
          </button>
        )}
      </div>

      {attractions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏛️</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No attractions added yet
          </h3>
          <p className="text-gray-500 mb-4">
            Be the first to share an attraction or experience at this destination.
          </p>
          {isLoggedIn ? (
            <button
              onClick={onAddExperience}
              className="btn-primary"
            >
              Add First Attraction
            </button>
          ) : (
            <p className="text-sm text-gray-400">
              Sign in to add attractions
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {attractions.slice(0, 5).map((attraction, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                {attraction.image_url ? (
                  <img
                    src={attraction.image_url}
                    alt={attraction.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-sandstone-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-deep-forest mb-2">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {attractions.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Showing 5 of {attractions.length} attractions
          </p>
        </div>
      )}
    </div>
  );
};

export default KeyAttractions;




