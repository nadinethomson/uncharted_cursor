import React from 'react';
import { INTERESTS } from '../../utils/constants';

interface QuizStep2Props {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuizStep2: React.FC<QuizStep2Props> = ({
  selectedInterests,
  onInterestsChange,
  onNext,
  onPrevious
}) => {
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-deep-forest mb-2">
          What interests you most?
        </h2>
        <p className="text-gray-600">
          Select all that apply (minimum 1 required)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest.value}
            onClick={() => handleInterestToggle(interest.value)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
              selectedInterests.includes(interest.value)
                ? 'border-sandstone bg-sandstone-light shadow-lg'
                : 'border-gray-200 bg-white hover:border-sandstone'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                selectedInterests.includes(interest.value)
                  ? 'bg-gradient-to-br from-sandstone to-sandstone-light'
                  : 'bg-gray-100'
              }`}>
                <span className="text-2xl">{interest.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-deep-forest">
                {interest.label}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {selectedInterests.length === 0 && (
        <div className="text-center">
          <p className="text-amber-600 text-sm">
            Please select at least one interest to continue
          </p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-3 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={selectedInterests.length === 0}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedInterests.length > 0
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

export default QuizStep2;

