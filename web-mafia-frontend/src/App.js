import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Lobby from './components/Lobby';
import Game from './components/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
