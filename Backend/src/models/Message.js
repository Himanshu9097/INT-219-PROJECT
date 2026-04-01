import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    content: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hireRequestId: { type: Schema.Types.ObjectId, ref: "HireRequest", required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

export const Message = mongoose.model("Message", MessageSchema);
