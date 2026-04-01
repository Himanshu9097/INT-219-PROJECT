import { Router } from "express";
import mongoose from "mongoose";
import { Message } from "../models/Message.js";
import { HireRequest } from "../models/HireRequest.js";
import { User } from "../models/User.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function getParam(value) {
  return typeof value === "string" ? value : null;
}

router.get("/messages/:hireRequestId", requireAuth, async (req, res) => {
  const hireRequestId = getParam(req.params.hireRequestId);

  if (!hireRequestId || !mongoose.Types.ObjectId.isValid(hireRequestId)) {
    res.status(400).json({ error: "Invalid hire request ID" });
    return;
  }

  const hireRequest = await HireRequest.findById(hireRequestId).lean();

  if (!hireRequest) {
    res.status(404).json({ error: "Hire request not found" });
    return;
  }

  if (hireRequest.clientId.toString() !== req.userId && hireRequest.artistId.toString() !== req.userId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const messages = await Message.find({ hireRequestId }).sort({ createdAt: 1 }).lean();
  const senderIds = [...new Set(messages.map((message) => message.senderId.toString()))];
  const senders = await User.find({ _id: { $in: senderIds } }).lean();
  const senderMap = new Map(senders.map((sender) => [sender._id.toString(), sender]));

  res.json(
    messages.map((message) => ({
      id: message._id.toString(),
      content: message.content,
      senderId: message.senderId.toString(),
      senderName: senderMap.get(message.senderId.toString())?.name ?? null,
      senderImage: senderMap.get(message.senderId.toString())?.profileImage ?? null,
      hireRequestId: message.hireRequestId.toString(),
      createdAt: message.createdAt,
    })),
  );
});

router.post("/messages/:hireRequestId", requireAuth, async (req, res) => {
  const hireRequestId = getParam(req.params.hireRequestId);

  if (!hireRequestId || !mongoose.Types.ObjectId.isValid(hireRequestId)) {
    res.status(400).json({ error: "Invalid hire request ID" });
    return;
  }

  const hireRequest = await HireRequest.findById(hireRequestId).lean();

  if (!hireRequest) {
    res.status(404).json({ error: "Hire request not found" });
    return;
  }

  if (hireRequest.clientId.toString() !== req.userId && hireRequest.artistId.toString() !== req.userId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Message content is required" });
    return;
  }

  const message = await Message.create({ content, senderId: req.userId, hireRequestId });
  const sender = await User.findById(req.userId).lean();

  res.status(201).json({
    id: message._id.toString(),
    content: message.content,
    senderId: message.senderId.toString(),
    senderName: sender?.name ?? null,
    senderImage: sender?.profileImage ?? null,
    hireRequestId: message.hireRequestId.toString(),
    createdAt: message.createdAt,
  });
});

export default router;
