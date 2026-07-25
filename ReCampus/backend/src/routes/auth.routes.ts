import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});

export default router;