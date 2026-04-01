import { Router } from "express";
import mongoose from "mongoose";
import { HireRequest } from "../models/HireRequest.js";
import { User } from "../models/User.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

function getParam(value) {
  return typeof value === "string" ? value : null;
}

router.post("/hire/:artistId", requireAuth, async (req, res) => {
  const artistId = getParam(req.params.artistId);

  if (req.userRole !== "client") {
    res.status(403).json({ error: "Only clients can send hire requests" });
    return;
  }

  if (!artistId || !mongoose.Types.ObjectId.isValid(artistId)) {
    res.status(400).json({ error: "Invalid artist ID" });
    return;
  }

  const artist = await User.findById(artistId).lean();

  if (!artist || artist.role !== "artist") {
    res.status(404).json({ error: "Artist not found" });
    return;
  }

  const { title, description, budget, deadline } = req.body;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  const hireRequest = await HireRequest.create({
    title,
    description,
    budget,
    deadline,
    status: "pending",
    clientId: req.userId,
    artistId,
  });

  const client = await User.findById(req.userId).lean();

  res.status(201).json({
    id: hireRequest._id.toString(),
    title: hireRequest.title,
    description: hireRequest.description,
    budget: hireRequest.budget,
    deadline: hireRequest.deadline,
    status: hireRequest.status,
    clientId: hireRequest.clientId.toString(),
    artistId: hireRequest.artistId.toString(),
    clientName: client?.name ?? null,
    clientEmail: client?.email ?? null,
    clientPhoneNumber: client?.phoneNumber ?? null,
    artistName: artist?.name ?? null,
    artistEmail: artist?.email ?? null,
    artistPhoneNumber: artist?.phoneNumber ?? null,
    createdAt: hireRequest.createdAt,
  });
});

router.get("/hire/requests", requireAuth, async (req, res) => {
  const filter = req.userRole === "artist"
    ? { artistId: req.userId }
    : { clientId: req.userId };

  const requests = await HireRequest.find(filter).sort({ createdAt: -1 }).lean();
  const userIds = [...new Set([
    ...requests.map((request) => request.clientId.toString()),
    ...requests.map((request) => request.artistId.toString()),
  ])];

  const users = await User.find({ _id: { $in: userIds } }).lean();
  const userMap = new Map(users.map((user) => [user._id.toString(), user]));

  res.json(
    requests.map((request) => ({
      id: request._id.toString(),
      title: request.title,
      description: request.description,
      budget: request.budget,
      deadline: request.deadline,
      status: request.status,
      clientId: request.clientId.toString(),
      artistId: request.artistId.toString(),
      clientName: userMap.get(request.clientId.toString())?.name ?? null,
      clientEmail: userMap.get(request.clientId.toString())?.email ?? null,
      clientPhoneNumber: userMap.get(request.clientId.toString())?.phoneNumber ?? null,
      artistName: userMap.get(request.artistId.toString())?.name ?? null,
      artistEmail: userMap.get(request.artistId.toString())?.email ?? null,
      artistPhoneNumber: userMap.get(request.artistId.toString())?.phoneNumber ?? null,
      createdAt: request.createdAt,
    })),
  );
});

router.patch("/hire/requests/:id/status", requireAuth, async (req, res) => {
  const id = getParam(req.params.id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid request ID" });
    return;
  }

  const request = await HireRequest.findById(id);

  if (!request) {
    res.status(404).json({ error: "Hire request not found" });
    return;
  }

  if (request.artistId.toString() !== req.userId && request.clientId.toString() !== req.userId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const { status } = req.body;
  if (!["accepted", "declined", "completed"].includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  request.status = status;
  await request.save();

  const [client, artist] = await Promise.all([
    User.findById(request.clientId).lean(),
    User.findById(request.artistId).lean(),
  ]);

  res.json({
    id: request._id.toString(),
    title: request.title,
    description: request.description,
    budget: request.budget,
    deadline: request.deadline,
    status: request.status,
    clientId: request.clientId.toString(),
    artistId: request.artistId.toString(),
    clientName: client?.name ?? null,
    clientEmail: client?.email ?? null,
    clientPhoneNumber: client?.phoneNumber ?? null,
    artistName: artist?.name ?? null,
    artistEmail: artist?.email ?? null,
    artistPhoneNumber: artist?.phoneNumber ?? null,
    createdAt: request.createdAt,
  });
});

export default router;
