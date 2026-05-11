// Application constants

const TASK_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

const TASK_PRIORITY_VALUES = Object.values(TASK_PRIORITIES);

const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  expiresIn: process.env.JWT_EXPIRE || '7d'
};

const API_MESSAGES = {
  // Success messages
  USER_CREATED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  TASK_CREATED: 'Task created successfully',
  TASK_UPDATED: 'Task updated successfully',
  TASK_DELETED: 'Task deleted successfully',
  TASK_COMPLETED: 'Task marked as completed',
  
  // Error messages
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  TASK_NOT_FOUND: 'Task not found',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_INPUT: 'Invalid input data',
  SERVER_ERROR: 'Internal server error'
};

module.exports = {
  TASK_PRIORITIES,
  TASK_PRIORITY_VALUES,
  JWT_CONFIG,
  API_MESSAGES
};
