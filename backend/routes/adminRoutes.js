
const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

router.use(authenticate, authorizeAdmin);

router.get('/orders', adminCtrl.getAllOrders);
router.put('/orders/:id', adminCtrl.updateOrderStatus);

router.get('/users', adminCtrl.getAllUsers);
router.put('/users/:id', adminCtrl.updateUserRole);
router.delete('/users/:id', adminCtrl.deleteUser);

router.get('/analytics/sales', adminCtrl.getSalesByProduct);
router.get('/analytics/revenue', adminCtrl.getRevenueTimeline);
router.get('/stats', adminCtrl.getAdminStats);

module.exports = router;
