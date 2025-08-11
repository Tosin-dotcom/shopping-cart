const bcrypt = require('bcryptjs');
const userService = require('./userService');
const ApiError = require("../utils/ApiError");
const { status } = require('http-status');
const {successResponse} = require("../utils/response");
const {sign} = require("jsonwebtoken");


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
