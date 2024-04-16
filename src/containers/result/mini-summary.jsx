import { connect } from "react-redux";
import { MiniSummary } from "../../components/result";

const mapStateToProps = (state, ownProps) => {
  const { teams, bowlingTeamID, battingTeamID } = ownProps.isTryIt
    ? state.tryItMatchState
    : state.currentMatchState;
  return { teams: [teams[bowlingTeamID], teams[battingTeamID]] };
};

export default connect(mapStateToProps)(MiniSummary);
