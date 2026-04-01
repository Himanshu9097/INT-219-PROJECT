import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../lib/jwt.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function formatUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    tagline: user.tagline,
    bio: user.bio,
    skills: user.skills,
    spotlights: (user.spotlights && user.spotlights.length > 0)
      ? user.spotlights
      : (user.spotlightTitle || user.spotlightDescription || user.spotlightImage)
        ? [{ title: user.spotlightTitle, description: user.spotlightDescription, image: user.spotlightImage }]
        : [],
    profileImage: user.profileImage,
    hourlyRate: user.hourlyRate,
    category: user.category,
    location: user.location,
    phoneNumber: user.phoneNumber,
    website: user.website,
    instagram: user.instagram,
    behance: user.behance,
    linkedin: user.linkedin,
    github: user.github,
    availabilityStatus: user.availabilityStatus,
    createdAt: user.createdAt,
  };
}

router.post("/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  if (!["artist", "client"].includes(role)) {
    res.status(400).json({ error: "Role must be artist or client" });
    return;
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });
  const token = generateToken(user._id.toString(), user.role);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({ user: formatUser(user), token });
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = generateToken(user._id.toString(), user.role);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ user: formatUser(user), token });
});

router.post("/auth/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/auth/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  res.json(formatUser(user));
});

export default router;
