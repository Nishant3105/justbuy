const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },

    shippingAddress: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
