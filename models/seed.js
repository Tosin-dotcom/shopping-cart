const Category = require('./Category');
const logger = require('../utils/logger')

const categories = [
  { name: 'Electronics', description: 'Gadgets, devices, and tech' },
  { name: 'Clothing', description: 'Apparel for men and women' },
  { name: 'Books', description: 'Printed and digital books' },
  { name: 'Home & Kitchen', description: 'Household appliances and kitchenware' },
  { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
  { name: 'Beauty & Personal Care', description: 'Cosmetics and personal care products' },
  { name: 'Toys & Games', description: 'Toys, games, and entertainment' },
  { name: 'Automotive', description: 'Vehicle parts and accessories' },
  { name: 'Health & Wellness', description: 'Health supplements and wellness products' },
  { name: 'Office Supplies', description: 'Office and school supplies' },
];

async function seedCategories() {
  for (const cat of categories) {
    await Category.findOrCreate({
      where: { name: cat.name },
      defaults: cat,
    });
  }
  logger.info('Categories seeded');
}

module.exports = {
  seedCategories,
};
