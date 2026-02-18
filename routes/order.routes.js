const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/orders", orderController.createOrder);
router.get("/orders/:id", orderController.getOrder);
router.patch("/orders/:id/status", orderController.updateStatus);

module.exports = router;
