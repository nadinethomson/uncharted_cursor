import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, Post } from '../types';

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Load posts
    loadPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    loadPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Load posts for specific destination
    loadDestinationPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadDestinationPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    loadDestinationPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add new post
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.unshift(action.payload);
    },

    // Update post
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.items.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    // Remove post
    removePost: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },

    // Clear posts
    clearPosts: (state) => {
      state.items = [];
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadPostsStart,
  loadPostsSuccess,
  loadPostsFailure,
  loadDestinationPostsStart,
  loadDestinationPostsSuccess,
  loadDestinationPostsFailure,
  addPost,
  updatePost,
  removePost,
  clearPosts,
  clearError,
} = postsSlice.actions;

export default postsSlice.reducer;





