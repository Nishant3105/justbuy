const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/auth.middleware");
const User = require("../modules/user/user"); 
const Order = require("../modules/order/order.model");


router.get("/health", (req, res) => {
  res.json({ status: "User API running 🚀" });
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log("Fetched users:", users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Failed to create user", error: err.message });
  }
});

router.patch("/:id",protect, async (req, res) => {
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
    res.status(400).json({ message: "Failed to update user", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
});

 router.get("/vieworders/:userId", protect, async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUserRole= req.user.role;
        if(currentUserRole !== "admin" && currentUserRole !== "staff"){
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
});

module.exports = router;
