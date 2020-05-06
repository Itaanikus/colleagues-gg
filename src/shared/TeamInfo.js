import React from 'react';

function TeamInfo({ players, title }) {
  const href = `https://euw.op.gg/multi/query=${players.map(player => player.ign).join()}`;

  return (
    <div className="col col-lg-6">
      <div className="card">
        <div className="card-body">
          <strong>{title}</strong>
          <ul>
            {players.map(player => (
              <li key={player.id}><a href={`https://euw.op.gg/summoner/userName=${player.ign}`}>{player.ign}</a></li>
            ))}
          </ul>
          <a className="btn btn-outline-secondary app-secondary-btn"
            href={href} target="_blank" role="button">Multi OP.GG</a>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;