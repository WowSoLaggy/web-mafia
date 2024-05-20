const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxPlayers: { type: Number, required: true },
  password: { type: String },
  allowBots: { type: Boolean, default: false },
  mode: { type: String, default: 'classic' },
  status: { type: String, default: 'waiting' },
  players: [{ type: String }]
});

module.exports = mongoose.model('Game', gameSchema);
