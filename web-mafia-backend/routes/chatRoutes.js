const express = require('express');
const { getMessages } = require('../controllers/chatController');
const router = express.Router();

router.get('/:gameId', getMessages);

module.exports = router;
