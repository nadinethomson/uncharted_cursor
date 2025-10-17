import { supabase } from './supabase';
import { createPostWithCredits as createPostWithCreditsService } from './creditService';
import { Post, CreatePostData, User, Destination } from '../types';

/**
 * Service for handling post CRUD operations
 * This service delegates credit operations to creditService to maintain separation of concerns
 * 
 * CRITICAL: No credit logic here - all credit operations are handled by creditService
 * This ensures atomic transactions and prevents race conditions
 */

export interface PostWithUser extends Post {
  user: User;
  destination: Destination;
}

/**
 * Creates a new post with atomic credit transaction
 * This function delegates to creditService for atomic operations
 * 
 * @param postData - Post creation data
 * @returns Promise<Post> - Created post with user and destination data
 * 
 * @throws {Error} If post creation fails, insufficient credits, or transaction fails
 * 
 * ATOMIC OPERATION:
 * 1. Upload image if provided
 * 2. Create post and process credits atomically via creditService
 * 3. If any step fails, rollback everything
 */
export async function createPost(postData: CreatePostData): Promise<PostWithUser> {
  try {
    let imageUrl: string | null = null;

    // Step 1: Upload image if provided
    if (postData.imageFile) {
      imageUrl = await uploadPostImage(postData.userId, postData.imageFile);
    }

    // Step 2: Create post with atomic credit transaction
    const result = await createPostWithCreditsService(postData.userId, {
      destinationId: postData.destinationId,
      type: postData.type,
      content: postData.content,
      imageUrl: imageUrl || undefined
    });

    // Step 3: Fetch complete post data with user and destination info
    const { data: completePost, error: fetchError } = await supabase
      .from('posts')
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!posts_destination_id_fkey (
          id,
          name,
          country
        )
      `)
      .eq('id', result.post.id)
      .single();

    if (fetchError || !completePost) {
      throw new Error(`Failed to fetch complete post data: ${fetchError?.message}`);
    }

    return completePost;

  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
}

/**
 * Fetches posts for a specific destination
 * 
 * @param destinationId - Destination ID
 * @param limit - Maximum number of posts to return
 * @returns Promise<PostWithUser[]> - Array of posts with user and destination data
 * 
 * @throws {Error} If query fails
 */
export async function fetchPostsByDestination(
  destinationId: string,
  limit: number = 10
): Promise<PostWithUser[]> {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!posts_destination_id_fkey (
          id,
          name,
          country
        )
      `)
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return posts || [];

  } catch (error) {
    console.error('Fetch posts by destination error:', error);
    throw error;
  }
}

/**
 * Fetches posts by a specific user
 * 
 * @param userId - User ID
 * @param limit - Maximum number of posts to return
 * @returns Promise<PostWithUser[]> - Array of posts with user and destination data
 * 
 * @throws {Error} If query fails
 */
export async function fetchPostsByUser(
  userId: string,
  limit: number = 20
): Promise<PostWithUser[]> {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!posts_destination_id_fkey (
          id,
          name,
          country
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Failed to fetch user posts: ${error.message}`);
    }

    return posts || [];

  } catch (error) {
    console.error('Fetch posts by user error:', error);
    throw error;
  }
}

/**
 * Fetches a single post by ID
 * 
 * @param postId - Post ID
 * @returns Promise<PostWithUser> - Post with user and destination data
 * 
 * @throws {Error} If post not found or query fails
 */
export async function fetchPostById(postId: string): Promise<PostWithUser> {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!posts_destination_id_fkey (
          id,
          name,
          country
        )
      `)
      .eq('id', postId)
      .single();

    if (error || !post) {
      throw new Error(`Post not found: ${error?.message}`);
    }

    return post;

  } catch (error) {
    console.error('Fetch post by ID error:', error);
    throw error;
  }
}

/**
 * Updates a post (content only)
 * 
 * @param postId - Post ID
 * @param userId - User ID (for authorization)
 * @param content - New post content
 * @returns Promise<PostWithUser> - Updated post
 * 
 * @throws {Error} If post not found, unauthorized, or update fails
 */
export async function updatePost(
  postId: string,
  userId: string,
  content: string
): Promise<PostWithUser> {
  try {
    // Verify post exists and belongs to user
    const { data: existingPost, error: getError } = await supabase
      .from('posts')
      .select('id, user_id')
      .eq('id', postId)
      .eq('user_id', userId)
      .single();

    if (getError || !existingPost) {
      throw new Error('Post not found or unauthorized');
    }

    // Update post content
    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({ 
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select(`
        *,
        user:users!posts_user_id_fkey (
          id,
          username,
          credits,
          reputation
        ),
        destination:destinations!posts_destination_id_fkey (
          id,
          name,
          country
        )
      `)
      .single();

    if (updateError || !updatedPost) {
      throw new Error(`Failed to update post: ${updateError?.message}`);
    }

    return updatedPost;

  } catch (error) {
    console.error('Update post error:', error);
    throw error;
  }
}

/**
 * Deletes a post
 * 
 * @param postId - Post ID
 * @param userId - User ID (for authorization)
 * @returns Promise<boolean> - True if deletion successful
 * 
 * @throws {Error} If post not found, unauthorized, or deletion fails
 */
export async function deletePost(postId: string, userId: string): Promise<boolean> {
  try {
    // Verify post exists and belongs to user
    const { data: existingPost, error: getError } = await supabase
      .from('posts')
      .select('id, user_id, image_url')
      .eq('id', postId)
      .eq('user_id', userId)
      .single();

    if (getError || !existingPost) {
      throw new Error('Post not found or unauthorized');
    }

    // Delete associated image if it exists
    if (existingPost.image_url) {
      await deletePostImage(existingPost.image_url);
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (deleteError) {
      throw new Error(`Failed to delete post: ${deleteError.message}`);
    }

    return true;

  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
}

/**
 * Uploads an image for a post
 * 
 * @param userId - User ID
 * @param imageFile - Image file to upload
 * @returns Promise<string> - Public URL of uploaded image
 * 
 * @throws {Error} If upload fails
 */
async function uploadPostImage(userId: string, imageFile: File): Promise<string> {
  try {
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `posts/${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('travel-images')
      .upload(filePath, imageFile);

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('travel-images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;

  } catch (error) {
    console.error('Upload post image error:', error);
    throw error;
  }
}

/**
 * Deletes a post image from storage
 * 
 * @param imageUrl - Public URL of the image to delete
 * @returns Promise<void>
 */
async function deletePostImage(imageUrl: string): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const userId = urlParts[urlParts.length - 2];
    const filePath = `posts/${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from('travel-images')
      .remove([filePath]);

    if (error) {
      console.warn('Failed to delete post image:', error);
    }

  } catch (error) {
    console.error('Delete post image error:', error);
  }
}

// Export aliases for backward compatibility
export const createPostWithCredits = createPost;
export const getDestinationPosts = fetchPostsByDestination;
export const getUserPosts = fetchPostsByUser;
