import type { Request, Response } from "express";
const { Router } = require("express");
const authRoutes = require("./auth.routes");
const adRoutes = require("./ad.routes");
const { userRoutes } = require("./user.routes");

const router = Router();

router.use("/users", userRoutes);
router.use("/ads", adRoutes);
router.use("/auth", authRoutes);
router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "API ReCampus funcionando!"
  });
});

module.exports = router;