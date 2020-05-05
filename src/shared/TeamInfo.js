import React from 'react';

function TeamInfo({ players, hrefText }) {
  const href = `https://euw.op.gg/multi/query=${players.map(player => player.ign).join()}`;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col col-lg-6">
          <a href={href} target="_blank">{hrefText}</a>
        </div>
      </div>
      <ul>
        {players.map(player => (
          <li key={player.id}>{player.ign}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default TeamInfo;