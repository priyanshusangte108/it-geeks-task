// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
// console.log('Authorization Header:', authHeader);
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization header missing or malformed' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authMiddleware;


//  middlewareconst jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains user ID and role
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};




// //  middleware
// app.use((req, res, next) => {
//   console.log("Authorization Header:", req.headers.authorization);
//   next();
// });

// app.get("/test-auth", (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Authorization header missing or malformed" });
//   }

//   const token = authHeader.split(" ")[1];
//   res.json({ message: "Token received", token });
// });