const router = require("express").Router();
const { summary, revenue, orders,
  users, paymentStatus, orderStatus,
  topProducts, categorySales, recentOrders } = require("../modules/admin/admin.analytics.controller");

router.get("/summary", summary);

router.get("/revenue", revenue);

router.get("/orders", orders);

router.get("/users", users);

router.get("/payment-status", paymentStatus);

router.get("/order-status", orderStatus);

router.get("/top-products", topProducts);

router.get("/category-sales", categorySales);

router.get("/recent-orders", recentOrders);


module.exports = router;
