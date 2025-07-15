import express from "express";
import {
  createTask,
  getAllTasks,
  getTasksByUser,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);                       // Admin assigns task
router.get("/", getAllTasks);                       // Admin views all
router.get("/user/:userId", getTasksByUser);        // User views own
router.put("/:id/status", updateTaskStatus);        // User updates status
router.put("/:id", updateTask);                     // Admin edits
router.delete("/:id", deleteTask);                  // Admin deletes

export default router;
