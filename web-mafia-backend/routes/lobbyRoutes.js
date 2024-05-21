const express = require('express');
const router = express.Router();
const lobbyController = require('../controllers/lobbyController');
const authController = require('../controllers/authController');

// Применяем middleware для проверки токена ко всем маршрутам лобби
router.use(authController.authenticateToken);

router.get('/', lobbyController.getLobby);

module.exports = router;
