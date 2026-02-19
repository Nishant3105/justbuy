const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const paymentController = require("../modules/payment/payment.controller");


router.post("/create-order", protect, paymentController.createOrder);

router.post("/verify-payment", protect, paymentController.verifyPayment);

router.get("/my-orders", protect, paymentController.getMyOrders);

module.exports = router;
