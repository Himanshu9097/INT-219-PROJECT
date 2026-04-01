import { Router } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import artistsRouter from "./artists.js";
import artworksRouter from "./artworks.js";
import uploadRouter from "./upload.js";
import hireRouter from "./hire.js";
import messagesRouter from "./messages.js";

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(artistsRouter);
router.use(artworksRouter);
router.use(uploadRouter);
router.use(hireRouter);
router.use(messagesRouter);

export default router;
