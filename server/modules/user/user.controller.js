const User = require("../user/user.model");
const Order = require("../order/order.model");

const healthCheck = (req, res) => {
    res.json({ status: "User API running 🚀" });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .lean();
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: err.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: err.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({
            message: "Failed to create user",
            error: err.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const currentUser = req.user;
        const updateData = { ...req.body };

        if (currentUser.role !== "admin") {
            if ("role" in updateData || "status" in updateData) {
                return res.status(403).json({
                    message: "Only admins can change the user's role or status",
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({
            message: "Failed to update user",
            error: err.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({
            message: "Failed to delete user",
            error: err.message,
        });
    }
};

const viewUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUserRole = req.user.role;

        if (currentUserRole !== "admin" && currentUserRole !== "staff") {
            return res.status(403).json({ message: "Access denied" });
        }

        const orders = await Order.find({ user: userId })
            .populate("items.product", "name price mainImage")
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

module.exports = {
    healthCheck,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    viewUserOrders,
};