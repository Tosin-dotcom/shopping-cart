const { status } = require("http-status");
const { authService } = require('../services');
const catchAsync = require("../utils/catchAsync");


const registerUser = catchAsync(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await authService.register({ firstName, lastName, email, password });
    return res
    .status(status.CREATED)
    .json(user);
})

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    return res.status(status.OK).json(response);
})

module.exports = {
    registerUser,
    loginUser
}
