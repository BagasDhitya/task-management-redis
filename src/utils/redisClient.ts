import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  url: "redis://localhost:6379",
});

const pubSubClient: RedisClientType = createClient({
  url: "redis://localhost:6379",
});

const subscribeClient: RedisClientType = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis client error:", err);
});

pubSubClient.on("error", (err) => {
  console.error("Publish client error:", err);
});

subscribeClient.on("error", (err) => {
  console.error("Subscribe client error:", err);
});

(async () => {
  await redisClient.connect();
  await pubSubClient.connect();
  await subscribeClient.connect();
})();

export { redisClient, pubSubClient, subscribeClient };
