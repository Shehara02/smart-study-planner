// Authentication middleware
// Verifies JWT tokens and protects routes

const jwt = require('jsonwebtoken');
const { JWT_CONFIG, API_MESSAGES } = require('../config/constants');

/**
 * Middleware to verify JWT token
 * Checks if the token is valid and extracts user information
 */
const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: API_MESSAGES.UNAUTHORIZED
      });
    }

    // Verify token
    jwt.verify(token, JWT_CONFIG.secret, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: API_MESSAGES.UNAUTHORIZED
        });
      }

      // Attach user info to request object
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = { authenticateToken };
