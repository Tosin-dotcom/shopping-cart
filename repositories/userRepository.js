const { User } = require('../models');

const createUser = async (userData) => {
  return User.create(userData);
};

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
