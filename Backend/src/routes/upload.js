import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { requireAuth } from "../middlewares/auth.js";
import { uploadProfileImageToImageKit } from "../lib/imagekit.js";

const router = Router();

const uploadsDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
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

router.post("/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const mediaType = getMediaType(req.file.mimetype);
  const url = `/api/uploads/${req.file.filename}`;
  res.json({ url, mediaType, filename: req.file.filename });
});

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
