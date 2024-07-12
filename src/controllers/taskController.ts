import { Request, Response } from "express";
import { createTask } from "../services/taskService.ts";
import { printValues } from "../utils/redisPrint.ts";

export const createTaskHandler = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const response = await createTask(title, description);
    // await printValues();
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
