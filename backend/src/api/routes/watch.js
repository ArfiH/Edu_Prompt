import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Middleware to extract user from token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "abcde12345");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// POST /api/watch
router.post("/", authMiddleware, async (req, res) => {
  const { videoId, title } = req.body;
  console.log("Hit Watch route");
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const lastWatched = user.watchHistory[user.watchHistory.length - 1];
    const isSameAsLast = lastWatched && lastWatched.videoId === videoId;

    if (!isSameAsLast) {
      user.watchHistory.push({ videoId, title });
      await user.save();
    }
    else {
      console.log('Same as last');
    }
    console.log({ videoId, title });

    res.status(200).json({ message: "Watch history updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update watch history", details: err.message });
  }
});

// GET /api/watch
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("watchHistory");
    if (!user) return res.status(404).json({ error: "User not found" });

    const recentHistory = user.watchHistory.slice(-10).reverse(); // Get last 10 and reverse to show most recent first

    res.status(200).json(recentHistory);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch watch history", details: err.message });
  }
});

export default router;
