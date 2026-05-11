// Analytics Routes
// Handles analytics and progress reports

const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/analytics
 * Get analytics dashboard data (completed tasks, weekly productivity, study hours)
 */
router.get('/', getAnalytics);

module.exports = router;
