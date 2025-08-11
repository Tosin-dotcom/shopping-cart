const express = require('express');
const router = express.Router();
const { cartController } = require('../controllers');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

const { addToCartSchema } = require('../validators/cartValidator');

router.post('/', auth, validate(addToCartSchema), cartController.addItemToCart);
router.put('/:productId/increment', auth, cartController.incrementCartItemQuantity);
router.put('/:productId/decrement', auth, cartController.decrementCartItemQuantity);
router.delete('/:productId', auth, cartController.removeItemFromCart);
router.get('/', auth, cartController.getCart);

module.exports = router;
