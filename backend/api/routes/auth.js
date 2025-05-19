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
    if (!user) { 
      console.log('User not found');
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // const token = jwt.sign({ id: user._id }, prcoess.env.VITE_JWT_SECRET, { expiresIn: "1h" });
    const jwtSecret = Buffer.from(process.env.VITE_JWT_SECRET, 'utf-8');
    const token = jwt.sign(
      { id: user._id.toString() },
      jwtSecret,
      { algorithm: 'HS256' }
    );


    // const token = jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET);
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
      password: "guest", 
      isGuest: true,
    });
    await guestUser.save();
    const token = jwt.sign({ id: guestUser._id }, process.env.VITE_JWT_SECRET);
    res.json({ token, user: { name: guestUser.name, email: guestUser.email } });
  } catch (err) {
    res.status(500).json({ error: "Guest login failed", details: err.message });
  }
});

// POST /api/auth/google
router.post("/google", async (req, res) => {
  const { googleId, email, name } = req.body;
  
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name,
        email,
        googleId,
      });
      await user.save();
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      await user.save();
    }

    const jwtSecret = Buffer.from(process.env.VITE_JWT_SECRET, 'utf-8');
    const token = jwt.sign(
      { id: user._id.toString() },
      jwtSecret,
      { algorithm: 'HS256' }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: "Google authentication failed", details: err.message });
  }
});

export default router;
