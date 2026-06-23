const { verifyAccessToken } = require('../config/jwt');
const { error } = require('../utils/response');

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return error(res, 'Authentication required', 'No token provided', 401);
  }

  const user = verifyAccessToken(token);

  if (!user) {
    return error(res, 'Invalid or expired token', 'Token verification failed', 401);
  }

  req.user = user;
  next();
};

module.exports = { authenticate };
