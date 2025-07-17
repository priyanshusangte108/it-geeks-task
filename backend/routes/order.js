
// const express = require("express");
// const router = express.Router();
// const { createOrder, confirmOrder } = require("../controllers/orderController");
// const { authenticate } = require("../middleware/authMiddleware");

// // Route to manually create order (optional)
// router.post("/", authenticate, createOrder);

// // Route to confirm Stripe order via sessionId
// router.post("/confirm", authenticate, confirmOrder);

// module.exports = router;





const express = require("express");
const router = express.Router();
const { createOrder, confirmOrder } = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

// Route to manually create order (optional)
router.get("/", authenticate, createOrder);

// Route to confirm Stripe order via sessionId
router.post("/confirm", authenticate, confirmOrder);

module.exports = router;



