// Error handling middleware
// Centralized error handling for the application

/**
 * Middleware to handle errors
 * Sends consistent error responses to the client
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { error: err.stack })
  });
};

module.exports = { errorHandler };
