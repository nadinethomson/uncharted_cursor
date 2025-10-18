import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCredits, updateReputation } from '../store/userSlice';
import { executePostCreditTransaction, checkSufficientCredits } from '../services/creditService';
import { calculateReputationTier } from '../utils/reputationTier';

/**
 * Custom hook for credit management
 * Provides clean interface for credit operations with atomic transactions
 */
export function useCredits() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);

  const checkCredits = useCallback(async (actionType: string) => {
    if (!userState.profile) {
      return { success: false, error: 'User not logged in', data: null };
    }

    return await checkSufficientCredits(userState.profile.id, actionType);
  }, [userState.profile]);

  const spendCredits = useCallback(async (actionType: string, relatedId?: string) => {
    if (!userState.profile) {
      return { success: false, error: 'User not logged in', data: null };
    }

    const result = await executePostCreditTransaction(userState.profile.id, {
      destinationId: relatedId || '',
      type: actionType as 'tip' | 'review' | 'experience',
      content: 'Ask a local question',
      imageUrl: undefined
    });

    if (result && result.creditResult) {
      // Update Redux state
      dispatch(updateCredits({
        amount: -5,
        newTotal: result.creditResult.newCredits
      }));

      dispatch(updateReputation({
        reputation: result.creditResult.newReputation,
        tier: result.creditResult.newTier as any
      }));
    }

    return result;
  }, [dispatch, userState.profile]);

  const earnCredits = useCallback(async (actionType: string, amount: number, relatedId?: string) => {
    if (!userState.profile) {
      return { success: false, error: 'User not logged in', data: null };
    }

    const result = await executePostCreditTransaction(userState.profile.id, {
      destinationId: relatedId || '',
      type: actionType as 'tip' | 'review' | 'experience',
      content: 'Post creation',
      imageUrl: undefined
    });

    if (result && result.creditResult) {
      // Update Redux state
      dispatch(updateCredits({
        amount,
        newTotal: result.creditResult.newCredits
      }));

      dispatch(updateReputation({
        reputation: result.creditResult.newReputation,
        tier: result.creditResult.newTier as any
      }));
    }

    return result;
  }, [dispatch, userState.profile]);

  const getReputationInfo = useCallback(() => {
    const credits = userState.credits;
    const tier = calculateReputationTier(credits);
    
    return {
      credits,
      tier,
      reputation: userState.reputation
    };
  }, [userState.credits, userState.reputation]);

  const canPerformAction = useCallback((actionType: string) => {
    if (!userState.profile) return false;
    
    // Check if user has sufficient credits for spending actions
    if (actionType === 'ask_local') {
      return userState.credits >= 5;
    }
    
    return true; // Earning actions don't require credits
  }, [userState.profile, userState.credits]);

  return {
    // State
    credits: userState.credits,
    reputation: userState.reputation,
    reputationTier: userState.reputationTier,
    
    // Actions
    checkCredits,
    spendCredits,
    earnCredits,
    getReputationInfo,
    canPerformAction,
  };
}



