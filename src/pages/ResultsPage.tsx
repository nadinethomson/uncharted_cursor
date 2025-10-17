import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useQuiz } from '../hooks/useQuiz';
import QuizResults from '../components/Quiz/QuizResults';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { retakeQuiz } = useQuiz();
  const { quizResults } = useAppSelector(state => state.destinations);

  const handleRetakeQuiz = () => {
    retakeQuiz();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <QuizResults 
            results={quizResults} 
            onRetakeQuiz={handleRetakeQuiz}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;




