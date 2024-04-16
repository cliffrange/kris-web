import { connect } from 'react-redux';
import Score from '../components/score';

const mapStateToProps = (state) => {
    const {
        teams,
        battingTeamID
    } = state.currentMatchState;
    return {
        ...(teams[battingTeamID] ? teams[battingTeamID].score : {}),
        battingTeamName: teams[battingTeamID] ? teams[battingTeamID].teamShortName : ""
    }
};

export default connect(mapStateToProps)(Score);