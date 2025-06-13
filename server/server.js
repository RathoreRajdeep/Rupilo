const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Transaction routes
app.use("/api/transactions", require("./routes/transactionRoutes"));
// Profile routes
const profileRoutes = require('./routes/profileRoutes');
app.use("/api/profile", profileRoutes);

// Payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes); // ✅ Now /api/payments/send will work

// ✅ Mount /api/auth routes FIRST
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ✅ Only apply mock user AFTER /api/auth
// app.use((req, res, next) => {
//   req.user = {
//     _id: "684783b330d410303df5ec19", // Replace later
//     isAdmin: false,
//   };
//   next();
// });
const authenticate = require("./middleware/auth");

// 👇 Top-up routes
const topupRequestRoutes = require("./routes/topupRequest");
app.use("/api/topup-requests", authenticate, topupRequestRoutes);


// Root
app.get("/", (req, res) => {
  res.send("Welcome to Rupilo API 🚀");
});

// MongoDB + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
