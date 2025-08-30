const { userRepository } = require("../repositories");

/**
 * Creates a new user using the repository layer.
 *
 * @async
 * @function createUser
 * @param {Object} userData - The data required to create a user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The hashed password of the user.
 * @returns {Promise<Object>} The created user record.
 */
const createUser = async (userData) => {
  return await userRepository.createUser(userData);
};

/**
 * Retrieves a user by their email address.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} The user record if found, otherwise null.
 */
const getUserByEmail = async (email) => {
  return await userRepository.findUserByEmail(email);
};


module.exports = {
  createUser,
  getUserByEmail,
};
