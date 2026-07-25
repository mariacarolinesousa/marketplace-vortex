const { Router } from "express";
const { UserController } from "../controllers/UserController";
const { auth } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

router.get("/me", auth, userController.me.bind(userController));
router.get("/me/ads", auth, userController.myAds.bind(userController));

export default router;