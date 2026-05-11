// Notifications Routes
// Handles notification and reminder endpoints

const express = require('express');
const { getNotifications } = require('../controllers/notificationsController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/notifications
 * Get notifications for authenticated user (upcoming deadlines, overdue tasks)
 */
router.get('/', getNotifications);

module.exports = router;
