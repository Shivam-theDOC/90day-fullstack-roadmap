const taskService = require('../services/taskService');
const mongoose = require('mongoose');

const taskController = {
<<<<<<< HEAD
    // GET all tasks
=======
    // GET all tasks for the authenticated user
>>>>>>> 828ddaa (Added Login page)
    async getAllTasks(req, res) {
        try {
            // Check if MongoDB is connected
            const connectionState = mongoose.connection.readyState;
            if (connectionState !== 1) {
<<<<<<< HEAD
                return res.status(503).json({ 
=======
                return res.status(503).json({
>>>>>>> 828ddaa (Added Login page)
                    message: 'Database not connected. Please check MongoDB connection.',
                    error: 'MongoDB connection state: ' + connectionState
                });
            }

<<<<<<< HEAD
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (err) {
            console.error('❌ Error fetching tasks:', err);
            res.status(500).json({ 
=======
            const tasks = await taskService.getAllTasks(req.user.id);
            res.json(tasks);
        } catch (err) {
            console.error('❌ Error fetching tasks:', err);
            res.status(500).json({
>>>>>>> 828ddaa (Added Login page)
                message: err.message || 'Internal server error',
                error: 'Failed to fetch tasks from database'
            });
        }
    },

<<<<<<< HEAD
    // POST create task
    async createTask(req, res) {
        try {
            const newTask = await taskService.createTask(req.body);
=======
    // POST create task for the authenticated user
    async createTask(req, res) {
        try {
            const newTask = await taskService.createTask(req.user.id, req.body);
>>>>>>> 828ddaa (Added Login page)
            res.status(201).json(newTask);
        } catch (err) {
            console.error('Error creating task:', err);
            res.status(400).json({ message: err.message });
        }
    },

<<<<<<< HEAD
    // PUT update task
    async updateTask(req, res) {
        try {
            const updatedTask = await taskService.updateTask(req.params.id, req.body);
=======
    // PUT update task for the authenticated user
    async updateTask(req, res) {
        try {
            const updatedTask = await taskService.updateTask(req.user.id, req.params.id, req.body);
>>>>>>> 828ddaa (Added Login page)
            res.json(updatedTask);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

<<<<<<< HEAD
    // PATCH toggle completion
    async toggleCompletion(req, res) {
        try {
            const updatedTask = await taskService.toggleCompletion(req.params.id);
=======
    // PATCH toggle completion for the authenticated user
    async toggleCompletion(req, res) {
        try {
            const updatedTask = await taskService.toggleCompletion(req.user.id, req.params.id);
>>>>>>> 828ddaa (Added Login page)
            res.json(updatedTask);
        } catch (err) {
            console.error('Error toggling task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

<<<<<<< HEAD
    // PATCH toggle expanded
    async toggleExpanded(req, res) {
        try {
            const updatedTask = await taskService.toggleExpanded(req.params.id);
=======
    // PATCH toggle expanded for the authenticated user
    async toggleExpanded(req, res) {
        try {
            const updatedTask = await taskService.toggleExpanded(req.user.id, req.params.id);
>>>>>>> 828ddaa (Added Login page)
            res.json(updatedTask);
        } catch (err) {
            console.error('Error toggling expanded:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

<<<<<<< HEAD
    // DELETE task
    async deleteTask(req, res) {
        try {
            const result = await taskService.deleteTaskWithChildren(req.params.id);
=======
    // DELETE task for the authenticated user
    async deleteTask(req, res) {
        try {
            const result = await taskService.deleteTaskWithChildren(req.user.id, req.params.id);
>>>>>>> 828ddaa (Added Login page)
            res.json(result);
        } catch (err) {
            console.error('Error deleting task:', err);
            res.status(err.message === 'Task not found' ? 404 : 500).json({ message: err.message });
        }
    },

<<<<<<< HEAD
    // DELETE clear completed
    async clearCompleted(req, res) {
        try {
            const result = await taskService.clearCompleted();
=======
    // DELETE clear completed for the authenticated user
    async clearCompleted(req, res) {
        try {
            const result = await taskService.clearCompleted(req.user.id);
>>>>>>> 828ddaa (Added Login page)
            res.json(result);
        } catch (err) {
            console.error('Error clearing completed:', err);
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = taskController;
<<<<<<< HEAD

=======
>>>>>>> 828ddaa (Added Login page)
