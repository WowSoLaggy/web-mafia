const Game = require('../models/Game');

exports.createGame = async (req, res) => {
  try {
    const game = new Game();
    await game.save();
    res.status(201).json({ gameId: game._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game' });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const { gameId } = req.body;
    const game = await Game.findById(gameId);
    game.players.push(req.user.userId);
    await game.save();
    res.json({ message: 'Joined game successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining game' });
  }
};
