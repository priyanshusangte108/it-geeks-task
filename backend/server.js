const express = require("express");
const connectdb = require("./config/db-config");
const dotenv = require('dotenv');
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const productroute = require('./routes/productroute')
const authroutes = require("./routes/authroutes");
const { authenticate } = require("./middleware/authMiddleware");
const payment = require('./routes/payment')

const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  database
connectdb();

//  payment 
app.use('/api/payment', payment);

// routes
app.use("/api/auth", authroutes);
app.use("/api/products" ,productroute)

// Log Authorization header middleware
app.use((req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  next();
});



// Test route to check token validity
app.get("/test-auth", authenticate, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});
// 

app.get("/", (req, res) => {
  res.send("welcome to api");
});

app.listen(PORT, () => {
  console.log(`server is ready to start at PORT : ${PORT}`);
});






// 🧾 Checkout Route
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
        unit_amount: Math.round(item.price * 100), // convert dollars to cents
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