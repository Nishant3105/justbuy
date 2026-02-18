const express = require("express");
const router = express.Router();
const razorpay = require("../utils/razorpay");
const {protect} = require("../middleware/auth.middleware");
const paymentController = require("../modules/payment/payment.controller");

// router.post("/create-order", async (req, res) => {
//   try {
//     console.log("entered createorder")
//     const { amount } = req.body;
//     console.log("fetched amount..",amount)

//     const options = {
//       amount: Math.round(amount * 100),
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     res.json(order);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });



router.post("/create-order", protect, paymentController.createOrder);

router.post("/verify-payment", protect, paymentController.verifyPayment);

router.get("/my-orders", protect, paymentController.getMyOrders);

module.exports = router;
