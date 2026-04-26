import mongoose from "mongoose";
import { logger } from "./logger.js";

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
let connectPromise;

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI or MONGODB_URI environment variable is not set");
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(MONGO_URI)
      .then(() => {
        logger.info("Connected to MongoDB");
        return mongoose.connection;
      })
      .catch((err) => {
        connectPromise = undefined;
        logger.error({ err }, "Failed to connect to MongoDB");
        throw err;
      });
  }

  return connectPromise;
}

export function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

export default mongoose;
