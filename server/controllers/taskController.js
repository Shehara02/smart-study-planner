// Task Controller
// Handles task CRUD operations

const prisma = require('../config/database');
const { API_MESSAGES } = require('../config/constants');

/**
 * Get all tasks for the authenticated user
 * GET /api/tasks
 */
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Get a single task by ID
 * GET /api/tasks/:id
 */
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: API_MESSAGES.TASK_NOT_FOUND
      });
    }

    // Verify task belongs to user
    if (task.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: API_MESSAGES.UNAUTHORIZED
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Create a new task
 * POST /api/tasks
 */
const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline } = req.body;
    const userId = req.user.id;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        deadline: deadline ? new Date(deadline) : null,
        userId
      }
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.TASK_CREATED,
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Update a task
 * PUT /api/tasks/:id
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, deadline, completed } = req.body;
    const userId = req.user.id;

    // Find task
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: API_MESSAGES.TASK_NOT_FOUND
      });
    }

    // Verify task belongs to user
    if (task.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: API_MESSAGES.UNAUTHORIZED
      });
    }

    // Update task
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(deadline && { deadline: new Date(deadline) }),
        ...(completed !== undefined && { completed })
      }
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.TASK_UPDATED,
      data: updatedTask
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Delete a task
 * DELETE /api/tasks/:id
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find task
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: API_MESSAGES.TASK_NOT_FOUND
      });
    }

    // Verify task belongs to user
    if (task.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: API_MESSAGES.UNAUTHORIZED
      });
    }

    // Delete task
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.TASK_DELETED
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Get user dashboard statistics
 * GET /api/tasks/stats
 */
const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalTasks = await prisma.task.count({
      where: { userId }
    });

    const completedTasks = await prisma.task.count({
      where: { userId, completed: true }
    });

    const pendingTasks = totalTasks - completedTasks;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};
