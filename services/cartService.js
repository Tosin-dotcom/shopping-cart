const { cartRepository } = require('../repositories');
const productService = require('./productService');
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const { successResponse } = require('../utils/response');

const CART_ITEM_NOT_FOUND = 'Cart item does not exist. Please add it to your cart first';
const PRODUCT_OUT_OF_STOCK = 'Requested quantity exceeds available stock';


const addItemToCart = async (userId, productId, quantity = 1) => {
  const availableQuantity = await productService.getProductQuantity(productId);
  if (quantity > availableQuantity) {
    throw new ApiError(status.BAD_REQUEST, PRODUCT_OUT_OF_STOCK);
  }
  const cartItem = await cartRepository.addItemToCart(userId, productId, quantity);
  return successResponse(cartItem, 'Cart item added');
};

const incrementCartItem = async (userId, productId) => {

  const availableQuantity = await productService.getProductQuantity(productId);
  const quantity =  await cartRepository.getProductQuantity(userId, productId) + 1
  if (quantity > availableQuantity) {
    throw new ApiError(status.BAD_REQUEST, PRODUCT_OUT_OF_STOCK);
  }
  const cartItem = await cartRepository.incrementCartItem(userId, productId);
  if (!cartItem) {
    throw new ApiError(status.NOT_FOUND, CART_ITEM_NOT_FOUND);
  }
  return successResponse(cartItem, 'Cart item increased');
};


const decrementCartItem = async (userId, productId) => {
  const cartItem = await cartRepository.decrementCartItem(userId, productId);
  if (!cartItem) {
    throw new ApiError(status.NOT_FOUND, CART_ITEM_NOT_FOUND);
  }
  return successResponse(cartItem, 'Cart item decreased');
};


const removeItemFromCart = async (userId, productId) => {
  const deletedCount = await cartRepository.removeItemFromCart(userId, productId);
  if (deletedCount === 0) {
    throw new ApiError(status.NOT_FOUND, CART_ITEM_NOT_FOUND);
  }
  return successResponse(true, 'Cart item removed');
};

const getCart = async (userId) => {
  const cartItems = await cartRepository.getCartContents(userId);
  return successResponse(cartItems, 'Cart items returned');
};


module.exports = {
  addItemToCart,
  incrementCartItem,
  decrementCartItem,
  removeItemFromCart,
  getCart,
};
