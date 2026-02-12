const express = require("express");
const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "API running 🚀" });
});

router.use("/auth", require("./auth.routes"));
router.use("/test", require("./test.routes"));
// router.use("/admin", require("./test.routes"));
router.use("/product", require("./product.routes"));

module.exports = router;
