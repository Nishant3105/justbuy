const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  healthCheck,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  viewUserOrders,
} = require("../modules/user/user.controller");

router.get("/health", healthCheck);

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createUser);

router.patch("/:id", protect, updateUser);

router.delete("/:id", deleteUser);

router.get("/vieworders/:userId", protect, viewUserOrders);

module.exports = router;