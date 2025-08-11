const { status } = require('http-status');
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  return res.status(statusCode).json(
      errorResponse(message, statusCode)
  );
};

module.exports = errorHandler;
