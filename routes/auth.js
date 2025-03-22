const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
