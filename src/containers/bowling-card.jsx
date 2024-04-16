import React from "react";
import { connect } from "react-redux";
import { BowlingCard } from "../components/bowling-card";

const mapStateToProps = (state) => {
  return {
    bowlingTeam:
      state.currentMatchState.teams[state.currentMatchState.bowlingTeamID],
  };
};

const mapStateToPropsBattingTeam = (state) => {
  return {
    bowlingTeam:
      state.currentMatchState.teams[state.currentMatchState.battingTeamID],
  };
};

export default connect(mapStateToProps)(BowlingCard);


const BattingTeamBowlingCard = connect(mapStateToPropsBattingTeam)(BowlingCard);
export { BattingTeamBowlingCard };
