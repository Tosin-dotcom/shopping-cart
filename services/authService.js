const bcrypt = require('bcryptjs');
const userService = require('./userService');
const ApiError = require("../utils/ApiError");
const { status } = require('http-status');
const {successResponse} = require("../utils/response");
const {sign} = require("jsonwebtoken");


/**
 * Registers a new user.
 *
 * @async
 * @function register
 * @param {Object} params - User registration data.
 * @param {string} params.firstName - The first name of the user.
 * @param {string} params.lastName - The last name of the user.
 * @param {string} params.email - The email address of the user.
 * @param {string} params.password - The plain-text password of the user.
 * @returns {Promise<Object>} A success response containing the newly created user's ID, name, and email.
 * @throws {ApiError} If a user with the given email already exists.
 */

const register = async ({ firstName, lastName, email, password }) => {

  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    throw new ApiError(status.CONFLICT, 'User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userService.createUser({ firstName, lastName, email, password: hashedPassword });
  return successResponse(
      { id: user.id, name: user.name, email: user.email },
      'User registered successfully'
  );
};


/**
 * Authenticates a user and generates a JWT token.
 *
 * @async
 * @function login
 * @param {string} email - The email address of the user attempting to log in.
 * @param {string} password - The plain-text password to verify.
 * @returns {Promise<Object>} A success response containing user details and a signed JWT token.
 * @throws {ApiError} If the email does not exist or the password is incorrect.
 */
const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid email or password");
  }
  const token = sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
  );
  return successResponse(
      {user: {firstName: user.firstName, lastName: user.lastName, email: user.email}, token},
      "Login successful");
};


module.exports = {
  register,
  login
}
