const Game = require('../models/Game');
const User = require('../models/User'); // Предполагаем, что у вас есть модель User

exports.createGame = async (req, res) => {
  try {
    const { name, maxPlayers, password, allowBots, mode } = req.body;
    const existingGame = await Game.findOne({ name });
    if (existingGame) {
      return res.status(400).json({ message: 'Game name already taken' });
    }
    const game = new Game({ name, maxPlayers, password, allowBots, mode });
    await game.save();
    res.status(201).json({ gameName: game.name });
  } catch (error) {
    res.status(500).json({ message: 'Error creating game' });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const { name, userName } = req.body;
    const game = await Game.findOne({ name });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    game.players.push(userName);
    await game.save();
    res.json({ message: 'Joined game successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining game' });
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const players = await User.find({}, 'name'); // Предполагаем, что модель User имеет поле name
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching players' });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find({}, 'name status players maxPlayers mode');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
};

exports.getGameByName = async (req, res) => {
  try {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game' });
  }
};

exports.startGame = async (req, res) => {
  try {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    game.status = 'started';
    await game.save();
    res.json({ message: 'Game started successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error starting game' });
  }
};

exports.cancelGame = async (req, res) => {
  try {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    await Game.deleteOne({ name });
    res.json({ message: 'Game canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling game' });
  }
};

exports.addBot = async (req, res) => {
  try {
    const { name } = req.params;
    const game = await Game.findOne({ name });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    if (game.allowBots) {
      game.players.push('Bot');
      await game.save();
    }
    res.json({ message: 'Bot added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bot' });
  }
};
