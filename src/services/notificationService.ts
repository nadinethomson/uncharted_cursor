import { supabase } from './supabase';
import { Notification } from '../types';

/**
 * Service for handling notification operations
 * This service manages user notifications without any business logic
 * 
 * CRITICAL: No credit logic here - notifications are independent of credit operations
 * This ensures clean separation of concerns
 */

export interface CreateNotificationData {
  userId: string;
  type: string;
  message: string;
  relatedId?: string;
}

export interface NotificationWithCount {
  notifications: Notification[];
  unreadCount: number;
}

/**
 * Fetches notifications for a user
 * 
 * @param userId - User ID
 * @param limit - Maximum number of notifications to return
 * @param unreadOnly - If true, only return unread notifications
 * @returns Promise<NotificationWithCount> - Notifications with unread count
 * 
 * @throws {Error} If query fails
 */
export async function fetchNotifications(
  userId: string,
  limit: number = 20,
  unreadOnly: boolean = false
): Promise<NotificationWithCount> {
  try {
    // Build query
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Add unread filter if requested
    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    // Get unread count
    const { data: unreadData, error: countError } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (countError) {
      console.warn('Failed to get unread count:', countError);
    }

    return {
      notifications: notifications || [],
      unreadCount: unreadData?.length || 0
    };

  } catch (error) {
    console.error('Fetch notifications error:', error);
    throw error;
  }
}

/**
 * Marks a notification as read
 * 
 * @param notificationId - Notification ID
 * @param userId - User ID (for authorization)
 * @returns Promise<boolean> - True if successful
 * 
 * @throws {Error} If notification not found, unauthorized, or update fails
 */
export async function markAsRead(
  notificationId: string,
  userId: string
): Promise<boolean> {
  try {
    // Verify notification exists and belongs to user
    const { data: existingNotification, error: getError } = await supabase
      .from('notifications')
      .select('id, user_id, is_read')
      .eq('id', notificationId)
      .eq('user_id', userId)
      .single();

    if (getError || !existingNotification) {
      throw new Error('Notification not found or unauthorized');
    }

    // Skip if already read
    if (existingNotification.is_read) {
      return true;
    }

    // Mark as read
    const { error: updateError } = await supabase
      .from('notifications')
      .update({ 
        is_read: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', notificationId);

    if (updateError) {
      throw new Error(`Failed to mark notification as read: ${updateError.message}`);
    }

    return true;

  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
}

/**
 * Marks all notifications as read for a user
 * 
 * @param userId - User ID
 * @returns Promise<number> - Number of notifications marked as read
 * 
 * @throws {Error} If update fails
 */
export async function markAllAsRead(userId: string): Promise<number> {
  try {
    // Get count of unread notifications first
    const { data: unreadData, error: countError } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (countError) {
      throw new Error(`Failed to get unread count: ${countError.message}`);
    }

    const unreadCount = unreadData?.length || 0;

    if (unreadCount === 0) {
      return 0; // No unread notifications
    }

    // Mark all as read
    const { error: updateError } = await supabase
      .from('notifications')
      .update({ 
        is_read: true,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (updateError) {
      throw new Error(`Failed to mark all notifications as read: ${updateError.message}`);
    }

    return unreadCount;

  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    throw error;
  }
}

/**
 * Creates a new notification
 * 
 * @param notificationData - Notification creation data
 * @returns Promise<Notification> - Created notification
 * 
 * @throws {Error} If creation fails
 */
export async function createNotification(
  notificationData: CreateNotificationData
): Promise<Notification> {
  try {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: notificationData.userId,
        type: notificationData.type,
        message: notificationData.message,
        related_id: notificationData.relatedId || null,
        is_read: false
      })
      .select()
      .single();

    if (error || !notification) {
      throw new Error(`Failed to create notification: ${error?.message}`);
    }

    return notification;

  } catch (error) {
    console.error('Create notification error:', error);
    throw error;
  }
}

/**
 * Deletes a notification
 * 
 * @param notificationId - Notification ID
 * @param userId - User ID (for authorization)
 * @returns Promise<boolean> - True if deletion successful
 * 
 * @throws {Error} If notification not found, unauthorized, or deletion fails
 */
export async function deleteNotification(
  notificationId: string,
  userId: string
): Promise<boolean> {
  try {
    // Verify notification exists and belongs to user
    const { data: existingNotification, error: getError } = await supabase
      .from('notifications')
      .select('id, user_id')
      .eq('id', notificationId)
      .eq('user_id', userId)
      .single();

    if (getError || !existingNotification) {
      throw new Error('Notification not found or unauthorized');
    }

    // Delete the notification
    const { error: deleteError } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (deleteError) {
      throw new Error(`Failed to delete notification: ${deleteError.message}`);
    }

    return true;

  } catch (error) {
    console.error('Delete notification error:', error);
    throw error;
  }
}

/**
 * Gets unread notification count for a user
 * 
 * @param userId - User ID
 * @returns Promise<number> - Number of unread notifications
 * 
 * @throws {Error} If query fails
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const { data: unreadData, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      throw new Error(`Failed to get unread count: ${error.message}`);
    }

    return unreadData?.length || 0;

  } catch (error) {
    console.error('Get unread count error:', error);
    throw error;
  }
}

/**
 * Creates a notification for Ask a Local answer
 * This is a convenience function for the most common notification type
 * 
 * @param userId - User ID to notify
 * @param questionId - Ask a Local question ID
 * @param destinationName - Destination name for the message
 * @returns Promise<Notification> - Created notification
 * 
 * @throws {Error} If creation fails
 */
export async function createAskAnsweredNotification(
  userId: string,
  questionId: string,
  destinationName: string
): Promise<Notification> {
  try {
    return await createNotification({
      userId,
      type: 'ask_answered',
      message: `A local answered your question about ${destinationName}`,
      relatedId: questionId
    });

  } catch (error) {
    console.error('Create ask answered notification error:', error);
    throw error;
  }
}

/**
 * Creates a notification for new post on saved destination
 * This is a convenience function for destination-related notifications
 * 
 * @param userId - User ID to notify
 * @param destinationId - Destination ID
 * @param destinationName - Destination name for the message
 * @param postType - Type of post (tip, review, experience)
 * @returns Promise<Notification> - Created notification
 * 
 * @throws {Error} If creation fails
 */
export async function createNewPostNotification(
  userId: string,
  destinationId: string,
  destinationName: string,
  postType: string
): Promise<Notification> {
  try {
    const typeLabels: Record<string, string> = {
      'tip': 'tip',
      'review': 'review',
      'experience': 'experience'
    };

    const typeLabel = typeLabels[postType] || 'post';

    return await createNotification({
      userId,
      type: 'new_post',
      message: `New ${typeLabel} shared for ${destinationName}`,
      relatedId: destinationId
    });

  } catch (error) {
    console.error('Create new post notification error:', error);
    throw error;
  }
}





