import { Destination, QuizAnswers, QuizResult } from '../types';

/**
 * Pure function to match destinations based on quiz answers
 * This is the core matching algorithm for the quiz feature
 */
export function matchDestinations(
  quizAnswers: QuizAnswers,
  destinations: Destination[]
): QuizResult[] {
  const scored = destinations.map(destination => {
    let score = 0;
    const matchReasons: string[] = [];

    // Trip style match: 1 point if ANY destination trip style matches
    if (destination.trip_style_tags.includes(quizAnswers.tripStyle)) {
      score += 1;
      matchReasons.push(`Perfect for ${quizAnswers.tripStyle} travelers`);
    }

    // Interest matches: 1 point per matching interest
    const matchingInterests = quizAnswers.interests.filter(interest =>
      destination.interest_tags.includes(interest)
    );
    score += matchingInterests.length;
    
    if (matchingInterests.length > 0) {
      matchReasons.push(`Matches your interests: ${matchingInterests.join(', ')}`);
    }

    // Apply filters (reduce score if doesn't match, but don't eliminate)
    const passesDistance = filterByDistance(destination, quizAnswers.distance);
    const passesBudget = filterByBudget(destination, quizAnswers.budget);

    // Only eliminate if both distance and budget don't match AND destination has both values
    if (!passesDistance && !passesBudget && destination.distance_km && destination.budget_category) {
      return { ...destination, score: -1, matchReason: '' };
    }

    // Add filter-based match reasons
    if (destination.budget_category === quizAnswers.budget) {
      matchReasons.push(`Fits your ${quizAnswers.budget.toLowerCase()} budget`);
    }

    if (destination.sustainability === 'High' && quizAnswers.interests.includes('Sustainability')) {
      matchReasons.push('High sustainability rating');
    }

    const matchReason = matchReasons.length > 0 
      ? matchReasons.join('. ') 
      : 'A great destination for your travel style';

    return { ...destination, score, matchReason };
  });

  // Filter out destinations that don't pass filters
  const filtered = scored.filter(dest => dest.score >= 0);

  // Sort by score (descending), tie-break with random
  filtered.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return Math.random() - 0.5;
  });

  // Return top 3 as QuizResult format
  return filtered.slice(0, 3).map(dest => ({
    destination: dest,
    score: dest.score,
    matchReason: dest.matchReason
  }));
}

/**
 * Filter destinations by distance from user's location
 */
function filterByDistance(destination: Destination, distancePreference: string): boolean {
  if (!destination.distance_km) {
    return true; // Include if no distance data
  }

  switch (distancePreference) {
    case 'Near':
      return destination.distance_km < 100;
    case 'Medium':
      return destination.distance_km >= 100 && destination.distance_km <= 500;
    case 'Far':
      return destination.distance_km > 500;
    default:
      return true;
  }
}

/**
 * Filter destinations by budget category
 */
function filterByBudget(destination: Destination, budgetPreference: string): boolean {
  if (!destination.budget_category) {
    return true; // Include if no budget data
  }

  return destination.budget_category === budgetPreference;
}

/**
 * Get match score for a single destination
 */
export function getDestinationScore(destination: Destination, quizAnswers: QuizAnswers): number {
  let score = 0;

  // Trip style match
  if (destination.trip_style_tags.includes(quizAnswers.tripStyle)) {
    score += 1;
  }

  // Interest matches
  const matchingInterests = quizAnswers.interests.filter(interest =>
    destination.interest_tags.includes(interest)
  );
  score += matchingInterests.length;

  return score;
}

/**
 * Check if destination passes all filters
 */
export function passesFilters(destination: Destination, quizAnswers: QuizAnswers): boolean {
  return filterByDistance(destination, quizAnswers.distance) && 
         filterByBudget(destination, quizAnswers.budget);
}



