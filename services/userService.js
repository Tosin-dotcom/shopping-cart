const { userRepository } = require("../repositories");


const createUser = async (userData) => {

  return await userRepository.createUser(userData);
};

const getUserByEmail = async (email) => {

  return await userRepository.findUserByEmail(email);
};


module.exports = {
  createUser,
  getUserByEmail,
};
