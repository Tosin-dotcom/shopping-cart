const successResponse = (body, message) => {
  return {
    success: true,
    message,
    body
  };
};

const errorResponse = (message, statusCode) => {
  return {
    success: false,
    message,
    statusCode,
    body: null
  };
};

module.exports = {
  successResponse,
  errorResponse
};
