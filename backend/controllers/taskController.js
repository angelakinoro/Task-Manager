// controllers/taskController.js
import { Task, User } from "../models/index.js";
import { sendTaskAssignmentEmail } from "../utils/mailer.js";


// Create new task
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "Assigned user not found" });

    const task = await Task.create({ title, description, deadline, user_id });

    // Send email notification
    await sendTaskAssignmentEmail(user.email, title, deadline);


    res.status(201).json({ message: "Task created and email sent", task });
  } catch (err) {
    res.status(500).json({ message: "Could not create task", error: err.message });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: { model: User, attributes: ["id", "name", "email"] }
  });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch tasks", error: err.message });
  }
};

// Get tasks assigned to a specific user
export const getTasksByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.findAll({ where: { user_id: userId } });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { status } = req.body;
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};

// Edit task (optional)
export const updateTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;

    await task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    console.log("🔍 Deleting task with ID:", req.params.id);

    const task = await Task.findByPk(req.params.id);

    if (!task) {
      console.log("❌ Task not found");
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    console.log("✅ Task deleted");
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("❌ Delete failed:", err.message);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
