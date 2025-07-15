// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // adjust based on your JWT payload
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
