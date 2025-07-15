// routes/payment.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/create-checkout-session', isAuthenticated, createCheckoutSession);

module.exports = router;
