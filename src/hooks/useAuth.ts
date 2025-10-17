import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  restoreSession,
  clearError,
} from '../store/authSlice';
import { setUserProfile, clearUserData } from '../store/userSlice';
import { clearAllNotifications } from '../store/notificationsSlice';
import { clearPosts } from '../store/postsSlice';
import { clearQuizResults } from '../store/destinationsSlice';
import { signinUser, signupUser, signoutUser, getCurrentUser } from '../services/authService';
import { SignupForm, LoginForm } from '../types';

/**
 * Custom hook for authentication
 * Provides clean interface between components and auth state
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);

  const login = useCallback(async (loginData: LoginForm) => {
    dispatch(loginStart());
    
    const result = await signinUser(loginData);
    
    if (result.success && result.data) {
      dispatch(loginSuccess({
        user: result.data.user,
        token: result.data.token
      }));
      dispatch(setUserProfile(result.data.user));
    } else {
      dispatch(loginFailure(result.error || 'Login failed'));
    }
    
    return result;
  }, [dispatch]);

  const signup = useCallback(async (signupData: SignupForm) => {
    dispatch(signupStart());
    
    const result = await signupUser(signupData);
    
    if (result.success && result.data) {
      dispatch(signupSuccess({
        user: result.data.user,
        token: result.data.token
      }));
      dispatch(setUserProfile(result.data.user));
    } else {
      dispatch(signupFailure(result.error || 'Signup failed'));
    }
    
    return result;
  }, [dispatch]);

  const signout = useCallback(async () => {
    const result = await signoutUser();
    
    if (result.success) {
      // Clear all user-related state
      dispatch(logout());
      dispatch(clearUserData());
      dispatch(clearAllNotifications());
      dispatch(clearPosts());
      dispatch(clearQuizResults());
    }
    
    return result;
  }, [dispatch]);

  const restoreUserSession = useCallback(async () => {
    const result = await getCurrentUser();
    
    if (result.success && result.data) {
      dispatch(restoreSession({
        user: result.data.user,
        token: result.data.token
      }));
      dispatch(setUserProfile(result.data.user));
    }
    
    return result;
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    user: authState.user,
    isLoggedIn: authState.isLoggedIn,
    token: authState.token,
    loading: authState.loading,
    error: authState.error,
    
    // Actions
    login,
    signup,
    signout,
    restoreUserSession,
    clearAuthError,
  };
}


