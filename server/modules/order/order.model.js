const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
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
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    // Razorpay fields
    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      default: "razorpay",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "paid",
        "packed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    paidAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1 });    
OrderSchema.index({ paidAt: -1 });      
OrderSchema.index({ paymentStatus: 1 });  
OrderSchema.index({ orderStatus: 1 });    
OrderSchema.index({ user: 1 });           
OrderSchema.index({ total: -1 });   

module.exports = mongoose.model("Order", OrderSchema);
