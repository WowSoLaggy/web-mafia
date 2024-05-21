// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Game from './components/Game';
import GameLobby from './components/GameLobby';
import Lobby from './components/Lobby';
import Notifications from './components/Notifications';
import PrivateRoute from './components/PrivateRoute';
import LogoutButton from './components/LogoutButton';
import Home from './components/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <LogoutButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={<PrivateRoute element={Chat} />} />
            <Route path="/game" element={<PrivateRoute element={Game} />} />
            <Route path="/gamelobby" element={<PrivateRoute element={GameLobby} />} />
            <Route path="/lobby" element={<PrivateRoute element={Lobby} />} />
            <Route path="/notifications" element={<PrivateRoute element={Notifications} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
