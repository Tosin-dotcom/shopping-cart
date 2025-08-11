const logger = require('../utils/logger')

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    logger.error(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
