import { supabase } from './supabase';
import { SavedVisited, Destination } from '../types';

/**
 * Service for saved and visited destinations functionality
 * Handles saving, visiting, and retrieving user's destination lists
 */

/**
 * Saves or unsaves a destination for a user
 * 
 * @param userId - User ID
 * @param destinationId - Destination ID
 * @param isSaved - Whether to save or unsave
 * @returns Promise<boolean> - Success status
 * 
 * @throws {Error} If operation fails
 */
export async function saveDestination(userId: string, destinationId: string, isSaved: boolean): Promise<boolean> {
  try {
    if (isSaved) {
      // Insert saved destination
      const { error } = await supabase
        .from('saved_visited')
        .insert({
          user_id: userId,
          destination_id: destinationId,
          type: 'saved'
        });

      if (error) {
        // If it's a duplicate key error, that's okay
        if (error.code === '23505') {
          return true;
        }
        throw new Error(`Failed to save destination: ${error.message}`);
      }
    } else {
      // Remove saved destination
      const { error } = await supabase
        .from('saved_visited')
        .delete()
        .eq('user_id', userId)
        .eq('destination_id', destinationId)
        .eq('type', 'saved');

      if (error) {
        throw new Error(`Failed to unsave destination: ${error.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error('Save destination error:', error);
    throw error;
  }
}

/**
 * Marks or unmarks a destination as visited for a user
 * 
 * @param userId - User ID
 * @param destinationId - Destination ID
 * @param isVisited - Whether to mark as visited or not
 * @returns Promise<boolean> - Success status
 * 
 * @throws {Error} If operation fails
 */
export async function visitDestination(userId: string, destinationId: string, isVisited: boolean): Promise<boolean> {
  try {
    if (isVisited) {
      // Insert visited destination
      const { error } = await supabase
        .from('saved_visited')
        .insert({
          user_id: userId,
          destination_id: destinationId,
          type: 'visited'
        });

      if (error) {
        // If it's a duplicate key error, that's okay
        if (error.code === '23505') {
          return true;
        }
        throw new Error(`Failed to mark destination as visited: ${error.message}`);
      }
    } else {
      // Remove visited destination
      const { error } = await supabase
        .from('saved_visited')
        .delete()
        .eq('user_id', userId)
        .eq('destination_id', destinationId)
        .eq('type', 'visited');

      if (error) {
        throw new Error(`Failed to unmark destination as visited: ${error.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error('Visit destination error:', error);
    throw error;
  }
}

/**
 * Gets all saved and visited destinations for a user
 * 
 * @param userId - User ID
 * @returns Promise<{saved: SavedVisited[], visited: SavedVisited[]}> - User's destination lists
 * 
 * @throws {Error} If query fails
 */
export async function getSavedVisitedDestinations(userId: string): Promise<{
  saved: SavedVisited[];
  visited: SavedVisited[];
}> {
  try {
    const { data: savedVisited, error } = await supabase
      .from('saved_visited')
      .select(`
        *,
        destination:destinations!saved_visited_destination_id_fkey (
          id,
          name,
          country,
          image_url,
          overview
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch saved/visited destinations: ${error.message}`);
    }

    const saved = (savedVisited || []).filter(item => item.type === 'saved');
    const visited = (savedVisited || []).filter(item => item.type === 'visited');

    return { saved, visited };
  } catch (error) {
    console.error('Get saved visited destinations error:', error);
    throw error;
  }
}

/**
 * Gets saved destinations for a user
 * 
 * @param userId - User ID
 * @param limit - Maximum number of destinations to return
 * @param offset - Number of destinations to skip
 * @returns Promise<SavedVisited[]> - Array of saved destinations
 * 
 * @throws {Error} If query fails
 */
export async function getSavedDestinations(
  userId: string, 
  limit: number = 12, 
  offset: number = 0
): Promise<SavedVisited[]> {
  try {
    const { data: saved, error } = await supabase
      .from('saved_visited')
      .select(`
        *,
        destination:destinations!saved_visited_destination_id_fkey (
          id,
          name,
          country,
          image_url,
          overview,
          trip_style_tags,
          interest_tags
        )
      `)
      .eq('user_id', userId)
      .eq('type', 'saved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch saved destinations: ${error.message}`);
    }

    return saved || [];
  } catch (error) {
    console.error('Get saved destinations error:', error);
    throw error;
  }
}

/**
 * Gets visited destinations for a user
 * 
 * @param userId - User ID
 * @param limit - Maximum number of destinations to return
 * @param offset - Number of destinations to skip
 * @returns Promise<SavedVisited[]> - Array of visited destinations
 * 
 * @throws {Error} If query fails
 */
export async function getVisitedDestinations(
  userId: string, 
  limit: number = 12, 
  offset: number = 0
): Promise<SavedVisited[]> {
  try {
    const { data: visited, error } = await supabase
      .from('saved_visited')
      .select(`
        *,
        destination:destinations!saved_visited_destination_id_fkey (
          id,
          name,
          country,
          image_url,
          overview,
          trip_style_tags,
          interest_tags
        )
      `)
      .eq('user_id', userId)
      .eq('type', 'visited')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch visited destinations: ${error.message}`);
    }

    return visited || [];
  } catch (error) {
    console.error('Get visited destinations error:', error);
    throw error;
  }
}

/**
 * Checks if a destination is saved by a user
 * 
 * @param userId - User ID
 * @param destinationId - Destination ID
 * @returns Promise<boolean> - Whether destination is saved
 * 
 * @throws {Error} If query fails
 */
export async function isDestinationSaved(userId: string, destinationId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('saved_visited')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destinationId)
      .eq('type', 'saved')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw new Error(`Failed to check if destination is saved: ${error.message}`);
    }

    return !!data;
  } catch (error) {
    console.error('Is destination saved error:', error);
    throw error;
  }
}

/**
 * Checks if a destination is visited by a user
 * 
 * @param userId - User ID
 * @param destinationId - Destination ID
 * @returns Promise<boolean> - Whether destination is visited
 * 
 * @throws {Error} If query fails
 */
export async function isDestinationVisited(userId: string, destinationId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('saved_visited')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destinationId)
      .eq('type', 'visited')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw new Error(`Failed to check if destination is visited: ${error.message}`);
    }

    return !!data;
  } catch (error) {
    console.error('Is destination visited error:', error);
    throw error;
  }
}




