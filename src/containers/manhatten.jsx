import { connect } from "react-redux";
import { Manhatten } from "../components/manhatten/manhatten";

const mapStateToProps = (state) => {
  const { teams, battingTeamID, properties } = state.currentMatchState;
  return {
    overs: teams[battingTeamID].manhatten.overs,
    max: teams[battingTeamID].manhatten.max,
    totalOvers: properties.opi,
    teamName: teams[battingTeamID].teamName,
  };
};

const mapStateToPropsBT = (state) => {
  const { teams, bowlingTeamID, properties } = state.currentMatchState;
  return {
    overs: teams[bowlingTeamID].manhatten.overs,
    max: teams[bowlingTeamID].manhatten.max,
    totalOvers: properties.opi,
    teamName: teams[bowlingTeamID].teamName,
  };
};

export const BowlingTeamManhatten = connect(mapStateToPropsBT)(Manhatten);

export default connect(mapStateToProps)(Manhatten);

// export const BowlingTeamManhatten;
