const router = require("express").Router();
const Order = require("../modules/order/order.model");
const User = require("../modules/user/user");
const Product = require("../modules/product/product.model");

router.get("/summary", async (req, res) => {
  try {
    const [users, products, orders, revenue] = await Promise.all([

      User.countDocuments(),

      Product.countDocuments({ status: "active" }),

      Order.countDocuments(),

      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total" }
          }
        }
      ])
    ]);

    res.json({
      totalUsers: users,
      totalProducts: products,
      totalOrders: orders,
      totalRevenue: revenue[0]?.totalRevenue || 0
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/revenue", async (req, res) => {
  try {

    const data = await Order.aggregate([

      { $match: { paymentStatus: "paid" } },

      {
        $group: {
          _id: {
            year: { $year: "$paidAt" },
            month: { $month: "$paidAt" },
            day: { $dayOfMonth: "$paidAt" }
          },
          revenue: { $sum: "$total" }
        }
      },

      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {

    const data = await Order.aggregate([

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          orders: { $sum: 1 }
        }
      },

      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users", async (req, res) => {
  try {

    const data = await User.aggregate([

      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          users: { $sum: 1 }
        }
      },

      { $sort: { "_id.year": 1, "_id.month": 1 } }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/payment-status", async (req, res) => {
  try {

    const data = await Order.aggregate([

      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 }
        }
      }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/order-status", async (req, res) => {
  try {

    const data = await Order.aggregate([

      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 }
        }
      }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/top-products", async (req, res) => {
  try {

    const data = await Product.find()
      .sort({ sold: -1 })
      .limit(10)
      .select("name sold revenue mainImage");

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/category-sales", async (req, res) => {
  try {

    const data = await Product.aggregate([

      {
        $group: {
          _id: "$category",
          revenue: { $sum: "$revenue" },
          sold: { $sum: "$sold" }
        }
      },

      { $sort: { revenue: -1 } }

    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/recent-orders", async (req, res) => {
  try {

    const data = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "firstName lastName email")
      .select("total paymentStatus orderStatus createdAt");

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
