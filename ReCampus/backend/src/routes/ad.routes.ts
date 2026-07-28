import { Router } from "express";
import { AdController } from "../controllers/AdController";
import { auth } from "../middlewares/auth";
import { upload } from "../config/multer";


const router = Router();
const controller = new AdController();

router.post(
  "/",
  auth,
  upload.single("image"),
  controller.create.bind(controller)
);
router.get(
  "/",
  controller.list.bind(controller)
);

router.get(
  "/my",
  auth,
  controller.myAds.bind(controller)
);
router.get(
  "/:id",
  controller.show.bind(controller)
);
router.put(
  "/:id",
  auth,
  upload.single("image"), controller.update.bind(controller)
);
router.delete(
  "/:id",
  auth,
  controller.delete.bind(controller)
);

export default router;