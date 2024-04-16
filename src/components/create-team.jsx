import React from "react";
import { connect } from "react-redux";
import { Box, Button } from "grommet";
import { Header } from "./header";
import {
  setTeamName,
  addPlayer,
  createTeam,
} from "../redux/actions/action-creators";
import { useAuth0 } from "../utils/auth0";
import { useHistory } from "react-router-dom";
import EditTeam from "./edit-team";

const mapStateToProps = (state) => {
  return state.currentlyAddingTeam;
};

const mapDispatchToProps = {
  setTeamName,
  addPlayer,
  createTeam,
};

const CreateTeam = ({
  teamName,
  players,
  setTeamName,
  addPlayer,
  createTeam,
}) => {
  const { getTokenSilently } = useAuth0();
  const history = useHistory();
  return (
    <Box fill>
      <Header name="Create A Team">
        <Button
          label="Create"
          onClick={async () => {
            const tokenPromise = getTokenSilently();
            createTeam(tokenPromise);
            history.push("/my-teams");
          }}
        />
      </Header>
      <EditTeam
        teamName={teamName}
        players={players}
        addPlayer={addPlayer}
        setTeamName={setTeamName}
      />
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
