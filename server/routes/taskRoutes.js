// Task Routes
// Handles task CRUD operations

const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');
const { validateTask, validateTaskUpdate, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/tasks
 * Get all tasks for the authenticated user
 */
router.get('/', getTasks);

/**
 * GET /api/tasks/stats
 * Get task statistics for dashboard
 */
router.get('/stats', getTaskStats);

/**
 * GET /api/tasks/:id
 * Get a specific task by ID
 */
router.get('/:id', getTaskById);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', validateTask, handleValidationErrors, createTask);

/**
 * PUT /api/tasks/:id
 * Update a task
 */
router.put('/:id', validateTaskUpdate, handleValidationErrors, updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', deleteTask);

module.exports = router;
