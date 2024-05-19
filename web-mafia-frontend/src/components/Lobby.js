import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lobby = () => {
  const [gameId, setGameId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const createGame = async () => {
    try {
      const response = await axios.post('/api/game/create');
      setGameId(response.data.gameId);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const joinGame = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/game/join', { gameId, userName });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <button onClick={createGame}>Create Game</button>
      <form onSubmit={joinGame}>
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
          required
        />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
};

export default Lobby;
