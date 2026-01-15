console.log('>>> authMiddleware LOADED');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  console.log('>>> authMiddleware RUNNING →', req.method, req.path);

  // ✅ If no Authorization header
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.status(401).json({ error: 'Not authorized - no token' });
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    return next(); // 🔴 VERY IMPORTANT: return here
  } catch (error) {
    console.error('Token error:', error.message);
    return res.status(401).json({ error: 'Not authorized - invalid token' });
  }
};

module.exports = protect;
