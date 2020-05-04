import React from 'react';
import './App.css';
import OpGg from './components/OpGg';
import Nav from './components/Nav';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="app">
        <OpGg />
      </div>
    </React.Fragment>
  );
}

export default App;
