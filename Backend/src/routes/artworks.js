import { Router } from "express";
import mongoose from "mongoose";
import { Artwork } from "../models/Artwork.js";
import { User } from "../models/User.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function getParam(value) {
  return typeof value === "string" ? value : null;
}

router.get("/artworks", async (req, res) => {
  const { artistId } = req.query;
  const filter = {};

  if (artistId && mongoose.Types.ObjectId.isValid(artistId)) {
    filter.artistId = new mongoose.Types.ObjectId(artistId);
  }

  const artworks = await Artwork.find(filter).sort({ createdAt: -1 }).lean();
  const artistIds = [...new Set(artworks.map((artwork) => artwork.artistId.toString()))];
  const artists = await User.find({ _id: { $in: artistIds } }).lean();
  const artistMap = new Map(artists.map((artist) => [artist._id.toString(), artist]));

  res.json(
    artworks.map((artwork) => ({
      id: artwork._id.toString(),
      title: artwork.title,
      description: artwork.description,
      imageUrl: artwork.imageUrl,
      projectUrl: artwork.projectUrl,
      mediaType: artwork.mediaType,
      category: artwork.category,
      price: artwork.price,
      artistId: artwork.artistId.toString(),
      artistName: artistMap.get(artwork.artistId.toString())?.name ?? null,
      artistImage: artistMap.get(artwork.artistId.toString())?.profileImage ?? null,
      createdAt: artwork.createdAt,
    })),
  );
});

router.post("/artworks", requireAuth, async (req, res) => {
  if (req.userRole !== "artist") {
    res.status(403).json({ error: "Only artists can upload artworks" });
    return;
  }

  const { title, description, imageUrl, projectUrl, mediaType, category, price } = req.body;

  if (!title || !imageUrl) {
    res.status(400).json({ error: "Title and media URL are required" });
    return;
  }

  const artwork = await Artwork.create({
    title,
    description,
    imageUrl,
    projectUrl,
    mediaType: mediaType || "image",
    category,
    price,
    artistId: req.userId,
  });

  const artist = await User.findById(req.userId).lean();

  res.status(201).json({
    id: artwork._id.toString(),
    title: artwork.title,
    description: artwork.description,
    imageUrl: artwork.imageUrl,
    projectUrl: artwork.projectUrl,
    mediaType: artwork.mediaType,
    category: artwork.category,
    price: artwork.price,
    artistId: artwork.artistId.toString(),
    artistName: artist?.name ?? null,
    artistImage: artist?.profileImage ?? null,
    createdAt: artwork.createdAt,
  });
});

router.get("/artworks/:id", async (req, res) => {
  const id = getParam(req.params.id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid artwork ID" });
    return;
  }

  const artwork = await Artwork.findById(id).lean();

  if (!artwork) {
    res.status(404).json({ error: "Artwork not found" });
    return;
  }

  const artist = await User.findById(artwork.artistId).lean();

  res.json({
    id: artwork._id.toString(),
    title: artwork.title,
    description: artwork.description,
    imageUrl: artwork.imageUrl,
    projectUrl: artwork.projectUrl,
    mediaType: artwork.mediaType,
    category: artwork.category,
    price: artwork.price,
    artistId: artwork.artistId.toString(),
    artistName: artist?.name ?? null,
    artistImage: artist?.profileImage ?? null,
    createdAt: artwork.createdAt,
  });
});

router.put("/artworks/:id", requireAuth, async (req, res) => {
  const id = getParam(req.params.id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid artwork ID" });
    return;
  }

  const artwork = await Artwork.findById(id);

  if (!artwork) {
    res.status(404).json({ error: "Artwork not found" });
    return;
  }

  if (artwork.artistId.toString() !== req.userId) {
    res.status(403).json({ error: "You can only edit your own artworks" });
    return;
  }

  const { title, description, imageUrl, projectUrl, mediaType, category, price } = req.body;
  Object.assign(artwork, { title, description, imageUrl, projectUrl, mediaType, category, price });
  await artwork.save();

  const artist = await User.findById(artwork.artistId).lean();

  res.json({
    id: artwork._id.toString(),
    title: artwork.title,
    description: artwork.description,
    imageUrl: artwork.imageUrl,
    projectUrl: artwork.projectUrl,
    mediaType: artwork.mediaType,
    category: artwork.category,
    price: artwork.price,
    artistId: artwork.artistId.toString(),
    artistName: artist?.name ?? null,
    artistImage: artist?.profileImage ?? null,
    createdAt: artwork.createdAt,
  });
});

router.delete("/artworks/:id", requireAuth, async (req, res) => {
  const id = getParam(req.params.id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid artwork ID" });
    return;
  }

  const artwork = await Artwork.findById(id);

  if (!artwork) {
    res.status(404).json({ error: "Artwork not found" });
    return;
  }

  if (artwork.artistId.toString() !== req.userId) {
    res.status(403).json({ error: "You can only delete your own artworks" });
    return;
  }

  await artwork.deleteOne();
  res.sendStatus(204);
});

export default router;
