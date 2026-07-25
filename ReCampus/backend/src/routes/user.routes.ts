import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const router = Router();
const controller = new UserController();

router.get(
  "/me",
  auth,
  controller.me.bind(controller)
);

router.get(
  "/me/ads",
  auth,
  controller.myAds.bind(controller)
);

export default router;