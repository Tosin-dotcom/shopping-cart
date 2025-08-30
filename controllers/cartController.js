const { status } = require("http-status");
const { cartService } = require('../services')
const catchAsync = require("../utils/catchAsync");



/**
 * Add an item to the user's cart.
 *
 * @route POST /cart
 * @param {import('express').Request} req - Express request object, containing:
 *   - body: { productId: string, quantity: number }
 *   - user: { id: string }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} 201 with the created cart item
 */
const addItemToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;
  const cartItemResponse = await cartService.addItemToCart(id, productId, quantity);
  return res.status(status.CREATED).json(cartItemResponse);
});


/**
 * Increment the quantity of an item in the user's cart.
 *
 * @route PUT /cart/:productId/increment
 * @param {import('express').Request} req - Express request object, containing:
 *   - params: { productId: string }
 *   - user: { id: string }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} 200 with the updated cart item
 */
const incrementCartItemQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const cartItemResponse = await cartService.incrementCartItem(id, productId);
  return res.status(status.OK).json(cartItemResponse);
});


/**
 * Decrement the quantity of an item in the user's cart.
 *
 * @route PATCH /cart/:productId/decrement
 * @param {import('express').Request} req - Express request object, containing:
 *   - params: { productId: string }
 *   - user: { id: string }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} 200 with the updated cart item
 */
const decrementCartItemQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const cartItemResponse = await cartService.decrementCartItem(id, productId);
  return res.status(status.OK).json(cartItemResponse);
});


/**
 * Remove an item from the user's cart.
 *
 * @route DELETE /cart/:productId
 * @param {import('express').Request} req - Express request object, containing:
 *   - params: { productId: string }
 *   - user: { id: string }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} 204 with no content
 */
const removeItemFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  await cartService.removeItemFromCart(id, productId);
  return res.status(status.NO_CONTENT).send();
});


/**
 * Get the user's entire cart.
 *
 * @route GET /cart
 * @param {import('express').Request} req - Express request object, containing:
 *   - user: { id: string }
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<import('express').Response>} 200 with the cart data
 */
const getCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const cartsResponse = await cartService.getCart(id);
  return res.status(status.OK).json(cartsResponse);
});


module.exports = {
  addItemToCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeItemFromCart,
  getCart,
};
