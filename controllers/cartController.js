const { status } = require("http-status");
const { cartService } = require('../services')
const catchAsync = require("../utils/catchAsync");


const addItemToCart = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;
  const cartItem = await cartService.addItemToCart(id, productId, quantity);
  return res.status(status.CREATED).json(cartItem);
});


const incrementCartItemQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const cartItem = await cartService.incrementCartItem(id, productId);
  return res.status(status.OK).json(cartItem);
});


const decrementCartItemQuantity = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const cartItem = await cartService.decrementCartItem(id, productId);
  return res.status(status.OK).json(cartItem);
});


const removeItemFromCart = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  await cartService.removeItemFromCart(id, productId);
  return res.status(status.NO_CONTENT).send();
});



const getCart = catchAsync(async (req, res) => {
  const { id } = req.user;
  const cart = await cartService.getCart(id);
  return res.status(status.OK).json(cart);
});


module.exports = {
  addItemToCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  removeItemFromCart,
  getCart,
};
