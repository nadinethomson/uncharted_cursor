import { useCallback, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { 
  fetchNotifications, 
  markAsRead, 
  markAllAsRead, 
  getUnreadCount,
  createAskAnsweredNotification,
  createNewPostNotification
} from '../services/notificationService';
import { Notification } from '../types';

/**
 * Custom hook for notification management
 * Handles fetching, marking as read, and real-time updates
 */
export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications for the current user
  const loadNotifications = useCallback(async (limit: number = 20) => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchNotifications(user.id, limit);
      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    } catch (err: any) {
      console.error('Error loading notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark a notification as read
  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    if (!user) return false;

    try {
      const success = await markAsRead(notificationId, user.id);
      if (success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, is_read: true }
              : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      return success;
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      return false;
    }
  }, [user]);

  // Mark all notifications as read
  const markAllNotificationsAsRead = useCallback(async () => {
    if (!user) return false;

    try {
      const count = await markAllAsRead(user.id);
      if (count > 0) {
        // Update local state
        setNotifications(prev => 
          prev.map(notification => ({ ...notification, is_read: true }))
        );
        setUnreadCount(0);
      }
      return count > 0;
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      return false;
    }
  }, [user]);

  // Get unread count only
  const refreshUnreadCount = useCallback(async () => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    try {
      const count = await getUnreadCount(user.id);
      setUnreadCount(count);
    } catch (err: any) {
      console.error('Error refreshing unread count:', err);
    }
  }, [user]);

  // Create notification for Ask a Local answer
  const notifyAskAnswered = useCallback(async (
    userId: string, 
    questionId: string, 
    destinationName: string
  ) => {
    try {
      await createAskAnsweredNotification(userId, questionId, destinationName);
    } catch (err: any) {
      console.error('Error creating ask answered notification:', err);
    }
  }, []);

  // Create notification for new post on saved destination
  const notifyNewPost = useCallback(async (
    userId: string,
    destinationId: string,
    destinationName: string,
    postType: string
  ) => {
    try {
      await createNewPostNotification(userId, destinationId, destinationName, postType);
    } catch (err: any) {
      console.error('Error creating new post notification:', err);
    }
  }, []);

  // Load notifications on mount and when user changes
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      refreshUnreadCount();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user, refreshUnreadCount]);

  return {
    // State
    notifications,
    unreadCount,
    loading,
    error,
    
    // Actions
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    refreshUnreadCount,
    notifyAskAnswered,
    notifyNewPost,
    
    // Utilities
    clearError: () => setError(null)
  };
}

