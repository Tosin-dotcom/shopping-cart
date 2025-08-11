const { CartItem, Product } = require('../models');

const findCartItem = async (userId, productId) => {
  return CartItem.findOne({ where: { userId, productId } });
};

const addItemToCart = async (userId, productId, quantity = 1) => {
  let cartItem = await findCartItem(userId, productId);

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ userId, productId, quantity });
  }

  return cartItem;
};


const incrementCartItem = async (userId, productId) => {
  let cartItem = await findCartItem(userId, productId);
  if (!cartItem) return null;

  cartItem.quantity += 1;
  await cartItem.save();
  return cartItem;
};

const decrementCartItem = async (userId, productId) => {
  let cartItem = await findCartItem(userId, productId);

  if (!cartItem) return null;

  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    await cartItem.save();
  } else {
    await cartItem.destroy();
  }

  return cartItem;
};


const removeItemFromCart = async (userId, productId) => {
  return await CartItem.destroy({
    where: { userId, productId }
  });
};

const getCartContents = async (userId) => {
  const cartItems = await CartItem.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['sku', 'name', 'price', 'description']
      }
    ]
  });
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.quantity * parseFloat(item.product.price);
  }, 0);

  return { cartItems, subtotal };
};


const getProductQuantity = async (userId, productId) => {
  const cartItem = await CartItem.findOne({
    where: { userId, productId },
    attributes: ['quantity'],
  });
  return cartItem ? cartItem.quantity : 0;
}

module.exports = {
  addItemToCart,
  incrementCartItem,
  decrementCartItem,
  removeItemFromCart,
  getCartContents,
  getProductQuantity,
};
