import Wicket from "../components/wicket";
import { connect } from "react-redux";
import { ball } from "../redux/actions/action-creators";

const mapDispatchToProps = {
  ball
};

const mapStateToProps = state => {
  return {
    fieldingTeam:
      state.currentMatchState.teams[state.currentMatchState.bowlingTeamID]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wicket);
