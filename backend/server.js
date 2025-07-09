const express = require("express");
const connectdb = require("./config/db-config");
const dotenv = require('dotenv');
dotenv.config();

const productroute = require('./routes/productroute')
const authroutes = require("./routes/authroutes");
const { authenticate } = require("./middleware/authMiddleware");


const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  database
connectdb();

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




