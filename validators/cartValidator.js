const Joi = require('joi');

const addToCartSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required()
});

module.exports = {
  addToCartSchema
}
