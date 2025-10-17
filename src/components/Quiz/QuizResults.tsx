import React from 'react';
import { Link } from 'react-router-dom';
import { QuizResult } from '../../types';

interface QuizResultsProps {
  results: QuizResult[];
  onRetakeQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onRetakeQuiz }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-bold text-deep-forest mb-4">
          No Destinations Found
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn't find any destinations matching your preferences. Try adjusting your filters or retaking the quiz.
        </p>
        <button
          onClick={onRetakeQuiz}
          className="btn-primary px-8 py-3"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-deep-forest mb-4">
          Your Perfect Destinations
        </h2>
        <p className="text-gray-600">
          Based on your preferences, here are your top 3 destination matches
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result, index) => (
          <div key={result.destination.id} className="card hover:shadow-lg transition-shadow">
            {/* Destination Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              {result.destination.image_url ? (
                <img
                  src={result.destination.image_url}
                  alt={result.destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sandstone to-sandstone-light flex items-center justify-center">
                  <span className="text-4xl">🏛️</span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
                <span className="text-sm font-semibold text-deep-forest">
                  #{index + 1} Match
                </span>
              </div>
            </div>

            {/* Destination Info */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-deep-forest mb-1">
                  {result.destination.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {result.destination.country}
                </p>
              </div>

              <p className="text-gray-700 text-sm line-clamp-3">
                {result.destination.overview}
              </p>

              {/* Match Reason */}
              <div className="bg-sandstone-light rounded-lg p-3">
                <p className="text-sm text-deep-forest font-medium">
                  Why this matches you:
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {result.matchReason}
                </p>
              </div>

              {/* Travel Info */}
              <div className="flex flex-wrap gap-2 text-xs">
                {result.destination.budget_category && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {result.destination.budget_category} Budget
                  </span>
                )}
                {result.destination.sustainability && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {result.destination.sustainability} Sustainability
                  </span>
                )}
                {result.destination.best_season && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Best: {result.destination.best_season}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <Link
                to={`/destination/${result.destination.id}`}
                className="block w-full btn-primary text-center py-2 mt-4"
              >
                Explore Destination
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <button
          onClick={onRetakeQuiz}
          className="btn-outline px-8 py-3"
        >
          Retake Quiz
        </button>
        <Link
          to="/"
          className="btn-primary px-8 py-3 text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;

