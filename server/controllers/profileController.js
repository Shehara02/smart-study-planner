// Profile Controller
// Handles user profile operations

const prisma = require('../config/database');
const { API_MESSAGES } = require('../config/constants');
const fs = require('fs');
const path = require('path');

/**
 * Get user profile
 * GET /api/profile
 */
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        bio: true,
        studyGoals: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Update user profile
 * PUT /api/profile
 */
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, studyGoals } = req.body;

    // Validate input
    if (name && name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot be empty'
      });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(bio !== undefined && { bio: bio ? bio.trim() : null }),
        ...(studyGoals !== undefined && { studyGoals: studyGoals ? studyGoals.trim() : null })
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        bio: true,
        studyGoals: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * Upload profile picture
 * POST /api/profile/picture
 * File should be sent as multipart/form-data with field name "profilePicture"
 */
const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // For now, store the file path as a simple reference
    // In production, you might want to use cloud storage like AWS S3
    const profilePictureUrl = `/uploads/profile-${userId}-${Date.now()}.jpg`;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profilePicture: profilePictureUrl
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        bio: true,
        studyGoals: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: user
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture
};
