const Task = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const newTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getSingleTask,
  getTasks,
  deleteTask,
  updateTask,
  newTask,
};
