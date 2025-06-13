// server/models/TopupRequest.js
const mongoose = require("mongoose");

const topupRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  processedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("TopupRequest", topupRequestSchema);






// nodejs