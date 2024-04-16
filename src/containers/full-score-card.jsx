import React from "react";
import { connect } from 'react-redux';
import FullScoreCard from '../components/full-score-card';

const mapStateToProps = (state) => {
    return {
        currentBatters: state.currentMatchState.batters,
        team: state.currentMatchState.teams[state.currentMatchState.battingTeamID]
    }
};

export default connect(mapStateToProps)(FullScoreCard);
