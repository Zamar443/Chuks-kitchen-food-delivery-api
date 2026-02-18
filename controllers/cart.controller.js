const { carts, foods } = require("../data/database");

exports.addToCart = (req, res) => {
  const { userId, foodId, quantity } = req.body;

  const food = foods.find((f) => f.id === foodId);

  if (!food || !food.available)
    return res.status(400).json({ message: "Food unavailable" });

  if (!carts[userId]) carts[userId] = [];

  carts[userId].push({ foodId, quantity });

  res.json({ message: "Added to cart" });
};

exports.viewCart = (req, res) => {
  const { userId } = req.params;
  res.json(carts[userId] || []);
};

exports.clearCart = (req, res) => {
  const { userId } = req.params;
  carts[userId] = [];
  res.json({ message: "Cart cleared" });
};
