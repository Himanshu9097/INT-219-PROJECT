import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import os from "os";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";
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

const uploadsDir = path.join(os.tmpdir(), "uploads");
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  logger.warn({ err }, "Could not create uploads directory in /tmp.");
}
app.use("/api/uploads", express.static(uploadsDir));

app.use("/api", router);

export default app;
