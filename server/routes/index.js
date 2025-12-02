const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
<<<<<<< HEAD
const adminRoutes = require('./adminRoutes');

// Mount routes
router.use('/tasks', taskRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

=======
const authRoutes = require('./auth');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.use('/auth', authRoutes);

// Protected routes - require authentication
router.use('/tasks', authMiddleware, taskRoutes);

module.exports = router;
>>>>>>> 828ddaa (Added Login page)
