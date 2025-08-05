import TaskSchema from "../models/tasks.js"
import express from "express"
import User from "../models/User.js"

const TaskRoutes = express.Router()

TaskRoutes.get("/tasks", async (req, res) => {
  try {
    const userId = req.query.user; // Get the user ID from the URL query
    const tasks = await TaskSchema.find({ userId }); // Find tasks that belong to that user
    res.json(tasks); // Send those tasks to the frontend
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});


TaskRoutes.post("/AddTask", async (req, res) => {
  try {
    const { task, userId } = req.body;

    // Validate
    if (!task || !userId) {
      return res.status(400).json({ message: "task and userId are required" });
    }
    // ✅ Check that the userId exists in the database
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User does not exist ❌" });
    }
    // Save task with userId included
    const NewTask = new TaskSchema({ task, userId });
    const SavedTask = await NewTask.save();
    res.status(201).json(SavedTask);
  } catch (err) {
    console.error("Task creation error:", err.message);  // for debugging
    res.status(400).json({ message: "Error creating task 🤔" });
  }
});


TaskRoutes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskSchema.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// in Express router
TaskRoutes.patch("/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const updated = await TaskSchema.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


export default TaskRoutes