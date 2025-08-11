const { status } = require("http-status");
const { productService } = require('../services')
const catchAsync = require("../utils/catchAsync");


const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const product = await productService.createProduct(productData);
  return res.status(status.CREATED).json(product);
});

const getAllProducts = catchAsync(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const paginatedProducts = await productService.getAllProducts(Number(page), Number(pageSize));
  return res.status(status.OK).json(paginatedProducts);
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  return res.status(status.OK).json(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updatedProduct = await productService.updateProduct(id, updateData);
  return res.status(status.OK).json(updatedProduct);
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  return res.status(status.OK).json(deletedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

