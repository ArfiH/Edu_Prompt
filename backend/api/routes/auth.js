import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendOtpEmail } from "../utils/email.js";
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
    console.log("Error by auth.js");
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// POST /api/auth/signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // const token = jwt.sign({ id: user._id }, prcoess.env.VITE_JWT_SECRET, { expiresIn: "1h" });
    const token = jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET);
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


router.post("/send-otp", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});


router.post("/verify-otp", async (req, res) => {
  const { name, email, password, otp } = req.body;
  try {
    const record = await Otp.findOne({ email, otp });
    if (!record)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    await Otp.deleteMany({ email });
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

export default router;
