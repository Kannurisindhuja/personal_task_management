const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user._id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Task not found" });
    }

    delete req.body.user; // prevent ownership change

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
