import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Nav from './Nav/Nav';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import MatchDetails from './pages/MatchDetails';

function App() {
  return (
    <Router basename="/colleagues-gg">
      <Nav />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/match/:matchId" exact component={MatchDetails} />
        </Switch>
      </div >
    </Router>
  );
}

export default App;
