const express = require("express");
const app = express();

app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");
const foodRoutes = require("./routes/food.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");

app.use(userRoutes);
app.use(foodRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
