import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "no token" });
  const token = header.split(" ")[1] || header;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.userId = data.id;
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}
