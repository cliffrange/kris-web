import { connect } from "react-redux";
import ScoreCard from "../components/scorecard";

const mapStateToProps = (state) => {
  const battingTeam =
    state.currentMatchState.teams[state.currentMatchState.battingTeamID];
  const bowlingTeam =
    state.currentMatchState.teams[state.currentMatchState.bowlingTeamID];
  return {
    currentBatterIDs: battingTeam && battingTeam.currentBatterIDs,
    battingTeam,
    bowlingTeam,
  };
};

export default connect(mapStateToProps)(ScoreCard);

const mapStateToPropsBowlingTeam = (state) => {
  const battingTeam =
    state.currentMatchState.teams[state.currentMatchState.battingTeamID];
  const bowlingTeam =
    state.currentMatchState.teams[state.currentMatchState.bowlingTeamID];
  return {
    currentBatterIDs: bowlingTeam.currentBatterIDs,
    battingTeam: bowlingTeam,
    bowlingTeam: battingTeam,
  };
};

const BowlingTeamScoreCard = connect(mapStateToPropsBowlingTeam)(ScoreCard);
export { BowlingTeamScoreCard };
