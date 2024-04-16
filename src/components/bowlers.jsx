import React from "react";
import { Box, Text } from "grommet";

function Bowlers({ team }) {
if (!team) {
    return "NO INFO"
}

  return (
    <Box width="360px">
      <Box
        pad="xsmall"
        align="center"
        round={{ corner: "top", size: "small" }}
        background={{ color: "brand" }}
      >
        <Text size="large">{team.teamName}</Text>
      </Box>
      <Box
        pad={{ vertical: "small" }}
        round={{ corner: "bottom", size: "small" }}
        border={{ color: "brand" }}
        gap="xxsmall"
      >
        {team.playerIDs.map(pid => {
          const player = team.players[pid];
          const { runs, overs, balls, wickets } = player.bowler;

          return (
            <Box
              direction="row"
              justify="between"
              pad={{ horizontal: "small" }}
              border={{ side: "horizontal", color: "brand" }}
            >
              <Box height="32px" width="50px" justify="center">
                {player.lastName}
              </Box>
              <Box height="32px" justify="center">
                <Text>{overs + (balls > 0 ? `.${balls}` : "")}</Text>
              </Box>
              <Box height="32px" justify="center">
                <Text>{0}</Text>
              </Box>
              <Box height="32px" justify="center">
                <Text>{runs}</Text>
              </Box>
              <Box height="32px" justify="center">
                <Text>{wickets}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Bowlers;
