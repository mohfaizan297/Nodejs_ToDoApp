const { error, success } = require("../Utils/responseWrapper");
const Task = require("../models/Task");

const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.send(error(403, "Title and description are required"));
    await Task.create({
      title,
      description,
      user: req.user,
    });
    return res.send(success(201, "Task added successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    if (!tasks) return res.send(error(403, "You did not create any task"));
    return res.send(success(200, { tasks }));
  } catch (e) {
    return res.send(success(500, e.message));
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params; //because dynamic rout is :id
    const task = await Task.findById(id);
    if (!task) return res.send(error(404, "Task not found"));
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.send(success(200, "Task updated"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; //because dynamic rout is :id
    const task = await Task.findById(id);
    if (!task) return res.send(error(404, "Task not found"));
    await task.deleteOne();
    return res.send(success(200, "task deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  newTask,
  getMyTasks,
  updateTask,
  deleteTask,
};
