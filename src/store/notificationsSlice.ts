import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState, Notification } from '../types';

const initialState: NotificationsState = {
  count: 0,
  items: [],
  isRead: true,
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Load notifications
    loadNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadNotificationsSuccess: (state, action: PayloadAction<{ notifications: Notification[]; count: number }>) => {
      state.loading = false;
      state.items = action.payload.notifications;
      state.count = action.payload.count;
      state.error = null;
    },
    loadNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add new notification (real-time)
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
      state.count += 1;
      state.isRead = false;
    },

    // Mark notification as read
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification && !notification.is_read) {
        notification.is_read = true;
        state.count = Math.max(0, state.count - 1);
      }
    },

    // Mark all notifications as read
    markAllAsRead: (state) => {
      state.items.forEach(notification => {
        notification.is_read = true;
      });
      state.count = 0;
      state.isRead = true;
    },

    // Remove notification
    removeNotification: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification && !notification.is_read) {
        state.count = Math.max(0, state.count - 1);
      }
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Clear all notifications
    clearAllNotifications: (state) => {
      state.items = [];
      state.count = 0;
      state.isRead = true;
    },

    // Update notification count (for polling)
    updateNotificationCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
      state.isRead = action.payload === 0;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadNotificationsStart,
  loadNotificationsSuccess,
  loadNotificationsFailure,
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  updateNotificationCount,
  clearError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;




