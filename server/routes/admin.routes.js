const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");

const {
  getDashboardStats,
  getAllOrders,
} = require("../modules/admin/admin.controller");

router.get("/dashboard", protect, getDashboardStats);

router.get("/orders", protect, getAllOrders);

module.exports = router;