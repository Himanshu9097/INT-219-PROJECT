import { Router } from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middlewares/auth.js";
import { uploadToImageKit, uploadProfileImageToImageKit } from "../lib/imagekit.js";

const router = Router();

// All uploads go to memory first, then get streamed to ImageKit CDN.
// This avoids storing files on disk (which is ephemeral on Render/Vercel).
const artworkUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg", "image/png", "image/gif", "image/webp",
      "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4",
      "video/mp4", "video/quicktime", "video/webm",
      "application/pdf",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported`));
    }
  },
});

const profileImageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }
    cb(new Error("Profile image must be an image file"));
  },
});

function getMediaType(mimetype) {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("audio/")) return "audio";
  if (mimetype.startsWith("video/")) return "video";
  return "document";
}

// POST /api/upload — artwork files (images, audio, video, docs)
router.post("/upload", requireAuth, artworkUpload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  try {
    const ext = path.extname(req.file.originalname);
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const uploaded = await uploadToImageKit(req.file.buffer, fileName, "/artfolio/artworks");

    const mediaType = getMediaType(req.file.mimetype);
    // Return the permanent CDN URL — stored in MongoDB and served directly
    res.json({ url: uploaded.url, mediaType, fileId: uploaded.fileId });
  } catch (err) {
    console.error("ImageKit artwork upload failed", err);
    res.status(500).json({ error: "Failed to upload artwork file" });
  }
});

// POST /api/upload/profile-image — profile images
router.post(
  "/upload/profile-image",
  requireAuth,
  profileImageUpload.single("file"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No profile image uploaded" });
      return;
    }

    try {
      const uploaded = await uploadProfileImageToImageKit(
        req.file.buffer,
        req.file.originalname,
        req.userId || "anonymous",
      );

      res.json({
        url: uploaded.url,
        fileId: uploaded.fileId,
        name: uploaded.name,
      });
    } catch (error) {
      console.error("ImageKit profile upload failed", error);
      res.status(500).json({ error: "Failed to upload profile image to ImageKit" });
    }
  },
);

export default router;
