
const express = require("express");
const router = express.Router();
const { confirmOrder, getOrders } = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

// Route to manually create order (optional)

router.get("/", authenticate, getOrders);
// Route to confirm Stripe order via sessionId
router.post("/confirm", authenticate, confirmOrder);

module.exports = router;


