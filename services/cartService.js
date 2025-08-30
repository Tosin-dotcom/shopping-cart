const { cartRepository } = require('../repositories');
const productService = require('./productService');
const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const { successResponse } = require('../utils/response');

const CART_ITEM_NOT_FOUND = 'Cart item does not exist. Please add it to your cart first';
const PRODUCT_OUT_OF_STOCK = 'Requested quantity exceeds available stock';


/**
 * Adds an item to the user's cart.
 *
 * @async
 * @function addItemToCart
 * @param {number} userId - ID of the user whose cart is being updated.
 * @param {number} productId - ID of the product to add.
 * @param {number} [quantity=1] - Number of units to add (default is 1).
 * @returns {Promise<Object>} A success response containing the updated or newly created cart item.
 * @throws {ApiError} If requested quantity exceeds available stock.
 */
const addItemToCart = async (userId, productId, quantity = 1) => {
  const availableQuantity = await productService.getProductQuantity(productId);
  if (quantity > availableQuantity) {
    throw new ApiError(status.BAD_REQUEST, PRODUCT_OUT_OF_STOCK);
  }
  const cartItem = await cartRepository.addItemToCart(userId, productId, quantity);
  return successResponse(cartItem, 'Cart item added');
};


/**
 * Increments the quantity of a product in the user's cart by 1.
 *
 * @async
 * @function incrementCartItem
 * @param {number} userId - ID of the user whose cart item is being incremented.
 * @param {number} productId - ID of the product to increment.
 * @returns {Promise<Object>} A success response containing the updated cart item.
 * @throws {ApiError} If the product is out of stock or the cart item does not exist.
 */
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


/**
 * Decrements the quantity of a product in the user's cart by 1.
 * Removes the item entirely if quantity would fall below 1.
 *
 * @async
 * @function decrementCartItem
 * @param {number} userId - ID of the user whose cart item is being decremented.
 * @param {number} productId - ID of the product to decrement.
 * @returns {Promise<Object>} A success response containing the updated cart item.
 * @throws {ApiError} If the cart item does not exist.
 */
const decrementCartItem = async (userId, productId) => {
  const cartItem = await cartRepository.decrementCartItem(userId, productId);
  if (!cartItem) {
    throw new ApiError(status.NOT_FOUND, CART_ITEM_NOT_FOUND);
  }
  return successResponse(cartItem, 'Cart item decreased');
};


/**
 * Removes a product entirely from the user's cart.
 *
 * @async
 * @function removeItemFromCart
 * @param {number} userId - ID of the user whose cart item is being removed.
 * @param {number} productId - ID of the product to remove.
 * @returns {Promise<Object>} A success response confirming removal.
 * @throws {ApiError} If the cart item does not exist.
 */
const removeItemFromCart = async (userId, productId) => {
  const deletedCount = await cartRepository.removeItemFromCart(userId, productId);
  if (deletedCount === 0) {
    throw new ApiError(status.NOT_FOUND, CART_ITEM_NOT_FOUND);
  }
  return successResponse(true, 'Cart item removed');
};



/**
 * Retrieves all items in a user's cart along with subtotal.
 *
 * @async
 * @function getCart
 * @param {number} userId - ID of the user whose cart is being retrieved.
 * @returns {Promise<Object>} A success response containing cart items and subtotal.
 */
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
