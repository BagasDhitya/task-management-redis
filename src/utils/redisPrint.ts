import { redisClient } from "./redisClient.ts";

export const printValues = async () => {
  try {
    const value = await redisClient.hGetAll("tasks");
    console.log("Values from Redis:", value);
    return JSON.stringify(value);
  } catch (error) {
    console.error("Error fetching values from Redis:", error);
    return null;
  }
};
