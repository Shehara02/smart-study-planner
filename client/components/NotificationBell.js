import React, { useState, useEffect } from 'react';
import { notificationsAPI } from '../services/api';
import { AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    // Refresh notifications every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsAPI.getNotifications();
      setNotifications(response.data.data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    if (type === 'overdue') {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    } else if (type === 'today') {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    } else {
      return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    if (type === 'overdue') {
      return 'bg-red-50 dark:bg-red-900 border-l-4 border-red-500';
    } else if (type === 'today') {
      return 'bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500';
    } else {
      return 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500';
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y dark:divide-gray-700">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {loading ? 'Loading notifications...' : 'No notifications'}
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${getNotificationColor(
                    notification.type
                  )} hover:bg-opacity-75 dark:hover:bg-opacity-75 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          notification.priority === 'HIGH'
                            ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                            : notification.priority === 'MEDIUM'
                            ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                            : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                        }`}>
                          {notification.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700 text-center">
              <a
                href="/notifications"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View All Notifications
              </a>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
