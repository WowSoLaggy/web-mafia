import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from './Chat';
import { SocketContext } from '../contexts/SocketContext';

const Game = () => {
  const { gameId } = useParams();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinGame', gameId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameId, socket]);

  return (
    <div>
      <h1>Game ID: {gameId}</h1>
      <Chat gameId={gameId} messages={messages} />
    </div>
  );
};

export default Game;
