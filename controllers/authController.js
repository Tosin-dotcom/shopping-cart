const { status } = require("http-status");
const { authService } = require('../services');
const catchAsync = require("../utils/catchAsync");

/**
 * Registers a new user.
 * @function
 * @async
 * @param {import('express').Request} req - Express request object containing user data (firstName, lastName, email, password).
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON response with the created user.
 */
const registerUser = catchAsync(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const registerResponse = await authService.register({ firstName, lastName, email, password });
    return res
    .status(status.CREATED)
    .json(registerResponse);
});

/**
 * Logs in an existing user.
 * @function
 * @async
 * @param {import('express').Request} req - Express request object containing login credentials (email, password).
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON response with authentication details (token, user details).
 */
const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const loginResponse = await authService.login(email, password);
    return res.status(status.OK).json(loginResponse);
});


module.exports = {
    registerUser,
    loginUser
}
