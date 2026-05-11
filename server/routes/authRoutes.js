// Auth Routes
// Handles user registration and login endpoints

const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', validateRegister, handleValidationErrors, register);

/**
 * POST /api/auth/login
 * Login user and get JWT token
 */
router.post('/login', validateLogin, handleValidationErrors, login);

module.exports = router;
