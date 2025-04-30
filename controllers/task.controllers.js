import { config } from "dotenv";
import Task from '../schema/task.schema.js';

config();

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, duedate } = req.body;
    console.log(req.body);
    console.log(req.user.id);

    const task = new Task({
      title,
      description,
      duedate,
      user: req.user.id, 
    });

    const savedTask = await task.save();
    res.status(200).json({ task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate ,status } = req.body;
    const { id } = req.params;

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (dueDate) updatedFields.dueDate = dueDate;
    if (status) updatedFields.status = status;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, 
      { $set: updatedFields },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id }); 

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
