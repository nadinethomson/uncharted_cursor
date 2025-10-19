import React from 'react';
import { Destination } from '../../types';

interface TravelInfoProps {
  destination: Destination;
}

const TravelInfo: React.FC<TravelInfoProps> = ({ destination }) => {
  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'High': return 'text-purple-600 bg-purple-100';
      case 'Medium': return 'text-blue-600 bg-blue-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-deep-forest mb-6">
        Travel Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Distance */}
        {destination.distance_km && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">✈️</div>
            <h3 className="font-semibold text-gray-700 mb-1">Distance</h3>
            <p className="text-2xl font-bold text-deep-forest">
              {destination.distance_km.toLocaleString()} km
            </p>
          </div>
        )}

        {/* Budget */}
        {destination.budget_category && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-700 mb-1">Budget</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBudgetColor(destination.budget_category)}`}>
              {destination.budget_category}
            </span>
          </div>
        )}

        {/* Best Season */}
        {destination.best_season && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">🌤️</div>
            <h3 className="font-semibold text-gray-700 mb-1">Best Season</h3>
            <p className="text-sm text-gray-600">
              {destination.best_season}
            </p>
          </div>
        )}

        {/* Sustainability */}
        {destination.sustainability && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">🌱</div>
            <h3 className="font-semibold text-gray-700 mb-1">Sustainability</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSustainabilityColor(destination.sustainability)}`}>
              {destination.sustainability}
            </span>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Trip Styles */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Trip Styles</h3>
            <div className="flex flex-wrap gap-2">
              {destination.trip_style_tags.map((style) => (
                <span
                  key={style}
                  className="px-2 py-1 bg-sandstone-light text-sandstone-dark rounded text-sm"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {destination.interest_tags.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelInfo;





