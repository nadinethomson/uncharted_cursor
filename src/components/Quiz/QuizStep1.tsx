import React from 'react';
import { TRIP_STYLES } from '../../utils/constants';

interface QuizStep1Props {
  selectedTripStyle: string | undefined;
  onTripStyleChange: (tripStyle: string) => void;
  onNext: () => void;
}

const QuizStep1: React.FC<QuizStep1Props> = ({
  selectedTripStyle,
  onTripStyleChange,
  onNext
}) => {
  const handleNext = () => {
    if (selectedTripStyle) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-deep-forest mb-2">
          What kind of experience are you looking for?
        </h2>
        <p className="text-gray-600">
          Choose the travel style that best matches your ideal trip
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TRIP_STYLES.map((style) => (
          <button
            key={style.value}
            onClick={() => onTripStyleChange(style.value)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
              selectedTripStyle === style.value
                ? 'border-sandstone bg-sandstone-light shadow-lg'
                : 'border-gray-200 bg-white hover:border-sandstone'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sandstone to-sandstone-light flex items-center justify-center">
                <span className="text-2xl">
                  {style.value === 'Adventure' && '⛰️'}
                  {style.value === 'Cultural' && '🏛️'}
                  {style.value === 'Relaxed' && '🏖️'}
                  {style.value === 'Nature' && '🌿'}
                  {style.value === 'Food' && '🍽️'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-deep-forest">
                {style.label}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {style.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={handleNext}
          disabled={!selectedTripStyle}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedTripStyle
              ? 'bg-sandstone text-white hover:bg-sandstone-dark shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuizStep1;

