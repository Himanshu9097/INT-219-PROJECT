import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import os from "os";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";
import { connectMongo, isMongoConnected } from "./lib/mongodb.js";
import "./models/User.js";
import "./models/Artwork.js";
import "./models/HireRequest.js";
import "./models/Message.js";

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", async (req, res, next) => {
  if (isMongoConnected()) {
    next();
    return;
  }

  try {
    await connectMongo();
    next();
  } catch (err) {
    logger.error({ err }, "Mongo connection unavailable");
    res.status(503).json({ error: "Database temporarily unavailable" });
  }
});

const uploadsDir = process.env.VERCEL
  ? path.join(os.tmpdir(), "uploads")
  : path.resolve(process.cwd(), "uploads");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  logger.warn({ err }, "Could not create uploads directory.");
}
app.use("/api/uploads", express.static(uploadsDir));

// Keep both prefixes so the app works whether Vercel forwards /api/* directly
// or exposes the backend routes at the site root.
app.use("/api", router);
app.use("/", router);

// Serve static frontend files if they exist (for Render monolithic deployment)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.resolve(__dirname, "../../Frontend/artfolio/dist/public");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath, { extensions: ['html'] }));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Fallback if frontend is not built
  app.get("/", (req, res) => {
    res.json({ message: "Artfolio API is running", version: "1.0.0" });
  });
}

export default app;
