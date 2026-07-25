import { Router } from "express";
import { FavoriteController } from "../controllers/FavoriteController";
import { auth } from "../middlewares/auth";

const router = Router();
const favoriteController = new FavoriteController();

router.post("/:adId", auth, favoriteController.create.bind(favoriteController));

router.get("/", auth, favoriteController.list.bind(favoriteController));

router.delete("/:adId", auth, favoriteController.delete.bind(favoriteController));

export default router;