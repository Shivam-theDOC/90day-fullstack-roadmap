const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
<<<<<<< HEAD
const { authenticateAdmin } = require('../middleware/auth');

// Public routes (read-only)
router.get('/', taskController.getAllTasks);

// Admin-only routes (write operations)
router.post('/', authenticateAdmin, taskController.createTask);
router.put('/:id', authenticateAdmin, taskController.updateTask);
router.delete('/:id', authenticateAdmin, taskController.deleteTask);
router.delete('/action/clear-completed', authenticateAdmin, taskController.clearCompleted);

// Public routes (anyone can toggle/expand)
router.patch('/:id/toggle', taskController.toggleCompletion);
router.patch('/:id/expand', taskController.toggleExpanded);

module.exports = router;

=======

// All routes are protected by authMiddleware in index.js
// Users can manage their own tasks

// Get all tasks for the authenticated user
router.get('/', taskController.getAllTasks);

// Create a new task
router.post('/', taskController.createTask);

// Update a task
router.put('/:id', taskController.updateTask);

// Delete a task
router.delete('/:id', taskController.deleteTask);

// Clear completed tasks
router.delete('/action/clear-completed', taskController.clearCompleted);

// Toggle task completion
router.patch('/:id/toggle', taskController.toggleCompletion);

// Toggle task expanded state
router.patch('/:id/expand', taskController.toggleExpanded);

module.exports = router;
>>>>>>> 828ddaa (Added Login page)
