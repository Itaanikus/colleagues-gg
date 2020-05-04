import React, { useState } from "react";

function OpGg() {
  const [matchId, setMatchId] = useState(0);
  const [gamerTags, setGamerTags] = useState([]);
  const [nicks, setNicks] = useState([]);
  const [nickHref, setNickHref] = useState('');
  const [gamerTagHref, setGamerTagHref] = useState('');

  const onSubmit = () => {
    if (matchId > 0) {
      const ncOrganisationId = 661;
      const leagueGameLoginType = 2;
      fetch(`https://app.esportligaen.dk/api/match/details/${matchId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Received a status '${response.status}' and did therefore not continue..`);
        })
        .then(matchData => {
          const opponentTeam = matchData.MatchTeams.filter(matchTeam => matchTeam.Team.Organisation.id !== ncOrganisationId);

          if (opponentTeam.length === 1) {
            const opponentPlayers = opponentTeam[0].Team.TeamMembers;

            let promiseArray = [];
            opponentPlayers.forEach(player =>
              promiseArray.push(fetch(`https://app.esportligaen.dk/api/user/${player.id}?includeGameTeamInfo=true`))
            );
            Promise.all(promiseArray)
              .then(responseArray =>
                Promise.all(responseArray.map(response => response.json()))
                  .then(resolvedResponses => {
                    const leagueGamerTags = resolvedResponses
                      .map(response => response.gameLogins);
                    const filteredGamerTags = [].concat(...leagueGamerTags).filter(gameLogins => gameLogins.gameLoginTypeId === leagueGameLoginType);
                    setGamerTags(filteredGamerTags);
                    setNicks(opponentPlayers);
                    setNickHref(`https://euw.op.gg/multi/query=${opponentPlayers.map(player => player.nickName).join()}`);
                    setGamerTagHref(`https://euw.op.gg/multi/query=${filteredGamerTags.map(player => player.gamerId).join()}`);
                  })
              );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <div className="container-fluid">
      <h3>NC ColLeagues</h3>
      <div className="form-horizontal">
        <div className="form-group">
          <label>Enter match ID here:</label>
          <input className="form-control" type="number" value={matchId}
            placeholder="Type in matchId here..."
            onChange={event => setMatchId(event.target.value)}></input>
        </div>
        <button className="btn btn-primary app-btn" onClick={onSubmit}>Search</button>
      </div>
      {nickHref && nicks &&
        <React.Fragment>
          <div className="row">
            <div className="col col-lg-6">
              <a href={nickHref} target="_blank">Nicknames (displayed on match tab):</a>
            </div>
          </div>
          <ul>
            {nicks.map(nick => (
              <li key={nick.id}>{nick.nickName}</li>
            ))}
          </ul>
        </React.Fragment>}
      {gamerTagHref && gamerTags &&
        <React.Fragment>
          <div className="row">
            <div className="col col-lg-6">
              <a href={gamerTagHref} target="_blank">GamerTags (found on player profiles):</a>
            </div>
          </div>
          <ul>
            {gamerTags.map(player => (
              <li key={player.id}>{player.gamerId}</li>
            ))}
          </ul>
        </React.Fragment>}
    </div>
  );
}

export default OpGg;