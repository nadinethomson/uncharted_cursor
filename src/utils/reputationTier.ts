import { ReputationTier, ReputationInfo } from '../types';

/**
 * Calculate reputation tier based on credits
 */
export function calculateReputationTier(credits: number): ReputationTier {
  if (credits >= 76) {
    return 'Local Expert';
  } else if (credits >= 51) {
    return 'Local';
  } else if (credits >= 21) {
    return 'Active Traveller';
  } else {
    return 'New Traveller';
  }
}

/**
 * Get reputation information for a user
 */
export function getReputationInfo(credits: number): ReputationInfo {
  const tier = calculateReputationTier(credits);
  
  const reputationData: Record<ReputationTier, ReputationInfo> = {
    'New Traveller': {
      tier: 'New Traveller',
      credits,
      icon: '🌱',
      color: 'text-gray-600'
    },
    'Active Traveller': {
      tier: 'Active Traveller',
      credits,
      icon: '🧳',
      color: 'text-blue-600'
    },
    'Local': {
      tier: 'Local',
      credits,
      icon: '🏠',
      color: 'text-green-600'
    },
    'Local Expert': {
      tier: 'Local Expert',
      credits,
      icon: '⭐',
      color: 'text-purple-600'
    }
  };

  return reputationData[tier];
}

/**
 * Check if user can answer local questions
 */
export function canAnswerLocalQuestions(credits: number): boolean {
  return credits >= 51; // Local tier or above
}

/**
 * Get next tier information
 */
export function getNextTierInfo(currentCredits: number): {
  tier: ReputationTier;
  creditsNeeded: number;
  progress: number;
} | null {
  const currentTier = calculateReputationTier(currentCredits);
  
  const tierThresholds: Record<ReputationTier, number> = {
    'New Traveller': 21,
    'Active Traveller': 51,
    'Local': 76,
    'Local Expert': Infinity
  };

  const nextTier = Object.keys(tierThresholds).find(
    tier => tierThresholds[tier as ReputationTier] > currentCredits
  ) as ReputationTier;

  if (!nextTier || nextTier === 'Local Expert') {
    return null; // Already at highest tier
  }

  const creditsNeeded = tierThresholds[nextTier] - currentCredits;
  const progress = Math.min(100, (currentCredits / tierThresholds[nextTier]) * 100);

  return {
    tier: nextTier,
    creditsNeeded,
    progress
  };
}

/**
 * Calculate reputation points from credits
 */
export function calculateReputationPoints(credits: number): number {
  // Reputation points are the same as credits in this system
  return credits;
}

/**
 * Get tier display name with emoji
 */
export function getTierDisplayName(tier: ReputationTier): string {
  const tierDisplay: Record<ReputationTier, string> = {
    'New Traveller': '🌱 New Traveller',
    'Active Traveller': '🧳 Active Traveller',
    'Local': '🏠 Local',
    'Local Expert': '⭐ Local Expert'
  };

  return tierDisplay[tier];
}

/**
 * Get tier description
 */
export function getTierDescription(tier: ReputationTier): string {
  const descriptions: Record<ReputationTier, string> = {
    'New Traveller': 'Just starting your travel journey',
    'Active Traveller': 'Regularly sharing travel experiences',
    'Local': 'Trusted local with valuable insights',
    'Local Expert': 'Recognized expert in travel community'
  };

  return descriptions[tier];
}










