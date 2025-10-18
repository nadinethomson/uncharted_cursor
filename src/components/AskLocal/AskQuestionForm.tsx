import React, { useState } from 'react';
import { useAskLocal } from '../../hooks/useAskLocal';
import { useCredits } from '../../hooks/useCredits';

interface AskQuestionFormProps {
  destinationId: string;
  destinationName: string;
  onQuestionSubmitted: () => void;
}

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({
  destinationId,
  destinationName,
  onQuestionSubmitted
}) => {
  const { askQuestion, loading, error, canAskQuestion } = useAskLocal();
  const { credits } = useCredits();
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    const result = await askQuestion({
      destinationId,
      question: question.trim()
    });

    if (result) {
      setQuestion('');
      onQuestionSubmitted();
    }
  };

  const canAsk = canAskQuestion();

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-deep-forest mb-4" id="ask-local-heading">
        Ask a Local
      </h3>
      
      <p className="text-gray-600 mb-4">
        Have a question about {destinationName}? Ask the local community! 
        <span className="font-medium text-sandstone"> (5 credits)</span>
      </p>

      {!canAsk && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <span className="text-amber-600 mr-2">⚠️</span>
            <span>
              You need at least 5 credits to ask a question. You currently have {credits} credits.
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          <span className="block">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-labelledby="ask-local-heading">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Your Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know about this destination?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
            rows={4}
            maxLength={500}
            disabled={loading || !canAsk}
            required
            aria-describedby="question-help"
          />
          <div id="question-help" className="text-right text-sm text-gray-500 mt-1">
            {question.length}/500 characters
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div id="ask-cost" className="text-sm text-gray-600 order-2 sm:order-1">
            Cost: <span className="font-medium text-sandstone">5 credits</span>
          </div>
          
          <button
            type="submit"
            disabled={loading || !canAsk || !question.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 w-full sm:w-auto"
            aria-describedby="ask-cost"
          >
            {loading ? 'Asking...' : 'Ask Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestionForm;


