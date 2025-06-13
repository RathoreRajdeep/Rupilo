const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

// GET /api/transactions/my
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .sort({ timestamp: -1 })
      .populate("sender", "email name vpa") // populate sender
      .populate("receiver", "email name vpa"); // populate receiver

    res.json(transactions);
  } catch (err) {
    console.error("Transaction Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
