import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadDestinationsStart,
  loadDestinationsSuccess,
  loadDestinationsFailure,
  setQuizResults,
  clearQuizResults,
  updateFilters,
  clearFilters,
} from '../store/destinationsSlice';
import {
  getAllDestinations,
  getDestinationById,
  runQuizMatching,
  searchDestinations,
  getRandomDestinations,
} from '../services/destinationService';
import { QuizAnswers } from '../types';

/**
 * Custom hook for destination management
 * Provides clean interface for destination operations
 */
export function useDestinations() {
  const dispatch = useAppDispatch();
  const destinationsState = useAppSelector(state => state.destinations);

  const loadDestinations = useCallback(async () => {
    dispatch(loadDestinationsStart());
    
    try {
      const result = await getAllDestinations();
      dispatch(loadDestinationsSuccess(result));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load destinations';
      dispatch(loadDestinationsFailure(errorMessage));
      throw error;
    }
  }, [dispatch]);

  const getDestination = useCallback(async (destinationId: string) => {
    return await getDestinationById(destinationId);
  }, []);

  const runQuiz = useCallback(async (quizAnswers: QuizAnswers) => {
    const result = await runQuizMatching(quizAnswers);
    
    if (result && result.length > 0) {
      dispatch(setQuizResults(result));
    }
    
    return result;
  }, [dispatch]);

  const clearQuiz = useCallback(() => {
    dispatch(clearQuizResults());
  }, [dispatch]);

  const search = useCallback(async (query: string) => {
    return await searchDestinations({ searchQuery: query });
  }, []);

  const getFeatured = useCallback(async (limit: number = 6) => {
    return await getRandomDestinations(limit);
  }, []);

  const updateFilter = useCallback((filters: Partial<typeof destinationsState.filters>) => {
    dispatch(updateFilters(filters));
  }, [dispatch, destinationsState.filters]);

  const clearFilter = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    // State
    destinations: destinationsState.currentDestinations,
    quizResults: destinationsState.quizResults,
    filters: destinationsState.filters,
    loading: destinationsState.loading,
    error: destinationsState.error,
    
    // Actions
    loadDestinations,
    getDestination,
    runQuiz,
    clearQuiz,
    search,
    getFeatured,
    updateFilter,
    clearFilter,
  };
}



