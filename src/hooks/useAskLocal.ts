import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { useCredits } from './useCredits';
import { useAppDispatch } from '../store/hooks';
import { updateCredits, updateReputation } from '../store/userSlice';
import { 
  createAskLocalQuestion, 
  answerAskLocalQuestion, 
  getAskALocalQuestions,
  markQuestionHelpful,
  closeAskLocalQuestion 
} from '../services/askLocalService';
import { AskALocal, CreateAskLocalData } from '../types';
import { getErrorMessage, ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for Ask a Local functionality
 * Handles question creation, answering, and management
 */
export function useAskLocal() {
  const { user } = useAuth();
  const { canPerformAction } = useCredits();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAskQuestion = useCallback(() => {
    return canPerformAction('ask_local');
  }, [canPerformAction]);

  const askQuestion = useCallback(async (questionData: CreateAskLocalData): Promise<AskALocal | null> => {
    if (!user) {
      setError('You must be logged in to ask a question');
      return null;
    }

    if (!canAskQuestion()) {
      setError('Insufficient credits to ask a question (5 credits required)');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createAskLocalQuestion(user.id, questionData);
      
      // Update Redux state with the new credit amount
      if (result.creditResult) {
        dispatch(updateCredits({
          amount: result.creditResult.creditChange,
          newTotal: result.creditResult.newCredits
        }));

        dispatch(updateReputation({
          reputation: result.creditResult.newReputation,
          tier: result.creditResult.newTier
        }));
      }
      
      return result.question;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, canAskQuestion, dispatch]);

  const answerQuestion = useCallback(async (questionId: string, answer: string): Promise<AskALocal | null> => {
    if (!user) {
      setError(ERROR_MESSAGES.NOT_LOGGED_IN);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedQuestion = await answerAskLocalQuestion(questionId, answer, user.id);
      return updatedQuestion;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchQuestions = useCallback(async (destinationId: string): Promise<AskALocal[]> => {
    setLoading(true);
    setError(null);

    try {
      const questions = await getAskALocalQuestions(destinationId);
      return questions;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const markHelpful = useCallback(async (questionId: string, isHelpful: boolean): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const success = await markQuestionHelpful(questionId, isHelpful);
      return success;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const closeQuestion = useCallback(async (questionId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const success = await closeAskLocalQuestion(questionId);
      return success;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    
    // Actions
    canAskQuestion,
    askQuestion,
    answerQuestion,
    fetchQuestions,
    markHelpful,
    closeQuestion,
    
    // Utilities
    clearError: () => setError(null)
  };
}
