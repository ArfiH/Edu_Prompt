import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Authorization header:", req.headers.authorization); 

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
