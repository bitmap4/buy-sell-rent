const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const auth = require('../middleware/auth');

// Start or get current chat session
router.get('/session', auth, supportController.getSession);

// Send message to chatbot
router.post('/message', auth, supportController.sendMessage);

module.exports = router;