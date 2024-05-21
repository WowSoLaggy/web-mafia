// controllers/lobbyController.js
exports.getLobby = (req, res) => {
    res.status(200).json({ message: 'Welcome to the lobby!', user: req.user });
  };
  