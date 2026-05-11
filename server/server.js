// Smart Study Planner Server
// Main application file

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const profileRoutes = require('./routes/profileRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware ====================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from Next.js build (production)
const publicPath = path.join(__dirname, '../client/public');
const staticPath = path.join(__dirname, '../client/.next/static');

try {
  // Serve public assets
  app.use(express.static(publicPath));
  
  // Serve static assets from Next.js
  app.use('/_next/static', express.static(staticPath));
} catch (e) {
  // Silently fail if files don't exist (development)
}

// ==================== Routes ====================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running'
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Task routes
app.use('/api/tasks', taskRoutes);

// Analytics routes
app.use('/api/analytics', analyticsRoutes);

// Profile routes
app.use('/api/profile', profileRoutes);

// Notifications routes
app.use('/api/notifications', notificationsRoutes);

// Serve Next.js pages (production - catch all routes)
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, serve Next.js index.html for client-side routing
    const indexPath = path.join(__dirname, '../client/.next/standalone/pages/_app.html');
    res.sendFile(path.join(__dirname, '../client/public/index.html'), (err) => {
      // If index.html doesn't exist, send 404
      if (err) {
        res.status(404).json({ error: 'Page not found' });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Route not found. In development, access frontend at http://localhost:3000'
    });
  }
});

// ==================== Error Handling ====================

// Global error handler
app.use(errorHandler);

// ==================== Server Startup ====================

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
