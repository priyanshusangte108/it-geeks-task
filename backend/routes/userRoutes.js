const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// GET /api/user/profile
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
