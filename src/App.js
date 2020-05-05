import React from 'react';
import './App.css';
import Home from './Home/Home';
import Nav from './Nav/Nav';

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
