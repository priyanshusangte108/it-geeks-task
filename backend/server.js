const express = require("express");
const connectdb = require("./config/db-config");
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MONGO_URI);  
// const errorhandler =  require("./middleware/authMiddleware")
const authroutes = require("./routes/authroutes");

const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  database
connectdb();

// routes
app.use("/api/auth", authroutes);

//  middleware
app.use((req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  next();
});

app.get("/test-auth", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  res.json({ message: "Token received", token });
});

app.get("/", (req, res) => {
  res.send("welcome to api");
});

app.listen(PORT, () => {
  console.log(`server is ready to start at PORT : ${PORT}`);
});
