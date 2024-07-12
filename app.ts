import express from "express";
import http from "http";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

import taskRoutes from "./src/routers/taskRouter.ts";
import { subscribeClient } from "./src/utils/redisClient.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.use(express.json());
app.use("/api", taskRoutes);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", () => {
  console.log("A user connected");
});

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

subscribeClient.subscribe("task_notifications", (message) => {
  const notification = JSON.parse(message);
  io.emit("task_notifications", notification);
});

app.listen(port, async () => {
  console.log("Server is running on port:", port);
});
