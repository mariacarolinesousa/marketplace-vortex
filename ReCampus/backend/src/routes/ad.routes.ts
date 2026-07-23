import { Router } from "express";
import { AdController } from "../controllers/AdController";
import { auth } from "../middlewares/auth";

const router = Router();
const adController = new AdController();

router.post("/", auth, (req, res) => {
  adController.create(req, res);
});

router.get("/", (req, res) => {
  adController.list(req, res);
});

router.get("/:id", (req, res) => {
  adController.show(req, res);
});

router.put("/:id", auth, (req, res) => {
  adController.update(req, res);
});

router.delete("/:id", auth, (req, res) => {
  adController.delete(req, res);
});

export default router;