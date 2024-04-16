import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Box, Text, Button } from "grommet";
import { Link } from "react-router-dom";
import { MatchThumbnail } from "./match-thumbnail";
import { Header } from "./header";
import styled from "styled-components";

const MatchWrapper = styled(Box)`
  a {
    text-decoration: none;
  }
`;

const mapStateToProps = (state) => {
  return { matches: state.matches };
};

const Matches = ({ matches }) => {
  return (
    <Box gap="xsmall">
      <Header name="My Matches">
        <Button to="/create-match" label="Create a Match" as={Link}></Button>
      </Header>
      <Box direction="row" gap="small" margin={{ top: "small" }} wrap>
        {Object.values(matches).map((match) => (
          <MatchWrapper key={match.id} margin={{ top: "small" }}>
            <Link to={`match/${match.id}`}>
              <MatchThumbnail
                match={match}
                link={`match/${match.id}`}
              ></MatchThumbnail>
            </Link>
          </MatchWrapper>
        ))}
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps)(Matches);
