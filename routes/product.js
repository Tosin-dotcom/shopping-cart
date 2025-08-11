const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const validate = require('../middlewares/validate');

const { createProductSchema, updateProductSchema } = require('../validators/productValidator');


router.post('/', validate(createProductSchema), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;