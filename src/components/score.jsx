import React from "react";
import { Text, Box } from "grommet";

const Score = ({ score, wickets, over, ball, battingTeamName }) => {
  return (
    <Box width={"100%"} background={{ color: "#5b4ebb" }}>
      <Box
        direction="row"
        pad={{ horizontal: "small" }}
        align="center"
        background={{ color: "brand" }}
        justify="between"
      >
        <Box align="center" pad="xsmall" justify="center">
          <Text size={"30px"}>{battingTeamName}</Text>
        </Box>
        <Box align="end" pad="xsmall" justify="center">
          <Text size={"30px"}>{score}</Text>
        </Box>
        <Box width="10px" pad="xsmall" align="center" justify="center">
          <Text size={"30px"}>/</Text>
        </Box>
        <Box width="36px" pad="xsmall" align="center" justify="center">
          <Text size={"30px"}>{wickets}</Text>
        </Box>
      </Box>
      <Box
        pad="xsmall"
        background={{ color: "#466fb466" }}
        justify="center"
        align="end"
      >
        <Text size="small" margin={{ right: "small" }} color="white">
          {over}.{ball} overs
        </Text>
      </Box>
    </Box>
  );
};

export default Score;
