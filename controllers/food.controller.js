const { foods } = require("../data/database");

exports.getFoods = (req, res) => {
  res.json(foods.filter((food) => food.available));
};

exports.addFood = (req, res) => {
  const { name, price } = req.body;

  const newFood = {
    id: foods.length + 1,
    name,
    price,
    available: true
  };

  foods.push(newFood);

  res.status(201).json(newFood);
};
