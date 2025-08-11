const { productRepository } = require('../repositories')
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const { successResponse } = require('../utils/response');

const PRODUCT_NOT_FOUND = 'Product not found';


const createProduct = async (productData) => {
  const product =  await productRepository.createProduct(productData);
  return successResponse(product, 'Product created');
};

const getAllProducts = async (page, pageSize) => {
  const products = await productRepository.getAllProducts(page, pageSize);
  return successResponse(products, 'Products found');
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new ApiError(status.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return successResponse(product, 'Product found');
};

const updateProduct = async (id, updateData) => {
  const updatedProduct = await productRepository.updateProduct(id, updateData);
  if (!updatedProduct) {
    throw new ApiError(status.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return successResponse(updatedProduct, 'Product updated');
};

const deleteProduct = async (id) => {
  const deletedProduct = await productRepository.deleteProduct(id);
  if (!deletedProduct) {
    throw new ApiError(status.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return successResponse(deletedProduct, 'Product deleted');
};

const getProductQuantity = async (id) => {

  const quantity = await productRepository.getProductQuantity(id)
  if (!quantity) {
    throw new ApiError(status.NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return quantity;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductQuantity
};
