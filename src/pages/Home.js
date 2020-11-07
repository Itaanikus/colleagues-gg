import React, { useState } from "../../node_modules/react";
import { Link } from "react-router-dom";
import Cardbox from "../shared/Cardbox/Cardbox";

function Home() {
  const [matchId, setMatchId] = useState('');

  return (
    <div className="row">
      <div className="d-none d-lg-block col-lg-3"></div>
      <div className="col col-lg-6">
        <div className="app">
          <div className="row">
            <div className="col">
              <Cardbox title="Match info">
                <div className="form-horizontal">
                  <div className="form-group">
                    <input className="form-control" type="number" value={matchId}
                      placeholder="Enter match ID here..."
                      onChange={event => setMatchId(event.target.value)}></input>
                    <small className="form-text text-muted">Example: Enter "24480" for https://app.esportligaen.dk/match/24480</small>
                  </div>
                  <Link to={`match/${matchId}`}>
                    <button className="btn app-primary-btn" disabled={!matchId || matchId === 0}>Search</button>
                  </Link>
                </div>
              </Cardbox>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block col-lg-3"></div>
    </div>
  );
}

export default Home;