const { Product, Category } = require('../models');
const { pagedResponse } = require('../utils/pagination');


/**
 * Creates a new product record in the database.
 * @async
 * @param {object} productData - The details of the product to create.
 * @param {string} productData.name - The product name.
 * @param {string} productData.description - The product description.
 * @param {number} productData.price - The product price.
 * @param {number} productData.stockLevel - The initial stock level.
 * @param {number} productData.categoryId - The ID of the category this product belongs to.
 * @returns {Promise<object>} The newly created product instance.
 * @throws {Error} If the database operation fails.
 */
const createProduct = async (productData) => {
  return Product.create(productData);
};


/**
 * Retrieves a paginated list of products, including their categories.
 * @async
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [pageSize=10] - The number of products per page.
 * @returns {Promise<object>} An object containing product data, total count, and pagination details.
 * @throws {Error} If the database operation fails.
 */
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


/**
 * Finds a product by its primary key (ID), including its category.
 * @async
 * @param {number} id - The ID of the product to retrieve.
 * @returns {Promise<object|null>} The product instance if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
const getProductById = async (id) => {
  return await Product.findByPk(id, {
    include: [{
      model: Category,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
};

/**
 * Updates an existing product with the given data.
 * @async
 * @param {number} id - The ID of the product to update.
 * @param {object} updateData - The fields to update for the product.
 * @returns {Promise<object|null>} The updated product instance if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
const updateProduct = async (id, updateData) => {
  const product = await getProductById(id);
  if (!product) {
    return null;
  }
  return await product.update(updateData);
};


/**
 * Deletes a product by its ID.
 * @async
 * @param {number} id - The ID of the product to delete.
 * @returns {Promise<object|null>} The deleted product instance if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    return null;
  }
  await product.destroy();
  return product;
};

/**
 * Retrieves the available stock level for a product.
 * @async
 * @param {number} productId - The ID of the product.
 * @returns {Promise<number|null>} The stock level if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
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
