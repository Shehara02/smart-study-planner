import React, { useState, useEffect } from 'react';
import { notificationsAPI } from '../services/api';
import { AlertCircle, Clock, CheckCircle, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsAPI.getNotifications();
      setNotifications(response.data.data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const getNotificationIcon = (type) => {
    if (type === 'overdue') {
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    } else if (type === 'today') {
      return <Clock className="w-6 h-6 text-yellow-500" />;
    } else {
      return <CheckCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    if (type === 'overdue') {
      return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900';
    } else if (type === 'today') {
      return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900';
    } else {
      return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900';
    }
  };

  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filterType);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Notifications</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {notifications.length}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-red-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Overdue Tasks</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {notifications.filter(n => n.type === 'overdue').length}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Due Today</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {notifications.filter(n => n.type === 'today').length}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-blue-500">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Upcoming</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {notifications.filter(n => n.type === 'upcoming').length}
          </h3>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-white">Filter by Type:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('overdue')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'overdue'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Overdue ({notifications.filter(n => n.type === 'overdue').length})
          </button>
          <button
            onClick={() => setFilterType('today')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'today'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Due Today ({notifications.filter(n => n.type === 'today').length})
          </button>
          <button
            onClick={() => setFilterType('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Upcoming ({notifications.filter(n => n.type === 'upcoming').length})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filterType === 'all'
                ? 'No notifications'
                : `No ${filterType} notifications`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`${getNotificationColor(
                notification.type
              )} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {notification.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      notification.priority === 'HIGH'
                        ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                        : notification.priority === 'MEDIUM'
                        ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                        : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    }`}>
                      {notification.priority} Priority
                    </span>

                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Deadline: {new Date(notification.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>

                    {notification.type !== 'upcoming' && (
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {notification.type === 'overdue'
                          ? `${Math.abs(notification.daysDiff)} days overdue`
                          : 'Due today'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State Helper */}
      {notifications.length === 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            ✨ All Caught Up!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            No tasks with deadlines. Keep up the great work!
          </p>
        </div>
      )}
    </div>
  );
}
