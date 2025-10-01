import mongoose from "mongoose";

const txSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true }, // + income, - expense
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Transaction", txSchema);
