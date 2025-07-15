
const stripe = require('../config/stripe');
const order = require('../models/order');

exports.confirmOrder = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'SessionID required' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const items = JSON.parse(session.metadata.cartItems);
    const shippingInfo = JSON.parse(session.metadata.shippingInfo);
    const user = session.metadata.userId;
    const total = session.amount_total / 100;

    const order = await order.create({ user, items, shippingInfo, total, paymentStatus: 'Paid', sessionId });

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not confirm order' });
  }
};
