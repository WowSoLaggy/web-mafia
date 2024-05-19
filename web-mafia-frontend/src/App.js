import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './components/Lobby';
import Game from './components/Game';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Lobby} />
        <Route path="/game/:gameId" component={Game} />
      </Switch>
    </Router>
  );
};

export default App;
