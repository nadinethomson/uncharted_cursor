import { supabase } from './supabase';
import { matchDestinations } from '../utils/destinationMatcher';
import { Destination, QuizAnswers, QuizResult } from '../types';

/**
 * Service for handling destination data and quiz matching
 * This service provides destination CRUD operations and search functionality
 * 
 * CRITICAL: No credit logic here - destinations are independent of credit operations
 * This ensures clean separation of concerns
 */

export interface DestinationFilters {
  country?: string;
  tripStyle?: string;
  interest?: string;
  sustainability?: 'Low' | 'Medium' | 'High';
  budget?: 'Low' | 'Medium' | 'High';
  searchQuery?: string;
}

/**
 * Fetches a destination by ID
 * 
 * @param destinationId - Destination ID
 * @returns Promise<Destination> - Destination data
 * 
 * @throws {Error} If destination not found or query fails
 */
export async function fetchDestinationById(destinationId: string): Promise<Destination> {
  try {
    const { data: destination, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', destinationId)
      .eq('active', true)
      .single();

    if (error || !destination) {
      throw new Error(`Destination not found: ${error?.message}`);
    }

    return destination;

  } catch (error) {
    console.error('Fetch destination by ID error:', error);
    throw error;
  }
}

/**
 * Fetches all active destinations
 * 
 * @param limit - Maximum number of destinations to return
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchAll(limit?: number): Promise<Destination[]> {
  try {
    let query = supabase
      .from('destinations')
      .select('*')
      .eq('active', true)
      .order('name');

    if (limit) {
      query = query.limit(limit);
    }

    const { data: destinations, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch destinations: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch all destinations error:', error);
    throw error;
  }
}

/**
 * Searches destinations with filters
 * This is the main function used by the quiz system
 * 
 * @param filters - Search filters
 * @param limit - Maximum number of results
 * @returns Promise<Destination[]> - Array of matching destinations
 * 
 * @throws {Error} If query fails
 */
export async function searchDestinations(
  filters: DestinationFilters,
  limit: number = 50
): Promise<Destination[]> {
  try {
    let query = supabase
      .from('destinations')
      .select('*')
      .eq('active', true);

    // Apply filters
    if (filters.country) {
      query = query.eq('country', filters.country);
    }

    if (filters.tripStyle) {
      query = query.contains('trip_style_tags', [filters.tripStyle]);
    }

    if (filters.interest) {
      query = query.contains('interest_tags', [filters.interest]);
    }

    if (filters.sustainability) {
      query = query.eq('sustainability', filters.sustainability);
    }

    if (filters.budget) {
      query = query.eq('budget_category', filters.budget);
    }

    if (filters.searchQuery) {
      query = query.ilike('name', `%${filters.searchQuery}%`);
    }

    const { data: destinations, error } = await query
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to search destinations: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Search destinations error:', error);
    throw error;
  }
}

/**
 * Runs quiz matching algorithm
 * This is the core function for the quiz feature
 * 
 * @param quizAnswers - User's quiz answers
 * @returns Promise<QuizResult[]> - Array of matched destinations with scores
 * 
 * @throws {Error} If matching fails
 */
export async function runQuizMatching(quizAnswers: QuizAnswers): Promise<QuizResult[]> {
  try {
    // Get all active destinations for matching
    const destinations = await fetchAll();

    if (destinations.length === 0) {
      throw new Error('No destinations available for matching');
    }

    // Run matching algorithm
    const results = matchDestinations(quizAnswers, destinations);

    return results;

  } catch (error) {
    console.error('Quiz matching error:', error);
    throw error;
  }
}

// Export aliases for backward compatibility
export const getAllDestinations = fetchAll;
export const getDestinationById = fetchDestinationById;
export const getRandomDestinations = fetchRandom;

/**
 * Fetches destinations by country
 * 
 * @param country - Country code
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchByCountry(
  country: string,
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('country', country)
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch destinations by country: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch destinations by country error:', error);
    throw error;
  }
}

/**
 * Fetches destinations by trip style
 * 
 * @param tripStyle - Trip style to filter by
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchByTripStyle(
  tripStyle: string,
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .contains('trip_style_tags', [tripStyle])
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch destinations by trip style: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch destinations by trip style error:', error);
    throw error;
  }
}

/**
 * Fetches destinations by interest
 * 
 * @param interest - Interest to filter by
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchByInterest(
  interest: string,
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .contains('interest_tags', [interest])
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch destinations by interest: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch destinations by interest error:', error);
    throw error;
  }
}

/**
 * Fetches destinations by sustainability level
 * 
 * @param sustainability - Sustainability level
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchBySustainability(
  sustainability: 'Low' | 'Medium' | 'High',
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('sustainability', sustainability)
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch destinations by sustainability: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch destinations by sustainability error:', error);
    throw error;
  }
}

/**
 * Fetches destinations by budget category
 * 
 * @param budget - Budget category
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchByBudget(
  budget: 'Low' | 'Medium' | 'High',
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('budget_category', budget)
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch destinations by budget: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch destinations by budget error:', error);
    throw error;
  }
}

/**
 * Fetches random destinations for featured content
 * 
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of random destinations
 * 
 * @throws {Error} If query fails
 */
export async function fetchRandom(limit: number = 6): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('active', true)
      .not('image_url', 'is', null)
      .order('random()')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch random destinations: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch random destinations error:', error);
    throw error;
  }
}

/**
 * Fetches destinations with images for featured content
 * 
 * @param limit - Maximum number of destinations
 * @returns Promise<Destination[]> - Array of destinations with images
 * 
 * @throws {Error} If query fails
 */
export async function fetchFeatured(limit: number = 6): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('active', true)
      .not('image_url', 'is', null)
      .order('random()')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch featured destinations: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Fetch featured destinations error:', error);
    throw error;
  }
}

/**
 * Searches destinations by name
 * 
 * @param query - Search query
 * @param limit - Maximum number of results
 * @returns Promise<Destination[]> - Array of matching destinations
 * 
 * @throws {Error} If query fails
 */
export async function searchByName(
  query: string,
  limit: number = 20
): Promise<Destination[]> {
  try {
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('active', true)
      .order('name')
      .limit(limit);

    if (error) {
      throw new Error(`Failed to search destinations by name: ${error.message}`);
    }

    return destinations || [];

  } catch (error) {
    console.error('Search destinations by name error:', error);
    throw error;
  }
}
