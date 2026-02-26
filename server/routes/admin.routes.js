const router = require("express").Router();

const { protect } = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const { adminLimiter } = require("../middleware/rateLimit.middleware");

const {
  getDashboardStats,
  getAllOrders,
} = require("../modules/admin/admin.controller");

router.get(
  "/dashboard",
  protect,
  requireRole(["admin"]),
  adminLimiter,
  getDashboardStats
);

router.get(
  "/orders",
  protect,
  requireRole(["admin"]),
  adminLimiter,
  getAllOrders
);

module.exports = router;