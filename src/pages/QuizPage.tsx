import React from 'react';
import QuizFlow from '../components/Quiz/QuizFlow';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <QuizFlow />
      </div>
    </div>
  );
};

export default QuizPage;




