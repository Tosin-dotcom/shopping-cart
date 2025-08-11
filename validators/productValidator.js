const Joi = require('joi');

const createProductSchema = Joi.object({
  sku: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  description: Joi.string().allow(null, '').optional(),
  price: Joi.number().precision(2).positive().required(),
  stockLevel: Joi.number().integer().min(0).required(),
  categoryId: Joi.number().integer().required()
});

const updateProductSchema = Joi.object({
  sku: Joi.string().min(3).optional(),
  name: Joi.string().min(3).optional(),
  description: Joi.string().allow(null, '').optional(),
  price: Joi.number().precision(2).positive().optional(),
  stockLevel: Joi.number().integer().min(0).optional(),
  categoryId: Joi.number().integer().optional()
}).min(1);

module.exports = {
  createProductSchema,
  updateProductSchema,
};
