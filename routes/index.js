const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const productRoutes = require('./product');
const cartRoutes = require('./cart');

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

module.exports = router;
