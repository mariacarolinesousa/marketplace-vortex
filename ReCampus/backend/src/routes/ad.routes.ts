import { Router } from "express";
import { AdController } from "../controllers/AdController";
import { auth } from "../middlewares/auth";

const router = Router();
const adController = new AdController();

router.post("/", auth, adController.create.bind(adController));
router.get("/", adController.list.bind(adController));
router.get("/:id", adController.show.bind(adController));
router.put("/:id", auth, adController.update.bind(adController));
router.delete("/:id", auth, adController.delete.bind(adController));

export default router;