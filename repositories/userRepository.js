const { User } = require('../models');


/**
 * Creates a new user record in the database.
 * @async
 * @param {object} userData - The user details to create.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's hashed password.
 * @returns {Promise<object>} The newly created user instance.
 * @throws {Error} If the database operation fails.
 */
const createUser = async (userData) => {
  return User.create(userData);
};


/**
 * Finds a user by their email address.
 * @async
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<object|null>} The user instance if found, otherwise null.
 * @throws {Error} If the database operation fails.
 */
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: ['id', 'email', 'password']
  });
};


module.exports = {
  createUser,
  findUserByEmail
};
