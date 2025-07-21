const order = require("../models/order");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Confirm Stripe order by sessionId
exports.confirmOrder = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "sessionId is required" });
  }

  try {
    // Retrieve Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Check if order exists to prevent duplicates
    const existingOrder = await order.findOne({ sessionId });
    if (existingOrder) {
      return res.status(200).json({ order: existingOrder });
    }

    // Create new order
    const newOrder = new Order({
      user: req.user._id,
      sessionId: sessionId,
      total: session.amount_total / 100,
      paymentStatus: session.payment_status,
      items: session.display_items || [], // Optional: map to your schema shape if needed
      customerEmail: session.customer_details?.email,
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error("Order confirm error:", error);
    res.status(500).json({ message: "Failed to confirm order" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';

    const orders = isAdmin
      ? await order.find().populate('user', 'name email')
      : await order.find({ user: req.user._id });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

