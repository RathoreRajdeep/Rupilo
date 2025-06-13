// server/controllers/topupController.js

const TopupRequest = require("../models/TopupRequest");
const User = require("../models/User");

// Create top-up request
exports.createTopupRequest = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(req.user.userId); // 🛡️ Verify auth user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const topupRequest = new TopupRequest({
      user: user._id,
      amount,
      status: "pending",
    });

    await topupRequest.save();
    res.status(201).json(topupRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all top-up requests

exports.getAllTopupRequests = async (req, res) => {
  try {
    const requests = await TopupRequest.find().populate("user", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Approve top-up request
exports.approveTopupRequest = async (req, res) => {
  try {
    const request = await TopupRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "approved";
    request.processedAt = Date.now();
    await request.save();

    const user = await User.findById(request.user);
    user.balance += request.amount;
    await user.save();

    res.json({ message: "Request approved and balance updated", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject top-up request
exports.rejectTopupRequest = async (req, res) => {
  try {
    const request = await TopupRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = "rejected";
    request.processedAt = Date.now();
    await request.save();

    res.json({ message: "Request rejected", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
