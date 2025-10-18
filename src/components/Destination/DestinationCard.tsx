import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
  showMatchScore?: boolean;
  matchScore?: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  showMatchScore = false, 
  matchScore 
}) => {
  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSustainabilityColor = (sustainability: string) => {
    switch (sustainability) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Link
      to={`/destination/${destination.id}`}
      className="group block"
    >
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
        {/* Destination Image */}
        <div className="relative h-48 bg-gradient-to-br from-sandstone to-sandstone-light">
          {destination.image_url ? (
            <img
              src={destination.image_url}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🏛️</span>
            </div>
          )}
          
          {/* Match Score Badge */}
          {showMatchScore && matchScore !== undefined && (
            <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
              <span className="text-sm font-semibold text-deep-forest">
                {Math.round(matchScore)}% Match
              </span>
            </div>
          )}

          {/* Budget Badge */}
          {destination.budget_category && (
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(destination.budget_category)}`}>
                {destination.budget_category} Budget
              </span>
            </div>
          )}
        </div>

        {/* Destination Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-deep-forest transition-colors text-lg">
              {destination.name}
            </h3>
            <span className="text-sm text-gray-500 ml-2">
              {destination.country}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {destination.overview}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {destination.trip_style_tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-sandstone text-deep-forest text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {destination.trip_style_tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{destination.trip_style_tags.length - 3} more
              </span>
            )}
          </div>

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {/* Sustainability */}
              <div className="flex items-center space-x-1">
                <span className="text-green-500">🌱</span>
                <span className={`px-2 py-1 rounded-full ${getSustainabilityColor(destination.sustainability)}`}>
                  {destination.sustainability}
                </span>
              </div>

              {/* Distance */}
              {destination.distance_km && (
                <span>
                  {destination.distance_km.toLocaleString()} km
                </span>
              )}
            </div>

            {/* Best Season */}
            {destination.best_season && (
              <span className="text-xs">
                {destination.best_season}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
