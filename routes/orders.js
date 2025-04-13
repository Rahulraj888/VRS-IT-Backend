const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware');

// POST endpoint to create a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    const newOrder = new Order({
      user: req.user._id, // <-- from the JWT token (req.user)
      items,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order saving error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint to fetch orders for the logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
