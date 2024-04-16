import { connect } from "react-redux";
import { Updates } from "../components/updates";

const mapStateToProps = (state) => {
  return {
    updates: state.currentMatchState.updates || [],
    innings: state.currentMatchState.innings,
  };
};

export default connect(mapStateToProps)(Updates);
