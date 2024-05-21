const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const config = require('./config');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const gameRoutes = require('./routes/gameRoutes');
const healthRoutes = require('./routes/healthRoutes');
const lobbyRoutes = require('./routes/lobbyRoutes');

const socketHandler = require('./sockets/socket');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Установите strictQuery в true или false в зависимости от ваших предпочтений
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/health', healthRoutes);
    app.use('/api/game', gameRoutes);
    app.use('/api/chat', chatRoutes);
    app.use('/api/lobby', lobbyRoutes);

    socketHandler(io);

    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Завершение работы процесса, если база данных недоступна
  });
