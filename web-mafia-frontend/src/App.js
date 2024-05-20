import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Lobby from './components/Lobby';
import GameLobby from './components/GameLobby';
import Game from './components/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:name" element={<GameLobby />} />
        <Route path="/play/:name" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
