import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Nav from './Nav/Nav';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <Router basename="/colleagues-gg">
      <Nav />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div >
    </Router>
  );
}

export default App;
