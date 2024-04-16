import { connect } from "react-redux";
import { Worm } from "../components/worm/worm";

const mapStateToProps = (state) => {
  const {
    teams,
    battingTeamID,
    bowlingTeamID,
    properties,
  } = state.currentMatchState;
  return {
    worms: [
      {
        balls: teams[battingTeamID].worm ? teams[battingTeamID].worm.balls : [],
      },
      {
        balls: teams[bowlingTeamID].worm ? teams[bowlingTeamID].worm.balls : [],
      },
    ],
    totalBalls: properties.opi * 6,
  };
};

export default connect(mapStateToProps)(Worm);
