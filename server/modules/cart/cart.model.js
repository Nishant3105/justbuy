const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    title: String,
    image: String,
    slug: String,

    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    items: [CartItemSchema],

    totalQuantity: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    expiresAt: {
      type: Date,
      default: () =>
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), 
    },
  },
  { timestamps: true }
);

CartSchema.index({ updatedAt: -1 });

module.exports = mongoose.model("Cart", CartSchema);