const ChatMessage = require('../models/ChatMessage');

exports.getMessages = async (req, res) => {
  try {
    const { gameId } = req.params;
    const messages = await ChatMessage.find({ gameId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
