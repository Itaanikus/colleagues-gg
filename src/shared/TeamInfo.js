import React from 'react';

function TeamInfo({ players, hrefText }) {
  const href = `https://euw.op.gg/multi/query=${players.map(player => player.ign).join()}`;

  return (
    <div className="col col-lg-6">
      <div className="card">
        <div className="card-body">
          <a href={href} target="_blank"><strong>{hrefText}</strong></a>
          <ul>
            {players.map(player => (
              <li key={player.id}><a href={`https://euw.op.gg/summoner/userName=${player.ign}`}>{player.ign}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;