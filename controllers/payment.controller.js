const { orders } = require("../data/database");

exports.pay = (req, res) => {
  const { orderId, amount } = req.body;

  const order = orders.find((o) => o.id == orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.paymentStatus === "Paid")
    return res.status(400).json({ message: "Already paid" });

  if (amount !== order.total)
    return res.status(400).json({
      message: "Incorrect amount",
      expected: `₦${order.total}`
    });

  const success = Math.random() < 0.9;

  if (!success) {
    order.paymentStatus = "Failed";
    return res.status(400).json({ message: "Payment failed" });
  }

  order.paymentStatus = "Paid";
  order.status = "Confirmed";

  res.json({ message: "Payment successful", order });
};
