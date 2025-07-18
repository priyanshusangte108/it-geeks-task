
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    order.status = req.body.status;
    await order.save();
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role').sort({ createdAt: -1 });
    res.json({ users });
  } catch {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    user.role = req.body.role;
    await user.save();
    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Failed to update role.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted.' });
  } catch {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

exports.getSalesByProduct = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.title',
          qty: { $sum: '$items.qty' }
        }
      }
    ]);
    res.json({ data });
  } catch {
    res.status(500).json({ error: 'Failed to fetch sales data.' });
  }
};

exports.getRevenueTimeline = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json({ data });
  } catch {
    res.status(500).json({ error: 'Failed to fetch revenue data.' });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenueRes = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    res.json({
      totalProducts,
      totalOrders,
      totalRevenue: revenueRes[0]?.total || 0
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
};
