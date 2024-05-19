module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected');
  
      socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        console.log(`User joined game ${gameId}`);
      });
  
      socket.on('sendMessage', (message) => {
        io.to(message.gameId).emit('newMessage', message);
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  };
  