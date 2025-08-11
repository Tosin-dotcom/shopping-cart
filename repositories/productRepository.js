const { Product, Category } = require('../models');
const { pagedResponse } = require('../utils/pagination');

const createProduct = async (productData) => {
  return Product.create(productData);
};

const getAllProducts = async (page = 1, pageSize = 10) => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const result = await Product.findAndCountAll({
    include: [{
      model: Category,
      as: 'category',
      attributes: ['id', 'name']
    }],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });
  return pagedResponse(result, page, pageSize);
};


const getProductById = async (id) => {
  return await Product.findByPk(id, {
    include: [{
      model: Category,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
};

const updateProduct = async (id, updateData) => {
  const product = await getProductById(id);
  if (!product) {
    return null
  }
  return await product.update(updateData);
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    return null;
  }
  await product.destroy();
  return product;
};

const getProductQuantity = async (productId) => {
  const product = await Product.findByPk(productId, {
    attributes: ['id', 'stockLevel']
  });
  return product ? product.stockLevel : null;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductQuantity,
};
