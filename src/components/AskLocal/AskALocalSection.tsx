import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAskLocal } from '../../hooks/useAskLocal';
import { AskALocal } from '../../types';
import AskQuestionForm from './AskQuestionForm';
import QuestionList from './QuestionList';

const AskALocalSection: React.FC = () => {
  const { id: destinationId } = useParams<{ id: string }>();
  const { fetchQuestions, loading, error } = useAskLocal();
  const [questions, setQuestions] = useState<AskALocal[]>([]);
  const [destinationName, setDestinationName] = useState('this destination');

  useEffect(() => {
    if (destinationId) {
      loadQuestions();
    }
  }, [destinationId]);

  const loadQuestions = async () => {
    if (!destinationId) return;
    
    const fetchedQuestions = await fetchQuestions(destinationId);
    setQuestions(fetchedQuestions);
    
    // Set destination name from first question if available
    if (fetchedQuestions.length > 0 && fetchedQuestions[0].destination) {
      setDestinationName(fetchedQuestions[0].destination.name);
    }
  };

  const handleQuestionSubmitted = () => {
    loadQuestions();
  };

  const handleQuestionUpdated = () => {
    loadQuestions();
  };

  if (!destinationId) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Invalid Destination</h3>
        <p className="text-gray-600">
          Please select a valid destination to view Ask a Local questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="heading-responsive mb-2">Ask a Local</h2>
        <p className="text-gray-600">
          Get insider tips and local knowledge from the community
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <span className="block">{error}</span>
        </div>
      )}

      {/* Ask Question Form */}
      <AskQuestionForm
        destinationId={destinationId}
        destinationName={destinationName}
        onQuestionSubmitted={handleQuestionSubmitted}
      />

      {/* Questions List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-deep-forest">
            Community Questions ({questions.length})
          </h3>
          {loading && (
            <div className="text-sm text-gray-500">Loading...</div>
          )}
        </div>

        <QuestionList
          questions={questions}
          onQuestionUpdated={handleQuestionUpdated}
        />
      </div>
    </div>
  );
};

export default AskALocalSection;




