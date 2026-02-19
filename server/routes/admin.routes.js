const router = require("express").Router();
const User = require("../modules/user/user");
const Product = require("../modules/product/product.model");
const Order = require("../modules/order/order.model");
const {protect}=require("../middleware/auth.middleware")

// router.post(
//   "/users",
//   auth,
//   authorize("admin"),
//   adminCreateUser
// );

// router.post(
//   "/admin/users",
//   authMiddleware,
//   adminOnly,
//   createUserByAdmin
// );

router.get("/dashboard", protect, async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenue] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$totalAmount" }
            }
          }
        ])
      ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      revenue: revenue[0]?.total || 0
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders", protect, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("items.product", "name price mainImage")
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

module.exports = router;

