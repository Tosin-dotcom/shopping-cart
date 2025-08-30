const { CartItem, Product } = require('../models');


/**
 * Finds a specific cart item for a user and product.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<object|null>} The cart item if found, otherwise null.
 * @throws {Error} If the database query fails.
 */
const findCartItem = async (userId, productId) => {
  return CartItem.findOne({ where: { userId, productId } });
};


/**
 * Adds an item to a user's cart. Increments quantity if the item already exists.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @param {number} [quantity=1] - The quantity to add to the cart.
 * @returns {Promise<object>} The updated or newly created cart item.
 * @throws {Error} If the database operation fails.
 */
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


/**
 * Increments the quantity of a specific cart item by 1.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<object|null>} The updated cart item if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
const incrementCartItem = async (userId, productId) => {
  let cartItem = await findCartItem(userId, productId);
  if (!cartItem) return null;

  cartItem.quantity += 1;
  await cartItem.save();
  return cartItem;
};


/**
 * Decrements the quantity of a specific cart item by 1.
 * If the quantity becomes 0, the item is removed from the cart.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<object|null>} The updated cart item if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
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


/**
 * Removes a specific product from a user's cart.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product to remove.
 * @returns {Promise<number>} The number of rows deleted (0 or 1).
 * @throws {Error} If the database operation fails.
 */
const removeItemFromCart = async (userId, productId) => {
  return await CartItem.destroy({
    where: { userId, productId }
  });
};


/**
 * Retrieves all items in a user's cart along with the subtotal.
 * @async
 * @param {number} userId - The ID of the user.
 * @returns {Promise<{cartItems: object[], subtotal: number}>}
 * An object containing the list of cart items and the subtotal cost.
 * @throws {Error} If the database operation fails.
 */
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


/**
 * Retrieves the quantity of a specific product in a user's cart.
 * @async
 * @param {number} userId - The ID of the user.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<number>} The quantity of the product in the cart, or 0 if not found.
 * @throws {Error} If the database operation fails.
 */
const getProductQuantity = async (userId, productId) => {
  const cartItem = await CartItem.findOne({
    where: { userId, productId },
    attributes: ['quantity'],
  });
  return cartItem ? cartItem.quantity : 0;
};


module.exports = {
  addItemToCart,
  incrementCartItem,
  decrementCartItem,
  removeItemFromCart,
  getCartContents,
  getProductQuantity,
};
