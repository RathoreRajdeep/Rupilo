// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { sendPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth'); // for JWT verification

router.post('/send', authMiddleware, sendPayment);

module.exports = router;
