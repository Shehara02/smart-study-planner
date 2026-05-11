// JWT utility functions
// Handles JWT token generation and verification

const jwt = require('jsonwebtoken');
const { JWT_CONFIG } = require('../config/constants');

/**
 * Generates a JWT token for a user
 * @param {object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  try {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn }
    );
    return token;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

/**
 * Verifies a JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token data
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_CONFIG.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
