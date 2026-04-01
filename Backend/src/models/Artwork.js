import mongoose from "mongoose";

const { Schema } = mongoose;

const ArtworkSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    projectUrl: { type: String },
    mediaType: {
      type: String,
      enum: ["image", "audio", "video", "document"],
      default: "image",
    },
    category: { type: String },
    price: { type: Number },
    artistId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } },
);

export const Artwork = mongoose.model("Artwork", ArtworkSchema);
