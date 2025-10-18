import { useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { createPost, updatePost, deletePost, fetchPostsByDestination } from '../services/postService';
import { Post, CreatePostData } from '../types';
import { getErrorMessage, ERROR_MESSAGES } from '../utils/constants';

/**
 * Custom hook for post management
 * Handles post creation, editing, deletion, and fetching
 */
export function usePosts() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewPost = useCallback(async (postData: CreatePostData): Promise<Post | null> => {
    if (!user) {
      setError(ERROR_MESSAGES.NOT_LOGGED_IN);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const post = await createPost(postData);
      return post;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const editPost = useCallback(async (
    postId: string, 
    updateData: {
      content: string;
      type?: 'tip' | 'review' | 'experience';
      imageFile?: File;
    }
  ): Promise<Post | null> => {
    if (!user) {
      setError(ERROR_MESSAGES.NOT_LOGGED_IN);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedPost = await updatePost(postId, user.id, updateData);
      return updatedPost;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const removePost = useCallback(async (postId: string): Promise<boolean> => {
    if (!user) {
      setError(ERROR_MESSAGES.NOT_LOGGED_IN);
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const success = await deletePost(postId, user.id);
      return success;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchPosts = useCallback(async (destinationId: string): Promise<Post[]> => {
    setLoading(true);
    setError(null);

    try {
      const posts = await fetchPostsByDestination(destinationId);
      return posts;
    } catch (err: any) {
      setError(getErrorMessage(err));
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    
    // Actions
    createNewPost,
    editPost,
    removePost,
    fetchPosts,
    
    // Utilities
    clearError: () => setError(null)
  };
}