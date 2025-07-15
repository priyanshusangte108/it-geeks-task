const express = require('express');
const router = express.Router();
const { confirmOrder } = require('../controllers/orderController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/confirm', isAuthenticated, confirmOrder);

module.exports = router;
