import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuizResults, setQuizAnswers, clearQuizResults } from '../store/destinationsSlice';
import { runQuizMatching } from '../services/destinationService';
import { QuizAnswers } from '../types';
import { ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for quiz functionality
 * Provides clean interface for quiz operations
 */
export function useQuiz() {
  const dispatch = useAppDispatch();
  const { quizResults, quizAnswers, loading, error } = useAppSelector(state => state.destinations);

  const submitQuiz = useCallback(async (answers: QuizAnswers) => {
    try {
      // Store quiz answers in Redux
      dispatch(setQuizAnswers(answers));

      // Run quiz matching
      const results = await runQuizMatching(answers);
      
      // Store results in Redux
      dispatch(setQuizResults(results));

      return { success: true, results };
    } catch (error) {
      console.error('Quiz submission error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR 
      };
    }
  }, [dispatch]);

  const retakeQuiz = useCallback(() => {
    dispatch(clearQuizResults());
  }, [dispatch]);

  const hasQuizResults = quizResults.length > 0;
  const hasQuizAnswers = quizAnswers !== null;

  return {
    // State
    quizResults,
    quizAnswers,
    loading,
    error,
    hasQuizResults,
    hasQuizAnswers,
    
    // Actions
    submitQuiz,
    retakeQuiz,
  };
}

