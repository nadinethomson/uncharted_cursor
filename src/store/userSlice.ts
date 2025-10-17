import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User, Destination, ReputationTier } from '../types';

const initialState: UserState = {
  profile: null,
  credits: 0,
  reputation: 0,
  reputationTier: 'New Traveller',
  savedDestinations: [],
  visitedDestinations: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user profile (from auth)
    setUserProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.credits = action.payload.credits;
      state.reputation = action.payload.reputation;
      state.error = null;
    },

    // Load user profile
    loadProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadProfileSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.profile = action.payload;
      state.credits = action.payload.credits;
      state.reputation = action.payload.reputation;
      state.error = null;
    },
    loadProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update credits (atomic operation)
    updateCredits: (state, action: PayloadAction<{ amount: number; newTotal: number }>) => {
      state.credits = action.payload.newTotal;
      if (state.profile) {
        state.profile.credits = action.payload.newTotal;
      }
    },

    // Update reputation
    updateReputation: (state, action: PayloadAction<{ reputation: number; tier: ReputationTier }>) => {
      state.reputation = action.payload.reputation;
      state.reputationTier = action.payload.tier;
      if (state.profile) {
        state.profile.reputation = action.payload.reputation;
      }
    },

    // Load saved destinations
    loadSavedDestinationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadSavedDestinationsSuccess: (state, action: PayloadAction<Destination[]>) => {
      state.loading = false;
      state.savedDestinations = action.payload;
      state.error = null;
    },
    loadSavedDestinationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Load visited destinations
    loadVisitedDestinationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadVisitedDestinationsSuccess: (state, action: PayloadAction<Destination[]>) => {
      state.loading = false;
      state.visitedDestinations = action.payload;
      state.error = null;
    },
    loadVisitedDestinationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add saved destination
    addSavedDestination: (state, action: PayloadAction<Destination>) => {
      const exists = state.savedDestinations.some(dest => dest.id === action.payload.id);
      if (!exists) {
        state.savedDestinations.push(action.payload);
      }
    },

    // Remove saved destination
    removeSavedDestination: (state, action: PayloadAction<string>) => {
      state.savedDestinations = state.savedDestinations.filter(
        dest => dest.id !== action.payload
      );
    },

    // Add visited destination
    addVisitedDestination: (state, action: PayloadAction<Destination>) => {
      const exists = state.visitedDestinations.some(dest => dest.id === action.payload.id);
      if (!exists) {
        state.visitedDestinations.push(action.payload);
      }
    },

    // Remove visited destination
    removeVisitedDestination: (state, action: PayloadAction<string>) => {
      state.visitedDestinations = state.visitedDestinations.filter(
        dest => dest.id !== action.payload
      );
    },

    // Clear user data (on logout)
    clearUserData: (state) => {
      state.profile = null;
      state.credits = 0;
      state.reputation = 0;
      state.reputationTier = 'New Traveller';
      state.savedDestinations = [];
      state.visitedDestinations = [];
      state.loading = false;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUserProfile,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  updateCredits,
  updateReputation,
  loadSavedDestinationsStart,
  loadSavedDestinationsSuccess,
  loadSavedDestinationsFailure,
  loadVisitedDestinationsStart,
  loadVisitedDestinationsSuccess,
  loadVisitedDestinationsFailure,
  addSavedDestination,
  removeSavedDestination,
  addVisitedDestination,
  removeVisitedDestination,
  clearUserData,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;


