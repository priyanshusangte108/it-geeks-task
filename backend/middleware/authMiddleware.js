
const jwt = require('jsonwebtoken');

// ✅ Middleware: Verify token and attach user to request
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Middleware: Check if user is admin
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};




// const jwt = require('jsonwebtoken');

// exports.authenticate = (req, res, next) => {
//   const header = req.headers.authorization;
//   if (!header || !header.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized.' });
//   }
//   try {
//     const token = header.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.id, role: decoded.role };
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid or expired token.' });
//   }
// };

// exports.authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required.' });
//   }
//   next();
// };
