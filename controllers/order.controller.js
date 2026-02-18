const { carts, foods, orders } = require("../data/database");

exports.createOrder = (req, res) => {
  const { userId } = req.body;

  if (!carts[userId] || carts[userId].length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  let total = 0;

  for (let item of carts[userId]) {
    const food = foods.find((f) => f.id === item.foodId);

    if (!food || !food.available)
      return res.status(400).json({ message: "Item unavailable" });

    total += food.price * item.quantity;
  }

  const order = {
    id: orders.length + 1,
    userId,
    items: carts[userId],
    total,
    currency: "NGN",
    status: "Pending",
    paymentStatus: "Unpaid",
    createdAt: new Date()
  };

  orders.push(order);
  carts[userId] = [];

  res.status(201).json({ message: "Order created", order });
};

exports.getOrder = (req, res) => {
  const order = orders.find((o) => o.id == req.params.id);
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
};

exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const order = orders.find((o) => o.id == req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  if (order.paymentStatus !== "Paid")
    return res.status(400).json({ message: "Payment not completed" });

  order.status = status;
  res.json(order);
};
