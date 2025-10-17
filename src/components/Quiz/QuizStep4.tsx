import React from 'react';
import { DISTANCE_OPTIONS } from '../../utils/constants';

interface QuizStep4Props {
  selectedDistance: string | null;
  onDistanceChange: (distance: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuizStep4: React.FC<QuizStep4Props> = ({
  selectedDistance,
  onDistanceChange,
  onNext,
  onPrevious
}) => {
  const handleNext = () => {
    if (selectedDistance) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-deep-forest mb-2">
          How far are you willing to travel?
        </h2>
        <p className="text-gray-600">
          Choose your preferred travel distance from home
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DISTANCE_OPTIONS.map((distance) => (
          <button
            key={distance.value}
            onClick={() => onDistanceChange(distance.value)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-lg ${
              selectedDistance === distance.value
                ? 'border-sandstone bg-sandstone-light shadow-lg'
                : 'border-gray-200 bg-white hover:border-sandstone'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                selectedDistance === distance.value
                  ? 'bg-gradient-to-br from-sandstone to-sandstone-light'
                  : 'bg-gray-100'
              }`}>
                <span className="text-3xl">{distance.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-deep-forest mb-1">
                  {distance.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {distance.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDistance}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedDistance
              ? 'bg-sandstone text-white hover:bg-sandstone-dark shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Find My Destinations
        </button>
      </div>
    </div>
  );
};

export default QuizStep4;

