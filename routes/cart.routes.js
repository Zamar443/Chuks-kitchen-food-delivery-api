const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/cart/add", cartController.addToCart);
router.get("/cart/:userId", cartController.viewCart);
router.delete("/cart/clear/:userId", cartController.clearCart);

module.exports = router;
