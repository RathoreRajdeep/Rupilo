const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET /api/profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name email phone vpa balance");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Add this route to profileRoutes.js

router.get("/all", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select("name email phone vpa balance isAdmin");
    res.json(users);
  } catch (err) {
    console.error("Admin Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
