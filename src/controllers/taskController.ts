import { Request, Response } from "express";
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../services/taskService.ts";
import { printValues } from "../utils/redisPrint.ts";

export const createTaskHandler = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const response = await createTask(title, description);
    await printValues();
    res.status(201).send({
      message: "Task created successfully",
      data: response,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }
    res.status(200).send({
      message: "Successfully get task by id",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const getAllTasksHandler = async (req: Request, res: Response) => {
  try {
    const task = await getAllTasks();
    res.status(201).send({
      message: "Successfully get all tasks",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await updateTask(id, title, description);

    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }

    res.status(201).send({
      message: "Successfully updated task",
      data: task,
    });
  } catch (error: any) {
    res.status(500).send({
      error: "Failed to update task",
    });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await deleteTask(id);

    if (!success) {
      return res.status(404).send({
        error: "Task not found",
      });
    }

    res.status(204).send({
      message: "Successfully deleted task",
    });
  } catch (error: any) {
    res.status(500).send({
      error: "Failed to delete task",
    });
  }
};
