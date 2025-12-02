const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null
    },
    isExpanded: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Compound index for efficient user-specific queries
taskSchema.index({ userId: 1, order: 1 });
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
