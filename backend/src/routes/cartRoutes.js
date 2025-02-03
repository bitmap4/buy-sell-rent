const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addItemToCart);
router.delete('/:itemId', auth, cartController.removeItemFromCart);
router.delete('/', auth, cartController.clearCart);

module.exports = router;