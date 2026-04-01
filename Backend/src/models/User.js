import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["artist", "client"], default: "client" },
    tagline: { type: String },
    bio: { type: String },
    skills: { type: String },
    profileImage: { type: String },
    hourlyRate: { type: Number },
    category: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    website: { type: String },
    instagram: { type: String },
    behance: { type: String },
    linkedin: { type: String },
    github: { type: String },
    availabilityStatus: {
      type: String,
      enum: ["available", "limited", "booked"],
      default: "available",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

export const User = mongoose.model("User", UserSchema);
