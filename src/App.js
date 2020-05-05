import React from 'react';
import Home from './Home/Home';
import Nav from './Nav/Nav';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Home />
    </React.Fragment>
  );
}

export default App;
