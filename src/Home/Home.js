import React, { useState } from "react";
import TeamInfo from '../shared/TeamInfo';

function Home() {
  const [matchId, setMatchId] = useState(0);
  const [gamerTags, setGamerTags] = useState([]);
  const [nicks, setNicks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const onSubmit = async () => {
    if (matchId > 0) {
      const ncOrganisationId = 661;
      const leagueGameLoginType = 2;
      const response = await fetch(`https://app.esportligaen.dk/api/match/details/${matchId}`)

      if (!response.ok) {
        setAlertMessage("Could not resolve a match from the given ID, which resulted in an error. Try another ID..");
        return;
      }

      const matchData = await response.json();
      const opponentTeam = matchData.MatchTeams.filter(matchTeam => matchTeam.Team.Organisation.id !== ncOrganisationId);

      if (opponentTeam.length === 1) {
        const opponentPlayers = opponentTeam[0].Team.TeamMembers;
        let promiseArray = opponentPlayers.map(player => fetch(`https://app.esportligaen.dk/api/user/${player.id}?includeGameTeamInfo=true`)
          .then(res => res.json()));

        const resolvedResponses = await Promise.all(promiseArray)
        const filteredGamerTags = resolvedResponses
          .flatMap(response => response.gameLogins)
          .filter(gameLogins => gameLogins.gameLoginTypeId === leagueGameLoginType);

        setGamerTags(filteredGamerTags.map(player => ({ id: player.id, ign: player.gamerId })));
        setNicks(opponentPlayers.map(player => ({ id: player.id, ign: player.nickName })));
        setAlertMessage('');
      }
    }
  }

  return (
    <div className="container-fluid">
      {alertMessage && alertMessage !== '' &&
        <div className="alert alert-primary">
          {alertMessage}
        </div>
      }
      <h3>NC ColLeagues</h3>
      <div className="form-horizontal">
        <div className="form-group">
          <label>Enter match ID here:</label>
          <input className="form-control" type="number" value={matchId}
            placeholder="Type in match ID here..."
            onChange={event => setMatchId(event.target.value)}></input>
          <small className="form-text text-muted">Example: Enter "24480" for https://app.esportligaen.dk/match/24480</small>
        </div>
        <button className="btn btn-primary app-btn" onClick={onSubmit}>Search</button>
      </div>
      {nicks.length > 0 && alertMessage === '' &&
        <TeamInfo players={nicks} hrefText="Nicknames:" />}
      {gamerTags.length > 0 && alertMessage === '' &&
        <TeamInfo players={gamerTags} hrefText="GamerTags (from player-profiles):" />}
    </div>
  );
}

export default Home;