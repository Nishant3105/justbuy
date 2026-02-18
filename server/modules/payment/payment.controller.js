const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../order/order.model");
const Product = require("../product/product.model");
const User = require("../user/user");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ message: "No items provided" });
        }

        if (!total) {
            return res.status(400).json({ message: "Total amount missing" });
        }

        const order = await Order.create({
            user: req.user.id,
            items,
            total,
            paymentStatus: "pending",
            orderStatus: "pending",
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(total * 100),
            currency: "INR",
            receipt: `receipt_${order._id}`,
        });

        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.status(200).json({
            orderId: order._id, // ✅ Mongo order id
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });

    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        res.status(500).json({
            message: "Order creation failed",
            error: error.message,
        });
    }
};

exports.verifyPayment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const {
            orderId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            throw new Error("Invalid signature");
        }

        const order = await Order.findById(orderId)
            .populate("items.product")
            .session(session);

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.paymentStatus === "paid") {
            throw new Error("Order already paid");
        }

        order.paymentStatus = "paid";
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save({ session });

        await User.findByIdAndUpdate(
            order.user,
            {
                $inc: {
                    totalOrders: 1,
                    totalSpent: order.total,
                },
            },
            { session }
        );

        for (const item of order.items) {

            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: { stockQty: -item.quantity, sold: item.quantity, revenue: item.price * item.quantity },
                    $set: { lastSoldAt: new Date() }
                },
                { session }
            );

        }

        await session.commitTransaction();
        session.endSession();

        res.json({
            success: true,
            message: "Payment verified and updated successfully",
        });

    } catch (err) {

        await session.abortTransaction();
        session.endSession();

        res.status(400).json({
            message: "Payment verification failed",
            error: err.message,
        });

    }
};


exports.getMyOrders = async (req, res) => {
    try {
        console.log("userid", req.user.id )
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product", "name price mainImage")
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

