// Profile Routes
// Handles user profile operations

const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture
} = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * GET /api/profile
 * Get authenticated user's profile
 */
router.get('/', getUserProfile);

/**
 * PUT /api/profile
 * Update user profile (name, bio, studyGoals)
 */
router.put('/', updateUserProfile);

/**
 * POST /api/profile/picture
 * Upload profile picture
 */
router.post('/picture', uploadProfilePicture);

module.exports = router;
