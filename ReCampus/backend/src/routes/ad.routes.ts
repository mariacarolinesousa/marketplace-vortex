import { Router } from "express";
import { AdController } from "../controllers/AdController";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../config/multer";

const router = Router();
const controller = new AdController();

router.post("/", authMiddleware, controller.create.bind(controller));
router.get("/", controller.list.bind(controller));
router.get("/:id", controller.show.bind(controller));
router.put("/:id", authMiddleware, controller.update.bind(controller));
router.delete("/:id", authMiddleware, controller.delete.bind(controller));
router.post("/", upload.single("image"), AdController.create);

export default router;