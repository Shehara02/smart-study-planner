// Auth Controller
// Handles user registration and login

const prisma = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const { API_MESSAGES } = require('../config/constants');

/**
 * User Registration Controller
 * POST /api/auth/register
 * Creates a new user account
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: API_MESSAGES.EMAIL_EXISTS
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.USER_CREATED,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

/**
 * User Login Controller
 * POST /api/auth/login
 * Authenticates user credentials and returns token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: API_MESSAGES.INVALID_CREDENTIALS
      });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: API_MESSAGES.INVALID_CREDENTIALS
      });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: API_MESSAGES.LOGIN_SUCCESS,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.SERVER_ERROR
    });
  }
};

module.exports = {
  register,
  login
};
