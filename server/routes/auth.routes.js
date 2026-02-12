const router = require("express").Router();
const authController = require("../modules/auth/auth.controller");
const {protect}=require("../middleware/auth.middleware")

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", authController.refreshToken);
router.get("/logout", authController.logout);
router.post("/google", authController.googleAuthController);
router.post("/profile", protect, authController.refreshToken);
router.get("/me", authController.me);

module.exports = router;
