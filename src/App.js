import React from 'react';
import Home from './pages/Home';
import Nav from './Nav/Nav';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="app">
        <Home />
      </div>
    </React.Fragment>
  );
}

export default App;
