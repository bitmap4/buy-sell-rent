const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

// For simplicity, protecting all item routes with auth middleware
router.get('/', auth, itemController.getItems);
router.post('/', auth, itemController.createItem);
router.get('/:id', auth, itemController.getItemById);
router.put('/:id', auth, itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;