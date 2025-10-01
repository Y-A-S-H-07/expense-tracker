import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import txRoutes from "./routes/transactions.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";
mongoose.connect(MONGO)
  .then(() => console.log("db ok"))
  .catch(e => console.error("db err", e));

app.get("/", (req, res) => res.send("Expense tracker api"));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", txRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server on", PORT));
