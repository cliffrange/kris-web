import { connect } from "react-redux";
import Bowlers from "../components/bowlers";

const mapStateToProps = state => {
  const { teams, bowlingTeamID } = state.currentMatchState;
  return { team: teams[bowlingTeamID] };
};

export default connect(mapStateToProps)(Bowlers);
