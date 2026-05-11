// API Service
// Handles all API requests to the backend

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Auth API ====================

export const authAPI = {
  /**
   * Register a new user
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * Login user
   */
  login: (data) => api.post('/auth/login', data),
};

// ==================== Task API ====================

export const taskAPI = {
  /**
   * Get all tasks
   */
  getTasks: () => api.get('/tasks'),

  /**
   * Get task by ID
   */
  getTaskById: (id) => api.get(`/tasks/${id}`),

  /**
   * Create a new task
   */
  createTask: (data) => api.post('/tasks', data),

  /**
   * Update a task
   */
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),

  /**
   * Delete a task
   */
  deleteTask: (id) => api.delete(`/tasks/${id}`),

  /**
   * Get task statistics
   */
  getStats: () => api.get('/tasks/stats'),
};

// ==================== Analytics API ====================

export const analyticsAPI = {
  /**
   * Get analytics data (completed tasks, weekly productivity, study hours)
   */
  getAnalytics: () => api.get('/analytics'),
};

// ==================== Profile API ====================

export const profileAPI = {
  /**
   * Get user profile
   */
  getProfile: () => api.get('/profile'),

  /**
   * Update user profile (name, bio, studyGoals)
   */
  updateProfile: (data) => api.put('/profile', data),

  /**
   * Upload profile picture
   */
  uploadProfilePicture: (formData) => api.post('/profile/picture', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// ==================== Notifications API ====================

export const notificationsAPI = {
  /**
   * Get notifications (upcoming deadlines, overdue tasks)
   */
  getNotifications: () => api.get('/notifications'),
};

export default api;
