const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const checkLoggedIn = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized please check' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden' });
    }
  };
};

module.exports = {
  checkLoggedIn,
  checkRole,
};
