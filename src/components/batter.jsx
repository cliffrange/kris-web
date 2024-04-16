import React from "react";
import { Box, Text, TableCell } from "grommet";
import { CaretNext } from "grommet-icons";
import { connect } from "react-redux";
import {
  ScoreCardTable,
  ScoreCardBody,
  BatterRow,
  Batter as BatterName,
  Score,
  BallCount,
} from "./scorecard-components";

const mapStateToProps = (state) => {
  return (
    state.currentMatchState.teams[state.currentMatchState.battingTeamID] || {}
  );
};

const CurrentBattersComp = ({
  currentBatterIDs = [],
  currentStrikerID,
  players,
  outBatterID,
}) => {
  return (
    <Box width="100%" direction="row">
      <ScoreCardTable>
        <ScoreCardBody style={{ height: "80px" }}>
          {currentBatterIDs
            .filter((id) => !!id)
            .map((id) => players[id])
            .map((p, i) => (
              <BatterRow
                key={p.id}
                notOut
                style={
                  i === 0
                    ? { borderBottom: "0.1px solid #2f0f88" }
                    : { borderBottom: "none" }
                }
              >
                <TableCell>
                  {p.id === currentStrikerID && (
                    <CaretNext color="white" size="20px" />
                  )}
                </TableCell>
                <BatterName>
                  <Text truncate>{p.lastName}</Text>
                </BatterName>
                <Score plain>{p.batter.score}</Score>
                <BallCount plain>{p.batter.balls}</BallCount>
              </BatterRow>
            ))}
        </ScoreCardBody>
      </ScoreCardTable>
    </Box>
  );
};

const CurrentBatters = connect(mapStateToProps)(CurrentBattersComp);

export { CurrentBatters, CurrentBattersComp };
