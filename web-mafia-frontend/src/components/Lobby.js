import React, { useState } from 'react';
import axios from 'axios';

const Lobby = () => {
  const [gameId, setGameId] = useState('');

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
      const response = await axios.post('/api/game/join', { gameId });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  return (
    <div>
      <button onClick={createGame}>Create Game</button>
      <form onSubmit={joinGame}>
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
        />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
};

export default Lobby;
