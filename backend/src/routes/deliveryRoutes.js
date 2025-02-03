const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../middleware/auth');

// Get pending deliveries for the seller
router.get('/', auth, deliveryController.getPendingDeliveries);

// Complete delivery for an order by verifying OTP
router.post('/:orderId/complete', auth, deliveryController.completeDelivery);

module.exports = router;