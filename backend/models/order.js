

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ id: String, title: String, qty: Number, price: Number }],
  shippingInfo: {
    name: String,
    address: String,
    city: String,
    country: String,
    zip: String,
    phone: String,
  },
  total: Number,
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  sessionId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
