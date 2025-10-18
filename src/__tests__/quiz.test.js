/**
 * Unit tests for quiz functionality
 */

import { matchDestinations } from '../../src/utils/destinationMatcher';

// Mock destination data
const mockDestinations = [
  {
    id: '1',
    name: 'Kyoto, Japan',
    country: 'JP',
    trip_style_tags: ['Cultural', 'Relaxed'],
    interest_tags: ['Culture', 'Food', 'History'],
    overview: 'Experience authentic Japanese culture in ancient temples and traditional gardens.',
    key_attractions: [],
    sustainability: 'Medium',
    best_season: 'Spring, Autumn',
    image_url: null,
    active: true,
    distance_km: 8000,
    budget_category: 'Medium',
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: '2',
    name: 'Patagonia, Chile',
    country: 'CL',
    trip_style_tags: ['Adventure', 'Nature'],
    interest_tags: ['Nature', 'Adventure', 'Sustainability'],
    overview: 'Explore pristine wilderness and dramatic landscapes.',
    key_attractions: [],
    sustainability: 'High',
    best_season: 'Summer',
    image_url: null,
    active: true,
    distance_km: 12000,
    budget_category: 'High',
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: '3',
    name: 'Prague, Czech Republic',
    country: 'CZ',
    trip_style_tags: ['Cultural', 'Food'],
    interest_tags: ['Culture', 'History', 'Food'],
    overview: 'Medieval architecture and rich cultural heritage.',
    key_attractions: [],
    sustainability: 'Low',
    best_season: 'Spring, Summer',
    image_url: null,
    active: true,
    distance_km: 2000,
    budget_category: 'Low',
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  }
];

describe('Quiz Matching Algorithm', () => {
  test('should match destinations based on trip style', () => {
    const quizAnswers = {
      tripStyle: 'Cultural',
      interests: ['Culture', 'History'],
      budget: 'Medium',
      distance: 'Far'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    expect(results.length).toBeGreaterThan(0); // Should have some matches
    expect(results[0].destination.name).toBe('Kyoto, Japan'); // Kyoto should be first (best match)
    expect(results[0].score).toBeGreaterThan(0); // Should have a positive score
  });

  test('should filter by budget', () => {
    const quizAnswers = {
      tripStyle: 'Cultural',
      interests: ['Culture'],
      budget: 'Low',
      distance: 'Medium'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    expect(results).toHaveLength(1);
    expect(results[0].destination.name).toBe('Prague, Czech Republic');
  });

  test('should filter by distance', () => {
    const quizAnswers = {
      tripStyle: 'Adventure',
      interests: ['Nature'],
      budget: 'High',
      distance: 'Near'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    // Should have fewer results due to distance filtering
    expect(results.length).toBeLessThan(mockDestinations.length);
  });

  test('should score based on interest matches', () => {
    const quizAnswers = {
      tripStyle: 'Cultural',
      interests: ['Culture', 'Food', 'History'],
      budget: 'Medium',
      distance: 'Far'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThan(0); // Should have positive score
    
    // Find Kyoto in results (should be there due to high interest match)
    const kyotoResult = results.find(r => r.destination.name === 'Kyoto, Japan');
    expect(kyotoResult).toBeDefined();
    expect(kyotoResult.score).toBeGreaterThan(0);
  });

  test('should return fewer results when strict criteria', () => {
    const quizAnswers = {
      tripStyle: 'Adventure',
      interests: ['Nature'],
      budget: 'Low',
      distance: 'Near'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    // Should have fewer results due to strict filtering
    expect(results.length).toBeLessThan(mockDestinations.length);
  });

  test('should include match reasons', () => {
    const quizAnswers = {
      tripStyle: 'Cultural',
      interests: ['Culture', 'Food'],
      budget: 'Medium',
      distance: 'Far'
    };

    const results = matchDestinations(quizAnswers, mockDestinations);
    
    expect(results[0].matchReason).toContain('Cultural');
    expect(results[0].matchReason).toContain('Culture');
  });
});

