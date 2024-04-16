import Dashboard from "../components/member-dashboard/member-dashboard";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/action-creators";

const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    teams: state.teams,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
