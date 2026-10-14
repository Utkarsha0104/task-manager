const mongoose = require('mongoose');
const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error fetching tasks' });
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error fetching task' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Please enter task title' });
    }

    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      dueDate: dueDate || null,
    };

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error creating task' });
  }
};

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const { title, description, status, dueDate } = req.body;

    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ message: 'Please enter task title' });
    }

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) existingTask.title = title.trim();
    if (description !== undefined) existingTask.description = description.trim();
    if (status !== undefined) existingTask.status = status;
    if (dueDate !== undefined) existingTask.dueDate = dueDate || null;

    const updatedTask = await existingTask.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Server Error updating task' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error deleting task' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
