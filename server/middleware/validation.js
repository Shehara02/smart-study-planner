// Input validation middleware
// Validates request data using express-validator

const { body, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for user registration
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Validation rules for user login
const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Validation rules for task creation
const validateTask = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('description').trim().optional({ checkFalsy: true }),
  body('priority')
    .optional({ checkFalsy: true })
    .isIn(['LOW', 'MEDIUM', 'HIGH'])
    .withMessage('Invalid priority level'),
  body('deadline')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Invalid date format'),
];

// Validation rules for task updates (all fields optional)
const validateTaskUpdate = [
  body('title').trim().optional({ checkFalsy: true }),
  body('description').trim().optional({ checkFalsy: true }),
  body('priority')
    .optional({ checkFalsy: true })
    .isIn(['LOW', 'MEDIUM', 'HIGH'])
    .withMessage('Invalid priority level'),
  body('deadline')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Invalid date format'),
  body('completed')
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage('Completed must be a boolean'),
];

module.exports = {
  handleValidationErrors,
  validateRegister,
  validateLogin,
  validateTask,
  validateTaskUpdate
};
