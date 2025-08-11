const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const validate = require('../middlewares/validate');
const { createUserSchema, loginUserSchema } = require('../validators/userValidator');


router.post('/register', validate(createUserSchema), authController.registerUser);
router.post('/login', validate(loginUserSchema), authController.loginUser);

module.exports = router;
