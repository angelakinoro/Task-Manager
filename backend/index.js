import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initModels } from "./models/index.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Just for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await initModels(); // connect and sync db
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
