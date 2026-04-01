import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Artwork } from "../models/Artwork.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function formatArtist(artist, artworkCount = 0) {
  return {
    id: artist._id.toString(),
    name: artist.name,
    email: artist.email,
    tagline: artist.tagline,
    bio: artist.bio,
    skills: artist.skills,
    spotlights:
      artist.spotlights && artist.spotlights.length > 0
        ? artist.spotlights
        : artist.spotlightTitle || artist.spotlightDescription || artist.spotlightImage
          ? [{ title: artist.spotlightTitle, description: artist.spotlightDescription, image: artist.spotlightImage }]
          : [],
    profileImage: artist.profileImage,
    hourlyRate: artist.hourlyRate,
    category: artist.category,
    location: artist.location,
    phoneNumber: artist.phoneNumber,
    website: artist.website,
    instagram: artist.instagram,
    behance: artist.behance,
    linkedin: artist.linkedin,
    github: artist.github,
    availabilityStatus: artist.availabilityStatus,
    artworkCount,
    createdAt: artist.createdAt,
  };
}

router.get("/artists", async (req, res) => {
  const { search, skill, category, minPrice, maxPrice } = req.query;
  const filter = { role: "artist" };

  if (category) {
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  if (minPrice) {
    filter.hourlyRate = { ...(filter.hourlyRate ?? {}), $gte: Number(minPrice) };
  }

  if (maxPrice) {
    filter.hourlyRate = { ...(filter.hourlyRate ?? {}), $lte: Number(maxPrice) };
  }

  let artists = await User.find(filter).lean();

  if (search) {
    const normalizedSearch = search.toLowerCase();
    artists = artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(normalizedSearch) ||
        (artist.bio && artist.bio.toLowerCase().includes(normalizedSearch)) ||
        (artist.skills && artist.skills.toLowerCase().includes(normalizedSearch)),
    );
  }

  if (skill) {
    artists = artists.filter(
      (artist) => artist.skills && artist.skills.toLowerCase().includes(skill.toLowerCase()),
    );
  }

  const artistIds = artists.map((artist) => artist._id);
  const counts = await Artwork.aggregate([
    { $match: { artistId: { $in: artistIds } } },
    { $group: { _id: "$artistId", cnt: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((count) => [count._id.toString(), count.cnt]));

  res.json(
    artists.map((artist) => formatArtist(artist, countMap.get(artist._id.toString()) ?? 0)),
  );
});

router.get("/artists/featured", async (_req, res) => {
  const artists = await User.find({ role: "artist" }).lean();
  const artistIds = artists.map((artist) => artist._id);
  const counts = await Artwork.aggregate([
    { $match: { artistId: { $in: artistIds } } },
    { $group: { _id: "$artistId", cnt: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((count) => [count._id.toString(), count.cnt]));

  const ranked = artists
    .map((artist) => ({
      ...artist,
      artworkCount: countMap.get(artist._id.toString()) ?? 0,
    }))
    .sort((a, b) => b.artworkCount - a.artworkCount)
    .slice(0, 6);

  res.json(ranked.map((artist) => formatArtist(artist, artist.artworkCount)));
});

router.get("/artists/stats", async (_req, res) => {
  const [totalArtists, totalClients, totalArtworks, totalHireRequests] = await Promise.all([
    User.countDocuments({ role: "artist" }),
    User.countDocuments({ role: "client" }),
    Artwork.countDocuments(),
    mongoose.model("HireRequest").countDocuments(),
  ]);

  const categoryCounts = await User.aggregate([
    { $match: { role: "artist", category: { $ne: null } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  const categories = categoryCounts
    .filter((categoryCount) => categoryCount._id)
    .map((categoryCount) => ({ name: categoryCount._id, count: categoryCount.count }));

  res.json({ totalArtists, totalArtworks, totalClients, totalHireRequests, categories });
});

router.get("/artists/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid artist ID" });
    return;
  }

  const artist = await User.findById(id).lean();

  if (!artist || artist.role !== "artist") {
    res.status(404).json({ error: "Artist not found" });
    return;
  }

  const artworkCount = await Artwork.countDocuments({ artistId: artist._id });
  res.json(formatArtist(artist, artworkCount));
});

router.put("/artists/profile", requireAuth, async (req, res) => {
  const {
    name,
    tagline,
    bio,
    skills,
    spotlights,
    spotlightTitle,
    spotlightDescription,
    spotlightImage,
    profileImage,
    hourlyRate,
    category,
    location,
    phoneNumber,
    website,
    instagram,
    behance,
    linkedin,
    github,
    availabilityStatus,
  } = req.body;

  const normalizedSpotlights = Array.isArray(spotlights)
    ? spotlights
        .filter((s) => s && (s.title || s.description || s.image))
        .slice(0, 5)
        .map((s) => ({
          title: s.title,
          description: s.description,
          image: s.image,
        }))
    : [];

  // Backward compatibility: accept single spotlight fields if array not provided
  if (!normalizedSpotlights.length && (spotlightTitle || spotlightDescription || spotlightImage)) {
    normalizedSpotlights.push({
      title: spotlightTitle,
      description: spotlightDescription,
      image: spotlightImage,
    });
  }

  const updated = await User.findByIdAndUpdate(
    req.userId,
    {
      name,
      tagline,
      bio,
      skills,
      spotlights: normalizedSpotlights,
      profileImage,
      hourlyRate,
      category,
      location,
      phoneNumber,
      website,
      instagram,
      behance,
      linkedin,
      github,
      availabilityStatus,
    },
    { new: true },
  );

  if (!updated) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({
    id: updated._id.toString(),
    name: updated.name,
    email: updated.email,
    role: updated.role,
    tagline: updated.tagline,
    bio: updated.bio,
    skills: updated.skills,
    spotlights: updated.spotlights ?? [],
    profileImage: updated.profileImage,
    hourlyRate: updated.hourlyRate,
    category: updated.category,
    location: updated.location,
    phoneNumber: updated.phoneNumber,
    website: updated.website,
    instagram: updated.instagram,
    behance: updated.behance,
    linkedin: updated.linkedin,
    github: updated.github,
    availabilityStatus: updated.availabilityStatus,
    createdAt: updated.createdAt,
  });
});

export default router;
