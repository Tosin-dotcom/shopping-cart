const jwt = require('jsonwebtoken');
const {status} = require('http-status');
const ApiError = require('../utils/ApiError');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiError(status.UNAUTHORIZED, "Authorization token missing or invalid")
    }

    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (error) {
    return ApiError(status.UNAUTHORIZED, "Invalid or expired token")
  }
};

module.exports = auth;
