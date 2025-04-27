import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoId: { type: String, required: true },
  title: String,
  content: String,
}, {
  timestamps: true,
});

// Add compound unique index
noteSchema.index({ user: 1, videoId: 1 }, { unique: true });

export default mongoose.model("Note", noteSchema);
