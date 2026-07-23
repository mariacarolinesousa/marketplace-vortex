import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const router = Router();
const controller = new UserController();

router.get("/me", auth, (req, res) => {
  controller.me(req, res);
});
router.get("/me/ads", auth, (req, res) => {
  controller.myAds(req, res);
});

export default router;