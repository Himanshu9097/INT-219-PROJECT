import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set");
}

export async function connectMongo() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}

export default mongoose;
