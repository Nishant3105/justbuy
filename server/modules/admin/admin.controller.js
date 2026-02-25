const User = require("../user/user.model");
const Product = require("../product/product.model");
const Order = require("../order/order.model");

const getDashboardStats = async (req, res) => {
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
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name price mainImage")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
};