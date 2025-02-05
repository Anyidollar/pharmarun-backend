import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import authRoutes from "./routes/auth.routes";
// import orderRoutes from "./routes/order.routes";
import { database } from "./configs/database";
import defineAssociations from "./models/associations";
// import { authMiddleware } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
defineAssociations();

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Test route to verify server is running
app.get("/", (req: Request, res: Response): void => {
  res.send("Pharmarun API is running.");
});

// Sync database before starting server (force: false in production)
database
  .sync({})
  .then(() => console.log("Database connected successfully"))
  .catch((err: any) => console.error("Database sync error:", err));


export default app;
