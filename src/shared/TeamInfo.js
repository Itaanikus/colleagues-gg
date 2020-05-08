import React from 'react';

function TeamInfo({ players, title }) {
  const href = `https://euw.op.gg/multi/query=${players.map(player => player.ign).join()}`;

  return (
    <div className="col col-lg-6">
      <div className="card">
        <h5 className="card-header">{title}</h5>
        <div className="card-body">
          <ul>
            {players.map(player => (
              <li key={player.id}>
                <a className="app-link"
                  href={`https://euw.op.gg/summoner/userName=${player.ign}`} target="_blank" rel="noopener noreferrer">{player.ign}</a>
              </li>
            ))}
          </ul>
          <a className="btn app-secondary-btn"
            href={href} target="_blank" role="button" rel="noopener noreferrer">Multi OP.GG</a>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;