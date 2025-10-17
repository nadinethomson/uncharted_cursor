import React from 'react';
import { BUDGET_OPTIONS } from '../../utils/constants';

interface QuizStep3Props {
  selectedBudget: string | null;
  onBudgetChange: (budget: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuizStep3: React.FC<QuizStep3Props> = ({
  selectedBudget,
  onBudgetChange,
  onNext,
  onPrevious
}) => {
  const handleNext = () => {
    if (selectedBudget) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-deep-forest mb-2">
          What's your budget range?
        </h2>
        <p className="text-gray-600">
          Choose the budget category that best fits your travel plans
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {BUDGET_OPTIONS.map((budget) => (
          <button
            key={budget.value}
            onClick={() => onBudgetChange(budget.value)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-center hover:shadow-lg ${
              selectedBudget === budget.value
                ? 'border-sandstone bg-sandstone-light shadow-lg'
                : 'border-gray-200 bg-white hover:border-sandstone'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                selectedBudget === budget.value
                  ? 'bg-gradient-to-br from-sandstone to-sandstone-light'
                  : 'bg-gray-100'
              }`}>
                <span className="text-3xl">{budget.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-deep-forest mb-1">
                  {budget.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {budget.description}
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
          disabled={!selectedBudget}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedBudget
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

export default QuizStep3;

