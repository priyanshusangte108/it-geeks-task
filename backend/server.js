
const express = require("express");
const connectdb = require("./config/db-config");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const productroute = require("./routes/productroute");
const authroutes = require("./routes/authroutes");
const { authenticate } = require("./middleware/authMiddleware");
const payment = require("./routes/payment");
const userRoutes = require("./routes/userRoutes");
const order = require("./routes/order");
const adminRoutes = require("./routes/adminRoutes")
const app = express();
const PORT = process.env.PORT || 2020;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectdb();

// Log Authorization header middleware for debugging auth
app.use((req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  next();
});

// Routes
app.use("/api/auth", authroutes);
app.use("/api/products", productroute);
app.use("/api/user", userRoutes);
app.use("/api/payment", payment);
app.use("/api/orders", order);
app.use("/api/admin", adminRoutes)

// Test route to check token validity
app.get("/test-auth", authenticate, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to API");
});

// Stripe Checkout route - create session
app.post("/api/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "No cart items provided." });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    res.status(500).json({ error: "Failed to create Stripe session." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is ready at PORT: ${PORT}`);
});
