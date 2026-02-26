const router = require("express").Router();
const authController = require("../modules/auth/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const {
  loginLimiter,
  registerLimiter,
  userLimiter
} = require("../middleware/rateLimit.middleware");

router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.post("/refresh", userLimiter, authController.refreshToken);
router.get("/logout", authController.logout);
router.post("/google", loginLimiter, authController.googleAuthController);
router.get("/me", protect, userLimiter, authController.me);
router.patch("/me", protect, userLimiter, authController.updateProfile);

module.exports = router;
