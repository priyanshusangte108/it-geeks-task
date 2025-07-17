
const order = require('../models/order');
const product = require('../models/product');

exports.getAdminStats = async (req, res) => {
  try {
    const totalProducts = await product.countDocuments();
    const totalOrders = await order.countDocuments();
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin stats." });
  }
};
