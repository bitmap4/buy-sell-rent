const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.getProfile);
router.put('/', auth, userController.updateProfile);
router.post('/:userId/rate', auth, userController.rateUser);

module.exports = router;