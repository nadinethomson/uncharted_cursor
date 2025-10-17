// Unit tests for destination matching algorithm
const { matchDestinations } = require('../../src/utils/destinationMatcher');

// Mock destinations for testing
const mockDestinations = [
  {
    id: '1',
    name: 'Santorini, Greece',
    country: 'Greece',
    trip_style_tags: ['romantic', 'luxury', 'relaxation'],
    interest_tags: ['photography', 'sunset', 'architecture', 'wine'],
    budget_category: 'High',
    distance_km: 2500
  },
  {
    id: '2', 
    name: 'Kyoto, Japan',
    country: 'Japan',
    trip_style_tags: ['cultural', 'historical', 'spiritual'],
    interest_tags: ['temples', 'gardens', 'traditional', 'zen'],
    budget_category: 'Medium',
    distance_km: 9000
  },
  {
    id: '3',
    name: 'Banff National Park, Canada',
    country: 'Canada',
    trip_style_tags: ['adventure', 'nature', 'outdoor'],
    interest_tags: ['hiking', 'wildlife', 'mountains', 'photography'],
    budget_category: 'Medium',
    distance_km: 3000
  },
  {
    id: '4',
    name: 'Marrakech, Morocco',
    country: 'Morocco',
    trip_style_tags: ['cultural', 'adventure', 'exotic'],
    interest_tags: ['markets', 'architecture', 'spices', 'desert'],
    budget_category: 'Low',
    distance_km: 4000
  },
  {
    id: '5',
    name: 'Reykjavik, Iceland',
    country: 'Iceland',
    trip_style_tags: ['adventure', 'nature', 'unique'],
    interest_tags: ['northern-lights', 'geysers', 'glaciers', 'photography'],
    budget_category: 'High',
    distance_km: 2000
  }
];

describe('Destination Matching Algorithm', () => {
  
  describe('Basic Matching', () => {
    test('should match destinations based on trip style', () => {
      const quizAnswers = {
        tripStyle: 'romantic',
        interests: ['photography'],
        budget: 'High',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(3);
      expect(results[0].destination.name).toBe('Santorini, Greece');
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].matchReason).toContain('romantic');
    });

    test('should match destinations based on interests', () => {
      const quizAnswers = {
        tripStyle: 'cultural',
        interests: ['temples', 'gardens'],
        budget: 'Medium',
        maxDistance: 10000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(3);
      expect(results[0].destination.name).toBe('Kyoto, Japan');
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].matchReason).toContain('temples');
    });

    test('should combine trip style and interest scoring', () => {
      const quizAnswers = {
        tripStyle: 'adventure',
        interests: ['photography', 'mountains'],
        budget: 'Medium',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(3);
      // Banff should score highest (adventure + photography + mountains)
      expect(results[0].destination.name).toBe('Banff National Park, Canada');
      expect(results[0].score).toBeGreaterThan(results[1].score);
    });
  });

  describe('Budget Filtering', () => {
    test('should filter out destinations above budget', () => {
      const quizAnswers = {
        tripStyle: 'luxury',
        interests: ['photography'],
        budget: 'Low',
        maxDistance: 10000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      // Should not include High budget destinations
      const highBudgetDestinations = results.filter(r => r.destination.budget_category === 'High');
      expect(highBudgetDestinations).toHaveLength(0);
      
      // Should include Low budget destinations
      const lowBudgetDestinations = results.filter(r => r.destination.budget_category === 'Low');
      expect(lowBudgetDestinations.length).toBeGreaterThan(0);
    });

    test('should include destinations at or below budget', () => {
      const quizAnswers = {
        tripStyle: 'cultural',
        interests: ['architecture'],
        budget: 'Medium',
        maxDistance: 10000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      // Should include Low and Medium budget destinations
      const validBudgets = results.filter(r => 
        r.destination.budget_category === 'Low' || 
        r.destination.budget_category === 'Medium'
      );
      expect(validBudgets.length).toBeGreaterThan(0);
    });
  });

  describe('Distance Filtering', () => {
    test('should filter out destinations beyond max distance', () => {
      const quizAnswers = {
        tripStyle: 'adventure',
        interests: ['nature'],
        budget: 'High',
        maxDistance: 3000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      // Should not include destinations beyond 3000km
      const farDestinations = results.filter(r => r.destination.distance_km > 3000);
      expect(farDestinations).toHaveLength(0);
    });

    test('should include destinations within max distance', () => {
      const quizAnswers = {
        tripStyle: 'adventure',
        interests: ['photography'],
        budget: 'High',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      // Should include destinations within 5000km
      const nearDestinations = results.filter(r => r.destination.distance_km <= 5000);
      expect(nearDestinations.length).toBeGreaterThan(0);
    });
  });

  describe('Scoring System', () => {
    test('should give 1 point per matching interest', () => {
      const quizAnswers = {
        tripStyle: 'cultural',
        interests: ['temples', 'gardens', 'traditional'],
        budget: 'Medium',
        maxDistance: 10000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      const kyotoResult = results.find(r => r.destination.name === 'Kyoto, Japan');
      
      expect(kyotoResult).toBeDefined();
      expect(kyotoResult.score).toBeGreaterThanOrEqual(3); // 3 matching interests
    });

    test('should give 1 point for trip style match', () => {
      const quizAnswers = {
        tripStyle: 'romantic',
        interests: ['photography'],
        budget: 'High',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      const santoriniResult = results.find(r => r.destination.name === 'Santorini, Greece');
      
      expect(santoriniResult).toBeDefined();
      expect(santoriniResult.score).toBeGreaterThanOrEqual(2); // 1 trip style + 1 interest
    });

    test('should return top 3 results maximum', () => {
      const quizAnswers = {
        tripStyle: 'adventure',
        interests: ['nature', 'photography'],
        budget: 'High',
        maxDistance: 10000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty interests array', () => {
      const quizAnswers = {
        tripStyle: 'romantic',
        interests: [],
        budget: 'High',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(3);
      // Should still match based on trip style
      expect(results[0].score).toBeGreaterThan(0);
    });

    test('should handle no matching destinations', () => {
      const quizAnswers = {
        tripStyle: 'nonexistent',
        interests: ['nonexistent'],
        budget: 'Low',
        maxDistance: 100
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results).toHaveLength(0);
    });

    test('should handle very restrictive filters', () => {
      const quizAnswers = {
        tripStyle: 'luxury',
        interests: ['photography'],
        budget: 'Low',
        maxDistance: 1000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      
      // Should return fewer results due to restrictive filters
      expect(results.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Random Tie-Breaking', () => {
    test('should handle destinations with same score', () => {
      const quizAnswers = {
        tripStyle: 'cultural',
        interests: ['architecture'],
        budget: 'Medium',
        maxDistance: 10000
      };
      
      // Run multiple times to test randomness
      const results1 = matchDestinations(quizAnswers, mockDestinations);
      const results2 = matchDestinations(quizAnswers, mockDestinations);
      
      expect(results1).toHaveLength(3);
      expect(results2).toHaveLength(3);
      
      // Results should be valid even if order differs
      results1.forEach(result => {
        expect(result.destination).toBeDefined();
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.matchReason).toBeDefined();
      });
    });
  });

  describe('Match Reasons', () => {
    test('should provide meaningful match reasons', () => {
      const quizAnswers = {
        tripStyle: 'romantic',
        interests: ['photography', 'sunset'],
        budget: 'High',
        maxDistance: 5000
      };
      
      const results = matchDestinations(quizAnswers, mockDestinations);
      const santoriniResult = results.find(r => r.destination.name === 'Santorini, Greece');
      
      expect(santoriniResult).toBeDefined();
      expect(santoriniResult.matchReason).toContain('romantic');
      expect(santoriniResult.matchReason).toContain('photography');
      expect(santoriniResult.matchReason).toContain('sunset');
    });
  });
});


