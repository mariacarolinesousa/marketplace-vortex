const { Router } = require("express");
const { UserController } = require("../controllers/UserController");
const { auth } = require("../middlewares/auth");

const router = Router();
const userController = new UserController();

router.get("/me", auth, userController.me.bind(userController));
router.get("/me/ads", auth, userController.myAds.bind(userController));

module.exports = router;