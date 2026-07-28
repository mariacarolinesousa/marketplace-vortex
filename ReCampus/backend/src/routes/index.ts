import { Router, type Request, type Response } from "express";
import authRoutes from "./auth.routes";
import adRoutes from "./ad.routes";
import userRoutes  from "./user.routes";
import favoriteRoutes from "./favorite.routes";
import { Router } from "express";
import adRoutes from "./ad.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/ads", adRoutes);
router.use("/auth", authRoutes);
router.use("/favorites", favoriteRoutes);
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "API ReCampus funcionando!"
  });
});

export default router;