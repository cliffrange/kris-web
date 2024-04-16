import React from "react";
import { Box, Text } from "grommet";

const TeamCard = ({teamName, players}) => {
  return (
    <Box width="medium">
      <Box
        pad="small"
        background="brand"
        round={{ corner: "top", size: "small" }}
        width="380px"
      >
        <Text textAlign="center">{teamName}</Text>
      </Box>
      <Box
        pad="small"
        background="#466fb466"
        round={{ corner: "bottom", size: "small" }}
        width="380px"
      >
        {players.map((player={}, index) => (
          <Box pad="xsmall" direction="row" key={player.id}>
            <Box direction="row" justify="between" fill>
              <Text
                truncate
                margin={{ right: "small" }}
                style={{ lineHeight: "28px" }}
              >
                {player.firstName + " " + player.lastName}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TeamCard;
