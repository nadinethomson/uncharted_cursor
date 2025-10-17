import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadDestinationPostsStart,
  loadDestinationPostsSuccess,
  loadDestinationPostsFailure,
  addPost,
  updatePost,
  removePost,
  clearPosts,
} from '../store/postsSlice';
import { createPostWithCredits, getDestinationPosts, getUserPosts, deletePost } from '../services/postService';
import { CreatePostData } from '../types';
import { useCredits } from './useCredits';

/**
 * Custom hook for post management
 * Provides clean interface for post operations with credit handling
 */
export function usePosts() {
  const dispatch = useAppDispatch();
  const postsState = useAppSelector(state => state.posts);
  const { earnCredits } = useCredits();

  const loadDestinationPosts = useCallback(async (destinationId: string) => {
    dispatch(loadDestinationPostsStart());
    
    try {
      const result = await getDestinationPosts(destinationId);
      dispatch(loadDestinationPostsSuccess(result));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load posts';
      dispatch(loadDestinationPostsFailure(errorMessage));
      throw error;
    }
  }, [dispatch]);

  const loadUserPosts = useCallback(async (userId: string) => {
    return await getUserPosts(userId);
  }, []);

  const createPost = useCallback(async (postData: CreatePostData) => {
    const result = await createPostWithCredits(postData);
    
    if (result) {
      // Add to Redux state
      dispatch(addPost(result));
      
      // Earn credits (this is handled atomically in the service)
      // But we can also update the UI optimistically
      await earnCredits(postData.type, 5, result.id);
    }
    
    return result;
  }, [dispatch, earnCredits]);

  const removePostById = useCallback(async (postId: string, userId: string) => {
    const result = await deletePost(postId, userId);
    
    if (result) {
      dispatch(removePost(postId));
    }
    
    return result;
  }, [dispatch]);

  const clearAllPosts = useCallback(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  return {
    // State
    posts: postsState.items,
    loading: postsState.loading,
    error: postsState.error,
    
    // Actions
    loadDestinationPosts,
    loadUserPosts,
    createPost,
    removePostById,
    clearAllPosts,
  };
}



