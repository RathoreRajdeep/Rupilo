const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createTopupRequest,
  getAllTopupRequests,
  approveTopupRequest,
  rejectTopupRequest,
} = require("../controllers/topupRequestController");

const authenticateUser = require("../middleware/auth"); // <-- real auth middleware

// 📌 Create a new top-up request (authenticated users only)
router.post("/", authenticateUser, createTopupRequest);

// 📌 Get all top-up requests (admin only)
router.get("/", authenticateUser, async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, getAllTopupRequests);

// 📌 Approve a top-up request (admin only)
router.put("/:id/approve", authenticateUser, async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, approveTopupRequest);

// 📌 Reject a top-up request (admin only)
router.put("/:id/reject", authenticateUser, async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, rejectTopupRequest);

module.exports = router;
