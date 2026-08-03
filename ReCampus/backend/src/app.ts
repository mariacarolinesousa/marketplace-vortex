import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adRoutes from "./routes/ad.routes.js";
import userRoutes from "./routes/user.routes.js";


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
app.use("/auth", authRoutes);
app.use("/ads", adRoutes);
app.use("/users", userRoutes);
app.get("/", (_req, res) => {
  return res.status(200).json({
    status: "online",
    message: "Backend do Marketplace Vortex funcionando",
  });
});
app.use(cors());

app.use(express.json());

app.use("/users", userRoutes)
app.use("/auth", authRoutes);
app.use("/ads", adRoutes);

export default app;