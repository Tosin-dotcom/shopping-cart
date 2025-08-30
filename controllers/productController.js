const { status } = require("http-status");
const { productService } = require('../services')
const catchAsync = require("../utils/catchAsync");

/**
 * Create a new product
 * @route POST /products
 * @access Protected
 * @param {Object} req - Express request object
 * @param {Object} req.body - Product data to create
 * @param {Object} res - Express response object
 * @returns {Promise<void>} 201 - Created product response
 */
const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const productResponse = await productService.createProduct(productData);
  return res.status(status.CREATED).json(productResponse);
});

/**
 * Get a paginated list of products
 * @route GET /products
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for pagination
 * @param {number} [req.query.page=1] - Page number
 * @param {number} [req.query.pageSize=10] - Number of items per page
 * @param {Object} res - Express response object
 * @returns {Promise<void>} 200 - Paginated list of products
 */
const getAllProducts = catchAsync(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const paginatedProductsResponse = await productService.getAllProducts(Number(page), Number(pageSize));
  return res.status(status.OK).json(paginatedProductsResponse);
});

/**
 * Get a single product by ID
 * @route GET /products/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Product ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>} 200 - Product object
 */
const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productResponse = await productService.getProductById(id);
  return res.status(status.OK).json(productResponse);
});



/**
 * Update an existing product by ID
 * @route PUT /products/:id
 * @access Protected
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Product ID
 * @param {Object} req.body - Updated product data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} 200 - Updated product object
 */
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedProductResponse = await productService.updateProduct(id, updateData);
  return res.status(status.OK).json(updatedProductResponse);
});

/**
 * Delete a product by ID
 * @route DELETE /products/:id
 * @access Protected
 * @param {Object} req - Express request object
 * @param {string} req.params.id - Product ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>} 200 - Deleted product object
 */
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedProductResponse = await productService.deleteProduct(id);
  return res.status(status.OK).json(deletedProductResponse);
});


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

