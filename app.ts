import express from "express";
import taskRoutes from "./src/routers/taskRouter.ts";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", taskRoutes);

app.listen(port, async () => {
  console.log("Server is running on port:", port);
});

export default app;
