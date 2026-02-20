const Cart = require("./cart.model");
const Product = require("../product/product.model");


const calculateCartTotals = (items) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    items.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.subtotal;
    });

    return { totalQuantity, totalPrice };
};


exports.getCart = async (req, res) => {
    try {

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [],
            });
        }

        res.json({
            success: true,
            cart: cart.items,
            totalPrice: cart.totalPrice,
            totalQuantity: cart.totalQuantity,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.addToCart = async (req, res) => {
    try {

        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        if (quantity <= 0)
            return res.status(400).json({ message: "Invalid quantity" });

        if (!product || product.isActive === false)
            return res.status(404).json({ message: "Product not available" });

        const actualPrice = product.sellingPrice;

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [],
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {

            existingItem.quantity += quantity;
            existingItem.price = actualPrice;
            existingItem.subtotal =
                existingItem.quantity * existingItem.price;

        } else {

            cart.items.push({
                product: product._id,
                quantity,
                price: actualPrice,
                title: product.name,
                image: product.mainImage,
                slug: product.slug,
                subtotal: quantity * actualPrice,
            });

        }

        const totals = calculateCartTotals(cart.items);

        cart.totalPrice = totals.totalPrice;
        cart.totalQuantity = totals.totalQuantity;

        await cart.save();

        res.json({
            success: true,
            cart: cart.items,
            totalPrice: cart.totalPrice,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.removeFromCart = async (req, res) => {
    try {

        const { productId } = req.params;
        const { removeAll } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart)
            return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            item => String(item.product) === String(productId)
        );

        if (itemIndex === -1)
            return res.status(404).json({ message: "Item not found" });

        if (removeAll === true) {

            cart.items.splice(itemIndex, 1);

        } else {

            cart.items[itemIndex].quantity -= 1;

            if (cart.items[itemIndex].quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].subtotal =
                    cart.items[itemIndex].quantity *
                    cart.items[itemIndex].price;
            }

        }

        const totals = calculateCartTotals(cart.items);

        cart.totalPrice = totals.totalPrice;
        cart.totalQuantity = totals.totalQuantity;

        await cart.save();

        res.json({
            success: true,
            cart: cart.items,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.clearCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart)
            return res.json({ success: true });

        cart.items = [];
        cart.totalPrice = 0;
        cart.totalQuantity = 0;

        await cart.save();

        res.json({
            success: true,
            cart: [],
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

