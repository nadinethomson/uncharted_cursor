import React, { useState, useEffect } from 'react';
import { AskALocal } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useAskLocal } from '../../hooks/useAskLocal';

interface AskALocalSectionProps {
  destinationId: string;
  destinationName: string;
}

const AskALocalSection: React.FC<AskALocalSectionProps> = ({
  destinationId,
  destinationName
}) => {
  const { user } = useAuth();
  const { 
    askQuestion, 
    answerQuestion, 
    fetchQuestions, 
    markHelpful, 
    closeQuestion,
    loading, 
    error, 
    canAskQuestion 
  } = useAskLocal();
  
  const [questions, setQuestions] = useState<AskALocal[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    loadQuestions();
  }, [destinationId]);

  const loadQuestions = async () => {
    const fetchedQuestions = await fetchQuestions(destinationId);
    setQuestions(fetchedQuestions);
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const result = await askQuestion({
      destinationId,
      question: questionText.trim()
    });

    if (result) {
      setQuestionText('');
      setShowQuestionForm(false);
      loadQuestions();
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    const result = await answerQuestion(questionId, answerText.trim());
    if (result) {
      setAnswerText('');
      setShowAnswerForm(null);
      loadQuestions();
    }
  };

  const handleMarkHelpful = async (questionId: string, isHelpful: boolean) => {
    const success = await markHelpful(questionId, isHelpful);
    if (success) {
      loadQuestions();
    }
  };

  const handleCloseQuestion = async (questionId: string) => {
    const success = await closeQuestion(questionId);
    if (success) {
      loadQuestions();
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

  const canAnswer = (question: AskALocal) => {
    if (!user) return false;
    if (question.user_id === user.id) return false; // Can't answer own question
    if (question.status !== 'pending') return false;
    return user.reputation >= 51; // Local tier or above
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-deep-forest">
          Ask a Local
        </h2>
        {user && canAskQuestion() && (
          <button
            onClick={() => setShowQuestionForm(true)}
            className="btn-outline text-sm px-4 py-2"
          >
            Ask a Question
          </button>
        )}
      </div>

      {/* Question Form */}
      {showQuestionForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">
            Ask a question about {destinationName}
          </h3>
          <form onSubmit={handleSubmitQuestion}>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="What would you like to know about this destination?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
              rows={3}
              maxLength={300}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-500">
                {questionText.length}/300 characters
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuestionForm(false);
                    setQuestionText('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !questionText.trim()}
                  className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Posting...' : 'Post Question (5 credits)'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">❓</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No questions yet
          </h3>
          <p className="text-gray-500 mb-4">
            Be the first to ask a local about this destination.
          </p>
          {user && canAskQuestion() ? (
            <button
              onClick={() => setShowQuestionForm(true)}
              className="btn-primary"
            >
              Ask First Question
            </button>
          ) : user ? (
            <p className="text-sm text-gray-400">
              You need at least 5 credits to ask questions
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Sign in to ask questions
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              {/* Question */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">
                      {question.user?.username || 'Anonymous'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      question.status === 'answered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {question.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(question.created_at)}
                    </span>
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
                <p className="text-gray-700">{question.question}</p>
              </div>

              {/* Answer */}
              {question.answer && (
                <div className="ml-4 pl-4 border-l-2 border-sandstone">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {question.answered_by_user?.username || 'Local'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(question.updated_at)}
                    </span>
                  </div>
                  <p className="text-gray-700">{question.answer}</p>
                  
                  {/* Helpful Rating */}
                  {question.is_helpful !== null ? (
                    <div className="mt-2">
                      <span className={`text-sm ${
                        question.is_helpful ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {question.is_helpful ? '👍 Helpful' : '👎 Not helpful'}
                      </span>
                    </div>
                  ) : user && question.user_id === user.id && question.answer && (
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
                </div>
              )}

              {/* Answer Form */}
              {showAnswerForm === question.id && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <form onSubmit={(e) => handleSubmitAnswer(e, question.id)}>
                    <textarea
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Share your local knowledge..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sandstone focus:border-transparent resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">
                        {answerText.length}/500 characters
                      </span>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAnswerForm(null);
                            setAnswerText('');
                          }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading || !answerText.trim()}
                          className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Posting...' : 'Post Answer'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Answer Button */}
              {canAnswer(question) && !showAnswerForm && (
                <div className="mt-3">
                  <button
                    onClick={() => setShowAnswerForm(question.id)}
                    className="btn-outline text-sm px-3 py-1"
                  >
                    Answer Question
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AskALocalSection;
