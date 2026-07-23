import { Router } from "express";
import authRoutes from "./auth.routes";
import adRoutes from "./ad.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/ads", adRoutes);
router.use("/auth", authRoutes);
router.get("/", (req, res) => {
  res.json({
    message: "API ReCampus funcionando!"
  });
});

export default router;