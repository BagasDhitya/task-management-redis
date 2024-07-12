import { redisClient, pubSubClient } from "../utils/redisClient.ts";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
  dateCreated: Date;
}

const generateId = () => {
  return uuidv4();
};

export const createTask = async (title: string, description: string) => {
  const id = generateId();
  const dateCreated = new Date();
  const data: Task = {
    id,
    title,
    description,
    dateCreated,
  };
  const serializedData = JSON.stringify(data);

  await redisClient.hSet("tasks", id, serializedData);
  await pubSubClient.publish("task_notifications", JSON.stringify(data));

  return data;
};

export const getTaskById = async (id: string) => {
  const task = await redisClient.hGet("tasks", id);
  if (!task) {
    return null;
  }
  return JSON.parse(task);
};

export const getAllTasks = async () => {
  const tasks = await redisClient.hGetAll("tasks");
  return Object.values(tasks).map((task) => JSON.parse(task));
};

export const updateTask = async (
  id: string,
  title: string,
  description: string
) => {
  const task = await getTaskById(id);
  if (!task) {
    return null;
  }
  task.title = title;
  task.description = description;
  await redisClient.hSet("tasks", id, JSON.stringify(task));
  return task;
};

export const deleteTask = async (id: string) => {
  const result = await redisClient.hDel("tasks", id);
  if (result === 0) {
    return false;
  }

  return true;
};
