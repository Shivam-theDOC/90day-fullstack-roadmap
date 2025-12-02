const Task = require('../models/Task');
const transformTask = require('../utils/transformTask');

const taskService = {
    // Get all tasks for a specific user
    async getAllTasks(userId) {
        const tasks = await Task.find({ userId }).sort({ order: 1, createdAt: 1 });
        return tasks.map(transformTask);
    },

    // Create a new task for a user
    async createTask(userId, taskData) {
        const newTask = await Task.create({
            userId,
            text: taskData.text,
            parentId: taskData.parentId || null,
            isExpanded: taskData.isExpanded || false,
            completed: false
        });
        return transformTask(newTask);
    },

    // Update a task (with user verification)
    async updateTask(userId, taskId, updates) {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) throw new Error('Task not found');

        Object.assign(task, updates);
        const updatedTask = await task.save();
        return transformTask(updatedTask);
    },

    // Toggle task completion
    async toggleCompletion(userId, taskId) {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) throw new Error('Task not found');
        task.completed = !task.completed;
        const updatedTask = await task.save();
        return transformTask(updatedTask);
    },

    // Toggle task expanded state
    async toggleExpanded(userId, taskId) {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) throw new Error('Task not found');
        task.isExpanded = !task.isExpanded;
        const updatedTask = await task.save();
        return transformTask(updatedTask);
    },

    // Delete task and all children (with user verification)
    async deleteTaskWithChildren(userId, taskId) {
        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) throw new Error('Task not found');

        const deleteRecursive = async (id) => {
            const children = await Task.find({ parentId: id, userId });
            for (const child of children) {
                await deleteRecursive(child._id);
            }
            await Task.findByIdAndDelete(id);
        };

        await deleteRecursive(task._id);
        return { message: 'Task and children deleted' };
    },

    // Clear all completed tasks for a user
    async clearCompleted(userId) {
        await Task.deleteMany({ userId, completed: true });
        return { message: 'Completed tasks deleted' };
    }
};

module.exports = taskService;
