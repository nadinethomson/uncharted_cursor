import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizAnswers } from '../../types';
import { ERROR_MESSAGES } from '../../utils/constants';

// Import quiz steps
import QuizStep1 from './QuizStep1';
import QuizStep2 from './QuizStep2';
import QuizStep3 from './QuizStep3';
import QuizStep4 from './QuizStep4';

const QuizFlow: React.FC = () => {
  const navigate = useNavigate();
  const { submitQuiz } = useQuiz();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Quiz answers state
  const [quizAnswers, setQuizAnswersState] = useState<Partial<QuizAnswers>>({
    tripStyle: undefined,
    interests: [],
    budget: undefined,
    distance: undefined
  });

  const handleTripStyleChange = (tripStyle: string) => {
    setQuizAnswersState(prev => ({ ...prev, tripStyle }));
    setError(null);
  };

  const handleInterestsChange = (interests: string[]) => {
    setQuizAnswersState(prev => ({ ...prev, interests }));
    setError(null);
  };

  const handleBudgetChange = (budget: string) => {
    setQuizAnswersState(prev => ({ ...prev, budget }));
    setError(null);
  };

  const handleDistanceChange = (distance: string) => {
    setQuizAnswersState(prev => ({ ...prev, distance }));
    setError(null);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final step - run quiz matching
      handleQuizSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleQuizSubmit = async () => {
    // Validate all answers are complete
    if (quizAnswers.tripStyle === undefined || 
        !quizAnswers.interests || 
        quizAnswers.interests.length === 0 || 
        quizAnswers.budget === undefined || 
        quizAnswers.distance === undefined) {
      setError(ERROR_MESSAGES.QUIZ_INCOMPLETE);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const completeAnswers: QuizAnswers = {
        tripStyle: quizAnswers.tripStyle!,
        interests: quizAnswers.interests!,
        budget: quizAnswers.budget!,
        distance: quizAnswers.distance!
      };

      // Submit quiz using hook
      const result = await submitQuiz(completeAnswers);

      if (result.success) {
        // Navigate to results page
        navigate('/results');
      } else {
        setError(result.error || ERROR_MESSAGES.NETWORK_ERROR);
      }

    } catch (error) {
      console.error('Quiz matching error:', error);
      setError(ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuizStep1
            selectedTripStyle={quizAnswers.tripStyle}
            onTripStyleChange={handleTripStyleChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <QuizStep2
            selectedInterests={quizAnswers.interests || []}
            onInterestsChange={handleInterestsChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <QuizStep3
            selectedBudget={quizAnswers.budget}
            onBudgetChange={handleBudgetChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <QuizStep4
            selectedDistance={quizAnswers.distance}
            onDistanceChange={handleDistanceChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-deep-forest">
            Find Your Perfect Destination
          </h1>
          <span className="text-sm text-gray-500">
            Step {currentStep} of 4
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-sandstone to-sandstone-light h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-center">{error}</p>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sandstone mx-auto mb-4"></div>
            <p className="text-gray-700">Finding your perfect destinations...</p>
          </div>
        </div>
      )}

      {/* Current step content */}
      <div className="card">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default QuizFlow;
