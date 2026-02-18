const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/payments/pay", paymentController.pay);

module.exports = router;
