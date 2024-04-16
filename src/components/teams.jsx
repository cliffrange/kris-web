import React from "react";
import { connect } from "react-redux";
import { Box, Text, Button } from "grommet";
import { Link } from "react-router-dom";
import { Header } from "./header";

const mapStateToProps = (state) => {
  return { teams: state.teams };
};

const Teams = ({ teams }) => {
  return (
    <Box>
      <Header name="My Teams">
        <Button to="/create-team" label="Create a Team" as={Link}></Button>
      </Header>

      <Box gap="small" margin={{ top: "small" }} direction="row" wrap>
        {teams.map(({ teamID, teamName, adding }) => (
          <Link
            to={`team/${teamID}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Box
              border={{
                color: "border",
                size: "small",
                side: "all",
              }}
              pad="small"
              width="small"
              background={{ color: "#5b4ebb" }}
              margin="small"
              round="small"
            >
              <Text size={"medium"}>{teamName}</Text>
              {adding && <Text size={"small"}>creating...</Text>}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Teams);
