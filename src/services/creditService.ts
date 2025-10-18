import { supabase } from './supabase';
import { calculateCreditsEarned, calculateCreditsSpent, calculateNewCreditTotal, hasSufficientCredits } from '../utils/creditCalculator';
import { calculateReputationTier } from '../utils/reputationTier';
import { ApiResponse, Post, CreatePostData } from '../types';

/**
 * Service for handling credit transactions with atomic operations
 * This is the core service that ensures credit consistency
 * 
 * CRITICAL: All credit operations must be atomic to prevent race conditions
 * and maintain data consistency across the application.
 */

export interface CreditTransactionData {
  userId: string;
  amount: number;
  type: string;
  relatedId?: string;
}

export interface CreatePostWithCreditsData {
  destinationId: string;
  type: 'tip' | 'review' | 'experience';
  content: string;
  imageUrl?: string;
}

/**
 * Creates a post and processes credits atomically
 * This is the main function that handles the critical constraint of atomic operations
 * 
 * @param userId - The user creating the post
 * @param postData - Post data including type and content
 * @returns Promise with post data and credit transaction result
 * 
 * @throws {Error} If user not found, insufficient credits, or transaction fails
 * 
 * ATOMIC OPERATION:
 * 1. Check user exists and has sufficient credits (if spending)
 * 2. Create post in database
 * 3. Update user credits and reputation
 * 4. Log credit transaction
 * 5. If any step fails, rollback everything
 */
export async function createPostWithCredits(
  userId: string,
  postData: CreatePostWithCreditsData
): Promise<{ post: Post; creditResult: any }> {
  try {
    // Step 1: Validate user and check credits
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('credits, reputation')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      throw new Error('User not found');
    }

    // Calculate credit amount for this post type
    const creditAmount = calculateCreditsEarned(postData.type);
    
    // Check if user has sufficient credits for spending actions
    if (creditAmount < 0 && user.credits < Math.abs(creditAmount)) {
      throw new Error('Insufficient credits for this action');
    }

    // Step 2: Create post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        destination_id: postData.destinationId,
        type: postData.type,
        content: postData.content,
        image_url: postData.imageUrl || null
      })
      .select()
      .single();

    if (postError) {
      throw new Error(`Failed to create post: ${postError.message}`);
    }

    // Step 3: Update credits atomically using database function
    const { data: creditResult, error: creditError } = await supabase
      .rpc('update_user_credits', {
        p_user_id: userId,
        p_amount: creditAmount,
        p_type: postData.type,
        p_related_id: post.id
      });

    if (creditError || !creditResult.success) {
      // CRITICAL: Rollback post creation if credit update fails
      await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);
      
      throw new Error(`Credit transaction failed: ${creditResult?.error || creditError?.message || 'Unknown error'}`);
    }

    return {
      post,
      creditResult
    };

  } catch (error) {
    console.error('Create post with credits error:', error);
    throw error;
  }
}

/**
 * Deducts credits from user account with validation
 * 
 * @param userId - User ID
 * @param amount - Amount to deduct (positive number)
 * @param type - Transaction type for logging
 * @param relatedId - Related entity ID (optional)
 * 
 * @throws {Error} If user not found, insufficient credits, or transaction fails
 */
export async function deductCredits(
  userId: string,
  amount: number,
  type: string,
  relatedId?: string
): Promise<{ newCredits: number; newReputation: number; newTier: string }> {
  if (amount <= 0) {
    throw new Error('Deduction amount must be positive');
  }

  try {
    // Use database function for atomic transaction
    const { data: result, error } = await supabase
      .rpc('update_user_credits', {
        p_user_id: userId,
        p_amount: -amount, // Negative for deduction
        p_type: type,
        p_related_id: relatedId
      });

    if (error || !result.success) {
      throw new Error(result?.error || error?.message || 'Unknown error');
    }

    return {
      newCredits: result.new_credits,
      newReputation: result.new_reputation,
      newTier: calculateReputationTier(result.new_credits)
    };

  } catch (error) {
    console.error('Deduct credits error:', error);
    throw error;
  }
}

/**
 * Adds credits to user account
 * 
 * @param userId - User ID
 * @param amount - Amount to add (positive number)
 * @param type - Transaction type for logging
 * @param relatedId - Related entity ID (optional)
 * 
 * @throws {Error} If user not found or transaction fails
 */
export async function addCredits(
  userId: string,
  amount: number,
  type: string,
  relatedId?: string
): Promise<{ newCredits: number; newReputation: number; newTier: string }> {
  if (amount <= 0) {
    throw new Error('Credit amount must be positive');
  }

  try {
    // Use database function for atomic transaction
    const { data: result, error } = await supabase
      .rpc('update_user_credits', {
        p_user_id: userId,
        p_amount: amount, // Positive for addition
        p_type: type,
        p_related_id: relatedId
      });

    if (error || !result.success) {
      throw new Error(result?.error || error?.message || 'Unknown error');
    }

    return {
      newCredits: result.new_credits,
      newReputation: result.new_reputation,
      newTier: calculateReputationTier(result.new_credits)
    };

  } catch (error) {
    console.error('Add credits error:', error);
    throw error;
  }
}

/**
 * Checks if user has sufficient credits for an action
 * 
 * @param userId - User ID
 * @param actionType - Type of action to check
 * @returns Promise<boolean> - True if user has sufficient credits
 * 
 * @throws {Error} If user not found
 */
export async function checkSufficientCredits(
  userId: string,
  actionType: string
): Promise<boolean> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new Error('User not found');
    }

    const requiredCredits = calculateCreditsSpent(actionType);
    return user.credits >= requiredCredits;

  } catch (error) {
    console.error('Check credits error:', error);
    throw error;
  }
}

/**
 * Gets user's current credit balance
 * 
 * @param userId - User ID
 * @returns Promise<number> - Current credit balance
 * 
 * @throws {Error} If user not found
 */
export async function getUserCredits(userId: string): Promise<number> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new Error('User not found');
    }

    return user.credits;

  } catch (error) {
    console.error('Get credits error:', error);
    throw error;
  }
}

/**
 * Gets credit transaction history for a user
 * 
 * @param userId - User ID
 * @param limit - Maximum number of transactions to return
 * @returns Promise<CreditTransaction[]> - Array of credit transactions
 * 
 * @throws {Error} If query fails
 */
export async function getCreditHistory(
  userId: string,
  limit: number = 20
): Promise<any[]> {
  try {
    const { data: transactions, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to get credit history: ${error.message}`);
    }

    return transactions || [];

  } catch (error) {
    console.error('Get credit history error:', error);
    throw error;
  }
}

/**
 * Rollbacks a credit transaction
 * This is used when a multi-step operation fails
 * 
 * @param transactionId - ID of the transaction to rollback
 * @returns Promise<boolean> - True if rollback successful
 * 
 * @throws {Error} If transaction not found or rollback fails
 */
export async function rollbackCreditTransaction(
  transactionId: string
): Promise<boolean> {
  try {
    // Use database function for atomic rollback
    const { data: result, error } = await supabase
      .rpc('rollback_credit_transaction', {
        p_transaction_id: transactionId
      });

    if (error || !result.success) {
      throw new Error(result?.error || error?.message || 'Unknown error');
    }

    return true;

  } catch (error) {
    console.error('Rollback credit transaction error:', error);
    throw error;
  }
}

/**
 * Execute a generic credit transaction (for non-post actions)
 * 
 * @param userId - User ID
 * @param transactionData - Transaction data including type and amount
 * @returns Promise with transaction result
 */
export async function executeCreditTransaction(
  userId: string,
  transactionData: {
    destinationId: string;
    type: string;
    content: string;
    imageUrl?: string;
  }
): Promise<{ success: boolean; error?: string; creditResult?: any }> {
  try {
    // Get current user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return { success: false, error: 'User not found' };
    }

    // Calculate credit change
    const creditChange = calculateCreditsSpent(transactionData.type);
    
    // Check if user has sufficient credits (for spending actions)
    if (creditChange < 0 && !hasSufficientCredits(user.credits, transactionData.type)) {
      return { 
        success: false, 
        error: 'Insufficient credits for this action' 
      };
    }

    // Calculate new totals
    const newCredits = calculateNewCreditTotal(user.credits, creditChange);
    const newReputation = user.reputation + Math.abs(creditChange);
    const newTier = calculateReputationTier(newReputation);

    // Update user credits and reputation
    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits: newCredits,
        reputation: newReputation,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      return { success: false, error: 'Failed to update user credits' };
    }

    // Log credit transaction
    const { error: logError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        amount: creditChange,
        type: transactionData.type,
        related_id: transactionData.destinationId,
        status: 'completed'
      });

    if (logError) {
      console.error('Failed to log credit transaction:', logError);
      // Don't fail the transaction for logging errors
    }

    return {
      success: true,
      creditResult: {
        newCredits,
        newReputation,
        newTier,
        creditChange
      }
    };

  } catch (error) {
    console.error('Credit transaction error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Transaction failed' 
    };
  }
}

/**
 * Execute a credit transaction for post creation (alias for createPostWithCredits for backward compatibility)
 */
export async function executePostCreditTransaction(
  userId: string,
  postData: CreatePostWithCreditsData
): Promise<{ post: Post; creditResult: any }> {
  return createPostWithCredits(userId, postData);
}
