import React from 'react';
import Home from './pages/Home';
import Nav from './Nav/Nav';

import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-lg-block col-lg-3"></div>
          <div className="col col-lg-6">
            <div className="app">
              <Home />
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-3"></div>
        </div>
      </div >
      <footer class="page-footer font-small cyan darken-3">
        <div class="container">
          <div class="row">
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
