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
