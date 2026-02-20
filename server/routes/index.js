const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "API running 🚀" });
});

router.use("/auth", require("./auth.routes"));
// router.use("/test", require("./test.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/admin/analytics", require("./admin.analytics.routes"));
router.use("/product", require("./product.routes"));
router.use("/payment", require("./payment.routes"));
router.use("/users", require("./user.routes"));
router.use("/cart", require("./cart.routes"));


module.exports = router;



