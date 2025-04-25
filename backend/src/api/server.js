import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import subtitleRoute from './routes/subtitles.js';
import suggestionRoute from './routes/suggestions.js';
import authRoutes from "./routes/auth.js"
import mongoose from 'mongoose'
import noteRoutes from "./routes/noteRoutes.js";
import watchRoutes from './routes/watch.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.VITE_SERVER_PORT || 5000;


// MongoDB connection
mongoose.set("debug", true);
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Mount routes
app.use('/api/subtitles', subtitleRoute);
app.use('/api/suggestions', suggestionRoute);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api/watch', watchRoutes);



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
