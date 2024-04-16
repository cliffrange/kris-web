import React from "react";
import { Box, Text } from "grommet";
import {
  ScoreCardTable,
  ScoreCardBody,
  BatterRow,
  Batter as BatterName,
  Score,
  BallCount,
} from "../scorecard-components";
import { Type, Text as TextCell } from "./styles";

const CurrentBowler = ({ currentBowler, bottom }) => {
  if (!currentBowler) {
    return null;
  }

  return (
    <Box width="100%" direction="row">
      <ScoreCardTable>
        <ScoreCardBody style={{ height: "80px" }}>
          <BatterRow
            key={currentBowler.id}
            notOut
            style={{ borderBottom: "0.1px solid #2f0f88" }}
          >
            <BatterName>
              <Text truncate>{currentBowler.name}</Text>
            </BatterName>
            <Score
              plain
            >{`${currentBowler.runs}/${currentBowler.wickets}`}</Score>
            <BallCount
              plain
            >{`${currentBowler.overs}.${currentBowler.balls}`}</BallCount>
          </BatterRow>

          <BatterRow
            key={currentBowler.id}
            notOut
            style={{ borderBottom: "0.1px solid #2f0f88" }}
          >
            <Type plain>
              {bottom.type === "last" ? "LAST OVER" : "THIS OVER"}
            </Type>
            <TextCell colSpan={2} plain>{`${bottom.text} RUNS`}</TextCell>
          </BatterRow>
        </ScoreCardBody>
      </ScoreCardTable>
    </Box>
  );
};

export { CurrentBowler };
