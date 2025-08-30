const { status } = require('http-status');
const { errorResponse } = require('../utils/response');
const logger = require("../utils/logger");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      logger.error(error)
      return res
      .status(status.BAD_REQUEST)
      .json(
          errorResponse(
              error.details.map(d => d.message).join(', '),
              status.BAD_REQUEST
          )
      );
    }

    next();
  };
};

module.exports = validate;
