import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { Notification } from '../../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useNotifications();

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
    }
    
    // Navigate to related destination if available
    if (notification.related_id) {
      window.location.href = `/destination/${notification.related_id}`;
    }
    
    onClose();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
  };

  const formatNotificationTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ask_answered':
        return '💬';
      case 'new_post':
        return '📝';
      default:
        return '🔔';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={onClose}
        aria-label="Close notifications"
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-full bg-white shadow-xl sm:max-w-sm">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔔</span>
              <h2 className="text-lg font-semibold text-deep-forest">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-sandstone hover:text-sandstone-dark font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl"
                aria-label="Close notifications"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sandstone"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications yet
                </h3>
                <p className="text-gray-500 text-center">
                  When locals answer your questions or new posts are shared on your saved destinations, you'll see them here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200 ${
                      !notification.is_read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-lg">
                          {getNotificationIcon(notification.type)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${
                          !notification.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatNotificationTime(notification.created_at)}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={() => {
                  // Navigate to profile or notifications page
                  window.location.href = '/profile';
                }}
                className="w-full text-center text-sm text-sandstone hover:text-sandstone-dark font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
