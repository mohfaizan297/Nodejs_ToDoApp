const Task = require("../models/Task");

const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(403).json({
        success: false,
        message: "Title and description are required",
      });
    await Task.create({
      title,
      description,
      user: req.user,
    });
    return res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    if (!tasks)
      return res.status(403).json({
        success: false,
        message: "You did not create any task",
      });
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; //because dynamic rout is :id
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; //because dynamic rout is :id
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = {
  newTask,
  getMyTasks,
  updateTask,
  deleteTask,
};
