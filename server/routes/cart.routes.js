const router = require("express").Router();

const cartController = require("../modules/cart/cart.controller");

const requireAuth = require("../middleware/auth.middleware").protect;


router.get("/", requireAuth, cartController.getCart);

router.post("/", requireAuth, cartController.addToCart);

router.patch("/:productId", requireAuth, cartController.removeFromCart);

router.delete("/clear", requireAuth, cartController.clearCart);


module.exports = router;