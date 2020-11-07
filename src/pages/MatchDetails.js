import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React, { useState } from "../../node_modules/react";
import TeamInfo from "../shared/TeamInfo";

function MatchDetails() {
  let { matchId } = useParams();
  const [gamerTags, setGamerTags] = useState([]);
  const [nicks, setNicks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (matchId > 0) {
        const ncOrganisationId = 661;
        const leagueGameLoginType = 2;
        const response = await fetch(`https://app.esportligaen.dk/api/match/details/${matchId}`);

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

          setAlertMessage('');
          setGamerTags(filteredGamerTags.map(player => ({ id: player.id, ign: player.gamerId })));
          setNicks(opponentPlayers.map(player => ({ id: player.id, ign: player.nickName })));
        }
      }
    }
    fetchData();
  }, [matchId]);

  return (
    <div className="row">
      <div className="d-none d-lg-block col-lg-3"></div>
      <div className="col col-lg-6">
        <div className="app">
          {alertMessage && alertMessage !== '' &&
            <div className="row">
              <div className="col">
                <div className="alert-primary">
                  {alertMessage}
                </div>
              </div>
            </div>}
          <div className="row">
            {nicks && nicks.length > 0 &&
              <TeamInfo players={nicks} title="Nicknames" />}
            {gamerTags && gamerTags.length > 0 &&
              <TeamInfo players={gamerTags} title="GamerTags" />}
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block col-lg-3"></div>
    </div>
  )
}

export default MatchDetails;