import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SESSION_SECRET || "artfolio-secret-key";

export function generateToken(userId, role) {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}
