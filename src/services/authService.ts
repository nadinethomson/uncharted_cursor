import { supabase } from './supabase';
import { ApiResponse, User, SignupForm, LoginForm } from '../types';

/**
 * Service for handling authentication with Supabase Auth
 * This service manages user authentication and profile creation
 */

/**
 * Sign up a new user with profile creation
 */
export async function signupUser(signupData: SignupForm): Promise<ApiResponse<{ user: User; token: string }>> {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || 'Failed to create account',
        data: null
      };
    }

    // Create user profile
    const { data: user, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        username: signupData.username,
        email: signupData.email,
        country: signupData.country,
        interests: signupData.interests,
        credits: 10, // Starting credits
        reputation: 0
      })
      .select()
      .single();

    if (profileError) {
      // If profile creation fails, we should ideally clean up the auth user
      // But Supabase doesn't provide a direct way to delete auth users
      console.error('Profile creation failed:', profileError);
      return {
        success: false,
        error: 'Failed to create user profile',
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: {
        user,
        token: authData.session?.access_token || ''
      }
    };

  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: 'Failed to create account',
      data: null
    };
  }
}

/**
 * Sign in an existing user
 */
export async function signinUser(loginData: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (authError || !authData.user) {
      return {
        success: false,
        error: authError?.message || 'Invalid credentials',
        data: null
      };
    }

    // Get user profile
    const { data: user, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !user) {
      return {
        success: false,
        error: 'User profile not found',
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: {
        user,
        token: authData.session?.access_token || ''
      }
    };

  } catch (error) {
    console.error('Signin error:', error);
    return {
      success: false,
      error: 'Failed to sign in',
      data: null
    };
  }
}

/**
 * Sign out the current user
 */
export async function signoutUser(): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: true
    };

  } catch (error) {
    console.error('Signout error:', error);
    return {
      success: false,
      error: 'Failed to sign out',
      data: null
    };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser(): Promise<ApiResponse<{ user: User; token: string }>> {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return {
        success: false,
        error: 'No active session',
        data: null
      };
    }

    // Get user profile
    const { data: user, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError || !user) {
      return {
        success: false,
        error: 'User profile not found',
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: {
        user,
        token: session.access_token
      }
    };

  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      error: 'Failed to get current user',
      data: null
    };
  }
}

/**
 * Reset password
 */
export async function resetPassword(email: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: true
    };

  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      error: 'Failed to send reset email',
      data: null
    };
  }
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return {
        success: false,
        error: error.message,
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: true
    };

  } catch (error) {
    console.error('Update password error:', error);
    return {
      success: false,
      error: 'Failed to update password',
      data: null
    };
  }
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows found, username is available
      return {
        success: true,
        error: null,
        data: true
      };
    }

    if (error) {
      return {
        success: false,
        error: 'Failed to check username',
        data: null
      };
    }

    // Username exists
    return {
      success: true,
      error: null,
      data: false
    };

  } catch (error) {
    console.error('Check username error:', error);
    return {
      success: false,
      error: 'Failed to check username',
      data: null
    };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<User>
): Promise<ApiResponse<User>> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: 'Failed to update profile',
        data: null
      };
    }

    return {
      success: true,
      error: null,
      data: user
    };

  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: 'Failed to update profile',
      data: null
    };
  }
}



