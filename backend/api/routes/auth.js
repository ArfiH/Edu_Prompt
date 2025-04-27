import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config();

import User from "../models/User.js";
const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log('Error by auth.js');
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// POST /api/auth/signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, 'abcde12345', { expiresIn: "1h" });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Signin failed", details: err.message });
  }
});

// POST /api/auth/guest
router.post("/guest", async (req, res) => {
  try {
    const guestUser = new User({
      name: `Guest_${Date.now()}`,
      email: `guest_${Date.now()}@eduprompt.com`,
      password: "guest", // You might hash or set temporary logic here
      isGuest: true,
    });
    await guestUser.save();
    const token = jwt.sign({ id: guestUser._id }, 'abcde12345', { expiresIn: "1h" });
    res.json({ token, user: { name: guestUser.name, email: guestUser.email } });
  } catch (err) {
    res.status(500).json({ error: "Guest login failed", details: err.message });
  }
});

export default router;
