import mongoose from "mongoose";

const { Schema } = mongoose;

const HireRequestSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number },
    deadline: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"],
      default: "pending",
    },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    artistId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

export const HireRequest = mongoose.model("HireRequest", HireRequestSchema);
