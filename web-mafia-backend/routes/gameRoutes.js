const express = require('express');
const {
  createGame,
  joinGame,
  getPlayers,
  getGames,
  getGameByName,
  startGame,
  cancelGame,
  addBot
} = require('../controllers/gameController');
const router = express.Router();

router.post('/create', createGame);
router.post('/join', joinGame);
router.get('/players', getPlayers);
router.get('/games', getGames);
router.get('/:name', getGameByName);
router.post('/:name/start', startGame);
router.post('/:name/cancel', cancelGame);
router.post('/:name/add-bot', addBot);

module.exports = router;
