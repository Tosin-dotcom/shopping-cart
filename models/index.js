const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const CartItem = require('./cartItem');
const { seedCategories } = require('./seed')
const logger = require('../utils/logger')

const initModels = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database is connected');

    Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' });
    Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });

    CartItem.belongsTo(User, {  as: 'user', foreignKey: 'userId'});
    CartItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

    await sequelize.sync();
    await seedCategories();
  } catch (error) {
    logger.error('Database initialization error '+ error.message);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  CartItem,
  initModels
};
