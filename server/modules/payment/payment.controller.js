const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../order/order.model");
const Product = require("../product/product.model");
const User = require("../user/user.model");
const Cart = require("../cart/cart.model");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product")
            .session(session);

        if (!cart || cart.items.length === 0)
            throw new Error("Cart empty");


        // const existingPendingOrder = await Order.findOne({
        //     user: req.user.id,
        //     paymentStatus: "pending"
        // }).session(session);

        // if (existingPendingOrder)
        //     throw new Error("Complete existing payment first");


        let verifiedTotal = 0;
        const verifiedItems = [];

        for (const item of cart.items) {

            const product = item.product;

            if (!product)
                throw new Error("Product not found");

            if (product.stockQty < item.quantity)
                throw new Error(`${product.name} out of stock`);

            if (product.status !== "active")
                throw new Error(`${product.name} unavailable`);

            const price = Math.round(product.sellingPrice * 100);

            const subtotal = price * item.quantity;

            verifiedTotal += subtotal;

            verifiedItems.push({
                product: product._id,
                quantity: item.quantity,
                price,
                subtotal
            });
        }


        const tempOrderId = new mongoose.Types.ObjectId();

        const razorpayOrder = await razorpay.orders.create({
            amount: verifiedTotal,
            currency: "INR",
            receipt: `rcpt_${tempOrderId.toString().slice(-20)}`
        });


        const order = await Order.create([{
            _id: tempOrderId,
            user: req.user.id,
            items: verifiedItems,
            total: verifiedTotal,
            razorpayOrderId: razorpayOrder.id,
            paymentStatus: "pending",
            orderStatus: "pending"
        }], { session });


        await session.commitTransaction();

        res.json({
            orderId: order[0]._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount
        });

    }
    catch (err) {

        await session.abortTransaction();

        res.status(400).json({
            message: err.message
        });

    }
    finally {
        session.endSession();
    }
};


exports.verifyPayment = async (req, res) => {

const session = await mongoose.startSession();

try {

    session.startTransaction();

    const {
        orderId,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
    } = req.body;


    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature)
        throw new Error("Invalid signature");


    const order = await Order.findOne({
        _id: orderId,
        paymentStatus: "pending"
    })
    .populate("items.product")
    .session(session);

    if (!order)
        throw new Error("Order not found");


    if (order.razorpayOrderId !== razorpay_order_id)
        throw new Error("Invalid Razorpay order ID");

    const payment = await razorpay.payments.fetch(
        razorpay_payment_id
    );


    if (payment.amount !== order.total)
        throw new Error("Payment amount mismatch");


    if (payment.order_id !== razorpay_order_id)
        throw new Error("Payment order mismatch");


    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paidAt = new Date();
    order.razorpayPaymentId = razorpay_payment_id;

    await order.save({ session });

    await User.findByIdAndUpdate(
        order.user,
        {
            $inc: {
                totalOrders: 1,
                totalSpent: order.total
            }
        },
        { session }
    );

    const bulkOps = order.items.map(item => ({
        updateOne: {
            filter: {
                _id: item.product._id,
                stockQty: { $gte: item.quantity }
            },
            update: [
                {
                    $set: {
                        newStockQty: {
                            $subtract: ["$stockQty", item.quantity]
                        },
                        sold: {
                            $add: ["$sold", item.quantity]
                        },
                        revenue: {
                            $add: ["$revenue", item.subtotal]
                        },
                        lastSoldAt: new Date()
                    }
                },
                {
                    $set: {
                        stockQty: "$newStockQty",
                        stockStatus: {
                            $cond: {
                                if: { $lte: ["$newStockQty", 0] },
                                then: "out_of_stock",
                                else: {
                                    $cond: {
                                        if: {
                                            $lte: [
                                                "$newStockQty",
                                                "$lowStockThreshold"
                                            ]
                                        },
                                        then: "low_stock",
                                        else: "in_stock"
                                    }
                                }
                            }
                        }
                    }
                },
                { $unset: "newStockQty" }
            ]
        }
    }));


    const result = await Product.bulkWrite(bulkOps, { session });

    if (result.modifiedCount !== order.items.length)
        throw new Error("Insufficient stock");


    await Cart.findOneAndUpdate(
        { user: order.user },
        {
            items: [],
            totalPrice: 0,
            totalQuantity: 0
        },
        { session }
    );


    await session.commitTransaction();

    res.json({
        success: true
    });

}
catch (err) {

    await session.abortTransaction();

    res.status(400).json({
        message: err.message
    });

}
finally {
    session.endSession();
}

};


exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product", "name price mainImage")
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

