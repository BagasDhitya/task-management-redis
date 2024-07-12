import { Router } from "express";
import {
  createTaskHandler,
  getAllTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/taskController.ts";

const router = Router();

router.post("/tasks", createTaskHandler);
router.get("/tasks/:id", getTaskByIdHandler);
router.get("/tasks", getAllTasksHandler);
router.put("/tasks/:id", updateTaskHandler);
router.delete("/tasks/:id", deleteTaskHandler);

export default router;
