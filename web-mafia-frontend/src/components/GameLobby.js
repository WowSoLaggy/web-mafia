import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GameLobby = () => {
  const { name } = useParams();
  const [game, setGame] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/api/game/${name}`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();

    const userName = localStorage.getItem('userName');
    if (userName) {
      setUserName(userName);
    }
  }, [name]);

  const startGame = async () => {
    try {
      await axios.post(`/api/game/${name}/start`);
      navigate(`/play/${name}`);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const cancelGame = async () => {
    try {
      await axios.post(`/api/game/${name}/cancel`);
      navigate('/lobby');
    } catch (error) {
      console.error('Error canceling game:', error);
    }
  };

  const addBot = async () => {
    try {
      await axios.post(`/api/game/${name}/add-bot`);
      const response = await axios.get(`/api/game/${name}`);
      setGame(response.data);
    } catch (error) {
      console.error('Error adding bot:', error);
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Game Lobby: {name}</h1>
      <div>
        <h2>Players</h2>
        <ul>
          {game.players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Game Settings</h2>
        <p>Max Players: {game.maxPlayers}</p>
        <p>Allow Bots: {game.allowBots ? 'Yes' : 'No'}</p>
        <p>Mode: {game.mode}</p>
      </div>
      <div>
        {game.allowBots && <button onClick={addBot}>Add Bot</button>}
        <button onClick={startGame}>Start Game</button>
        <button onClick={cancelGame}>Cancel Game</button>
      </div>
    </div>
  );
};

export default GameLobby;
