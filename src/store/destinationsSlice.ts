import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DestinationsState, Destination, QuizResult, QuizAnswers } from '../types';

const initialState: DestinationsState = {
  currentDestinations: [],
  filters: {
    tripStyle: null,
    interests: [],
    budget: null,
    distance: null,
  },
  quizResults: [],
  quizAnswers: null,
  loading: false,
  error: null,
};

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {
    // Load destinations
    loadDestinationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadDestinationsSuccess: (state, action: PayloadAction<Destination[]>) => {
      state.loading = false;
      state.currentDestinations = action.payload;
      state.error = null;
    },
    loadDestinationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Set quiz answers
    setQuizAnswers: (state, action: PayloadAction<QuizAnswers>) => {
      state.quizAnswers = action.payload;
    },

    // Set quiz results
    setQuizResults: (state, action: PayloadAction<QuizResult[]>) => {
      state.quizResults = action.payload;
      state.currentDestinations = action.payload.map(result => result.destination);
    },

    // Clear quiz results
    clearQuizResults: (state) => {
      state.quizResults = [];
      state.quizAnswers = null;
      state.currentDestinations = [];
    },

    // Update filters
    updateFilters: (state, action: PayloadAction<Partial<typeof state.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        tripStyle: null,
        interests: [],
        budget: null,
        distance: null,
      };
    },

    // Add destination to current list (for search results)
    addDestination: (state, action: PayloadAction<Destination>) => {
      const exists = state.currentDestinations.some(dest => dest.id === action.payload.id);
      if (!exists) {
        state.currentDestinations.push(action.payload);
      }
    },

    // Remove destination from current list
    removeDestination: (state, action: PayloadAction<string>) => {
      state.currentDestinations = state.currentDestinations.filter(
        dest => dest.id !== action.payload
      );
    },

    // Clear current destinations
    clearCurrentDestinations: (state) => {
      state.currentDestinations = [];
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadDestinationsStart,
  loadDestinationsSuccess,
  loadDestinationsFailure,
  setQuizAnswers,
  setQuizResults,
  clearQuizResults,
  updateFilters,
  clearFilters,
  addDestination,
  removeDestination,
  clearCurrentDestinations,
  clearError,
} = destinationsSlice.actions;

export default destinationsSlice.reducer;




