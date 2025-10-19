import React, { useState } from 'react';
import { AskALocal } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useAskLocal } from '../../hooks/useAskLocal';

interface QuestionListProps {
  questions: AskALocal[];
  onQuestionUpdated: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onQuestionUpdated
}) => {
  const { user } = useAuth();
  const { answerQuestion, markHelpful, closeQuestion, loading } = useAskLocal();
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');

  const handleAnswerSubmit = async (questionId: string) => {
    if (!answerText.trim()) return;

    const result = await answerQuestion(questionId, answerText.trim());
    if (result) {
      setAnswerText('');
      setAnsweringQuestion(null);
      onQuestionUpdated();
    }
  };

  const handleMarkHelpful = async (questionId: string, isHelpful: boolean) => {
    const success = await markHelpful(questionId, isHelpful);
    if (success) {
      onQuestionUpdated();
    }
  };

  const handleCloseQuestion = async (questionId: string) => {
    const success = await closeQuestion(questionId);
    if (success) {
      onQuestionUpdated();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (questions.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl mb-4">🤔</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Questions Yet</h3>
        <p className="text-gray-600">
          Be the first to ask a question about this destination!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                  {question.status}
                </span>
                <span className="text-sm text-gray-500">
                  by {question.user?.username || 'Unknown'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(question.created_at)}
                </span>
              </div>
              
              <p className="text-gray-900 font-medium mb-3">
                {question.question}
              </p>
            </div>

            {/* Question owner actions */}
            {user && question.user_id === user.id && question.status === 'pending' && (
              <button
                onClick={() => handleCloseQuestion(question.id)}
                className="text-sm text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                Close
              </button>
            )}
          </div>

          {/* Answer section */}
          {question.answer ? (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Answer by {question.answered_by_user?.username || 'Local'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(question.updated_at)}
                </span>
              </div>
              <p className="text-gray-900">{question.answer}</p>
              
              {/* Helpful feedback */}
              {user && question.user_id === user.id && question.is_helpful === null && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Was this answer helpful?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkHelpful(question.id, true)}
                      className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200"
                      disabled={loading}
                    >
                      👍 Yes
                    </button>
                    <button
                      onClick={() => handleMarkHelpful(question.id, false)}
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full hover:bg-red-200"
                      disabled={loading}
                    >
                      👎 No
                    </button>
                  </div>
                </div>
              )}

              {/* Show helpful feedback result */}
              {question.is_helpful !== null && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    {question.is_helpful ? '👍 Marked as helpful' : '👎 Marked as not helpful'}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Answer form for other users */
            user && question.user_id !== user.id && question.status === 'pending' && (
              <div className="bg-blue-50 rounded-lg p-4">
                {answeringQuestion === question.id ? (
                  <div className="space-y-3">
                    <label htmlFor={`answer-${question.id}`} className="block text-sm font-medium text-gray-700">
                      Your Answer
                    </label>
                    <textarea
                      id={`answer-${question.id}`}
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Share your local knowledge..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
                      rows={3}
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {answerText.length}/1000 characters
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setAnsweringQuestion(null);
                            setAnswerText('');
                          }}
                          className="text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAnswerSubmit(question.id)}
                          disabled={loading || !answerText.trim()}
                          className="btn-primary text-sm disabled:opacity-50"
                        >
                          {loading ? 'Answering...' : 'Submit Answer'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAnsweringQuestion(question.id)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    💬 Answer this question
                  </button>
                )}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;





