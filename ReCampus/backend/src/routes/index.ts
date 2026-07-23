import { Router } from "express";
import authRoutes from "./auth.routes";
import adRoutes from "./ad.routes"
const router = Router();

router.use("/ads", adRoutes);
router.use("/auth", authRoutes);
router.get("/", (req, res) => {
  res.json({
    message: "API ReCampus funcionando!"
  });
});

export default router;