import { connect } from "react-redux";
import { CurrentBowler } from "../components/current-bowler/current-bowler";

const mapStateToProps = (state) => {
  const { teams, bowlingTeamID, battingTeamID } = state.currentMatchState;
  const { currentBowlerID, lastBowlerID } = teams[bowlingTeamID] || {};
  const bowlerID = currentBowlerID || lastBowlerID;
  const bowler =
    teams[bowlingTeamID] &&
    teams[bowlingTeamID].players &&
    teams[bowlingTeamID].players[bowlerID];

  const battingTeam = teams[battingTeamID];

  let type = "this";
  let runs = 0;

  if (battingTeam && battingTeam.manhatten) {
    const manhatten = battingTeam.manhatten;
    const ball = battingTeam.score.ball;

    if (manhatten.overs[manhatten.overs.length - 1]) {
      runs = manhatten.overs[manhatten.overs.length - 1].runs;

      if (ball === 0) {
        type = "last";
      }
    }
  }

  return {
    currentBowler: bowler && {
      name: bowler.lastName,
      runs: bowler.bowler.runs,
      wickets: bowler.bowler.wickets,
      overs: bowler.bowler.overs,
      balls: bowler.bowler.balls,
    },
    bottom: {
      type,
      text: runs,
    },
  };
};

export default connect(mapStateToProps)(CurrentBowler);
