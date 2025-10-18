import { Post } from '../types';

/**
 * Calculate credits earned for different post types
 */
export function calculateCreditsEarned(postType: string): number {
  switch (postType) {
    case 'tip':
      return 5;
    case 'review':
      return 5;
    case 'experience':
      return 10;
    default:
      return 0;
  }
}

/**
 * Calculate credits spent for different actions
 */
export function calculateCreditsSpent(actionType: string): number {
  switch (actionType) {
    case 'ask_local':
      return 5;
    default:
      return 0;
  }
}

/**
 * Calculate total credits after a transaction
 */
export function calculateNewCreditTotal(
  currentCredits: number,
  creditChange: number
): number {
  const newTotal = currentCredits + creditChange;
  // Prevent negative credits
  return Math.max(0, newTotal);
}

/**
 * Check if user has sufficient credits for an action
 */
export function hasSufficientCredits(
  currentCredits: number,
  actionType: string
): boolean {
  const requiredCredits = calculateCreditsSpent(actionType);
  return currentCredits >= requiredCredits;
}

/**
 * Calculate credits for a post creation transaction
 */
export function calculatePostCredits(post: Post): number {
  return calculateCreditsEarned(post.type);
}

/**
 * Validate credit transaction
 */
export function validateCreditTransaction(
  currentCredits: number,
  creditChange: number
): { isValid: boolean; error?: string } {
  if (creditChange < 0 && Math.abs(creditChange) > currentCredits) {
    return {
      isValid: false,
      error: 'Insufficient credits for this transaction'
    };
  }

  if (creditChange === 0) {
    return {
      isValid: false,
      error: 'No credit change specified'
    };
  }

  return { isValid: true };
}

/**
 * Get credit transaction description
 */
export function getCreditTransactionDescription(
  actionType: string,
  amount: number
): string {
  const actionDescriptions: Record<string, string> = {
    'tip': 'Posting a travel tip',
    'review': 'Sharing a destination review',
    'experience': 'Adding a new experience',
    'ask_local': 'Asking a local question',
  };

  const action = actionDescriptions[actionType] || 'Unknown action';
  const direction = amount > 0 ? 'earned' : 'spent';
  
  return `${action} - ${Math.abs(amount)} credits ${direction}`;
}










