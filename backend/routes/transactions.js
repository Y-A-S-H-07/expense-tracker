import express from "express";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tx = await Transaction.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(tx);
  } catch {
    res.status(500).json({ error: "server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, amount } = req.body;
    if (!title || amount === undefined) return res.status(400).json({ error: "missing fields" });
    const newTx = await Transaction.create({ userId: req.userId, title, amount });
    res.json(newTx);
  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "not found" });
    if (String(tx.userId) !== String(req.userId)) return res.status(401).json({ error: "not allowed" });
    await tx.deleteOne();
    res.json({ id: req.params.id });
  } catch {
    res.status(500).json({ error: "server error" });
  }
});

export default router;
