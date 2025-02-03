const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middleware/auth');

router.post('/', auth, purchaseController.createPurchase);

module.exports = router;