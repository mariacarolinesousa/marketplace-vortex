import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adRoutes from "./routes/ad.routes.js";


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://marketplace-vortex-g7tw.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/ads", adRoutes);

export default app;