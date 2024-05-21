const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');

// Применяем middleware для проверки токена ко всем маршрутам игры
router.use(authController.authenticateToken);

router.post('/create', gameController.createGame);
router.post('/join', gameController.joinGame);
router.get('/players', gameController.getPlayers);
router.get('/games', gameController.getGames);
router.get('/:name', gameController.getGameByName);
router.post('/:name/start', gameController.startGame);
router.post('/:name/cancel', gameController.cancelGame);
router.post('/:name/add-bot', gameController.addBot);

module.exports = router;
