const { status } = require('http-status');
const { errorResponse } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.log(error)
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
