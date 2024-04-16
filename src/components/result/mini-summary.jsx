import React from "react";
import { Box, Text } from "grommet";
import {
  Badge,
  MatchTitle,
  MatchHeader,
  Container,
  MatchDescription,
  MatchScore,
} from "./styles";

const MiniSummary = ({ teams, resultText }) => {
  if (!teams) {
    return null;
  }

  return (
    <Box>
      <Box justify="center">
        <Box
          direction="row"
          gap="small"
          align="center"
          margin={{ top: "small" }}
          justify="center"
        >
          <Box justify="center">
            <Text textAlign="center" weight="bold">
              {teams[0].teamShortName}
            </Text>
            {teams[0].score && (
              <MatchScore
                pad="xsmall"
                background="brand"
                winner={teams[0].winner}
                direction="row"
              >
                <strong>{`${teams[0].score.score}/${teams[0].score.wickets}`}</strong>
                <span className="overs">{`(${teams[0].score.over}.${teams[0].score.ball})`}</span>
              </MatchScore>
            )}
          </Box>
          <span>vs</span>
          <Box>
            <Text textAlign="center" weight="bold">
              {teams[1].teamShortName}
            </Text>
            {teams[1].score && (
              <MatchScore
                pad="xsmall"
                background="brand"
                winner={teams[1].winner}
                direction="row"
              >
                <strong>{`${teams[1].score.score}/${teams[1].score.wickets}`}</strong>
                <span className="overs">{`(${teams[1].score.over}.${teams[1].score.ball})`}</span>
              </MatchScore>
            )}
          </Box>
        </Box>
        <Text textAlign="center">{resultText}</Text>
      </Box>
    </Box>
  );
};

export { MiniSummary };
