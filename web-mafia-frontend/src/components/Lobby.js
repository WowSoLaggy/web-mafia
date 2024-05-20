import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [gameName, setGameName] = useState('');
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
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }

    const fetchPlayersAndGames = async () => {
      try {
        const [playersResponse, gamesResponse] = await Promise.all([
          axios.get('/api/game/players'),
          axios.get('/api/game/games')
        ]);
        setPlayers(playersResponse.data);
        setGames(gamesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlayersAndGames();
  }, []);

  const createGame = async () => {
    if (!newGameSettings.name.trim()) {
      alert('Game name is required');
      return;
    }
    try {
      const response = await axios.post('/api/game/create', newGameSettings);
      setGameName(response.data.gameName);
      navigate(`/game/${response.data.gameName}`);
    } catch (error) {
      console.error('Error creating game:', error);
      alert(error.response.data.message);
    }
  };

  const joinGame = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/game/join', { name: gameName, userName });
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
          <label>
            Game Name:
            <input
              type="text"
              name="name"
              value={newGameSettings.name}
              onChange={handleNewGameSettingsChange}
              required
            />
          </label>
          <label>
            Max Players:
            <input
              type="number"
              name="maxPlayers"
              value={newGameSettings.maxPlayers}
              onChange={handleNewGameSettingsChange}
              min="1"
              max="20"
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={newGameSettings.password}
              onChange={handleNewGameSettingsChange}
            />
          </label>
          <label>
            Allow Bots:
            <input
              type="checkbox"
              name="allowBots"
              checked={newGameSettings.allowBots}
              onChange={handleNewGameSettingsChange}
            />
          </label>
          <label>
            Mode:
            <select
              name="mode"
              value={newGameSettings.mode}
              onChange={handleNewGameSettingsChange}
            >
              <option value="classic">Classic</option>
              {/* Add more game modes here */}
            </select>
          </label>
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
                Game Name: {game.name}, Status: {game.status}, Players: {game.players.length}/{game.maxPlayers}, Mode: {game.mode}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <form onSubmit={joinGame}>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Enter Game Name"
            required
          />
          <button type="submit">Join Game</button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
