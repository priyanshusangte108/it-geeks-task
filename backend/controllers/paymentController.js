
const stripe = require('../config/stripe');

exports.createCheckoutSession = async (req, res) => {
  const { cartItems, shippingInfo } = req.body;

  // Validate that cartItems exist and is not empty
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    // Prepare line items for Stripe Checkout session
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description || '',
          // You can also add images if you want:
          // images: [item.image] 
        },
        unit_amount: Math.round(item.price * 100), // price in cents
      },
      quantity: item.qty, // qty instead of quantity
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'IN'],
      },
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId: req.user?.id || 'guest',  // fallback if no user auth
        shippingInfo: JSON.stringify(shippingInfo || {}),
      },
    });

    // Return the URL of the checkout page to frontend
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
