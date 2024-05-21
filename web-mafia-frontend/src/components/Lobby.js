import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Lobby = () => {
  const [userName, setUserName] = useState('');
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [newGameSettings, setNewGameSettings] = useState({
    name: '',
    maxPlayers: 10,
    password: '',
    allowBots: false,
    mode: 'classic'
  });
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }

    const fetchPlayersAndGames = async () => {
      try {
        const [playersResponse, gamesResponse] = await Promise.all([
          axios.get('/api/game/players', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get('/api/game/games', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);
        setPlayers(playersResponse.data);
        setGames(gamesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token) {
      fetchPlayersAndGames();
    }
  }, [token, user]);

  const createGame = async () => {
    if (!newGameSettings.name.trim()) {
      alert('Game name is required');
      return;
    }
    try {
      const response = await axios.post('/api/game/create', newGameSettings, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/game/${response.data.gameName}`);
    } catch (error) {
      console.error('Error creating game:', error);
      alert(error.response.data.message);
    }
  };

  const joinGame = async (gameName) => {
    try {
      const response = await axios.post('/api/game/join', { name: gameName, userName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.message);
      navigate(`/game/${gameName}`);
    } catch (error) {
      console.error('Error joining game:', error);
      alert(error.response.data.message);
    }
  };

  const handleNewGameSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGameSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="container">
      <h1>Welcome, {userName}</h1>
      <div className="create-game">
        <h2>Create New Game</h2>
        <form onSubmit={(e) => { e.preventDefault(); createGame(); }}>
          <div className="form-group">
            <label>Game Name:</label>
            <input
              type="text"
              name="name"
              value={newGameSettings.name}
              onChange={handleNewGameSettingsChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Max Players:</label>
            <input
              type="number"
              name="maxPlayers"
              value={newGameSettings.maxPlayers}
              onChange={handleNewGameSettingsChange}
              min="1"
              max="20"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={newGameSettings.password}
              onChange={handleNewGameSettingsChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <label>Allow Bots:</label>
            <input
              type="checkbox"
              name="allowBots"
              checked={newGameSettings.allowBots}
              onChange={handleNewGameSettingsChange}
            />
          </div>
          <div className="form-group">
            <label>Mode:</label>
            <select
              name="mode"
              value={newGameSettings.mode}
              onChange={handleNewGameSettingsChange}
            >
              <option value="classic">Classic</option>
              {/* Add more game modes here */}
            </select>
          </div>
          <button type="submit">Create Game</button>
        </form>
      </div>
      <div className="lobby-content">
        <div className="players-list">
          <h2>Players in Lobby</h2>
          <ul>
            {players.map((player) => (
              <li key={player._id}>{player.name}</li>
            ))}
            <li>{userName}</li>
          </ul>
        </div>
        <div className="games-list">
          <h2>Existing Games</h2>
          <ul>
            {games.map((game) => (
              <li key={game._id}>
                <div className="game-info">
                  <span>Game Name: {game.name}</span>
                  <span>Status: {game.status}</span>
                  <span>Players: {game.players.length}/{game.maxPlayers}</span>
                  <span>Mode: {game.mode}</span>
                </div>
                <button onClick={() => joinGame(game.name)}>Join</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
