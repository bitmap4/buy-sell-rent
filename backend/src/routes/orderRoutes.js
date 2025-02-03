const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Place order using user's cart items.
// It creates an order with generated otp and clears the cart.
router.post('/', auth, orderController.placeOrder);

// Get order history, filtering by query param: type=[pending|bought|sold]
router.get('/', auth, orderController.getOrderHistory);

// Verify OTP provided for a pending order (buyer or seller)
router.post('/verify', auth, orderController.verifyOTP);

// Complete an order (seller action)
router.put('/:orderId/complete', auth, orderController.completeOrder);

module.exports = router;