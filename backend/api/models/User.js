import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is required only if not using Google auth
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
  watchHistory: [
    {
      videoId: String,
      title: String,
      watchedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
