import React from "react";
import { connect } from "react-redux";
import { Box } from "grommet";
import {
  ballLocal,
  selectNewBatterLocal,
  selectBowlerLocal,
  switchEnd,
  changeBowler,
} from "../../redux/actions/action-creators";
import Score from "../score";
import ScoreCard from "../scorecard";
import { BowlingCard } from "../bowling-card";
import RunScorer from "../run-scorer";
import { CurrentBattersComp as CurrentBatters } from "../batter";
import { useState } from "react";
import { Manhatten } from "../manhatten/manhatten";
import { Worm } from "../worm/worm";

const mapStateToProps = (state) => {
  return state.tryItMatchState;
};

const mapDispatchToProps = {
  ball: ballLocal,
  selectNewBatter: selectNewBatterLocal,
  selectBowler: selectBowlerLocal,
  switchEnd,
  changeBowler,
};

const TryIt = ({
  state,
  ball,
  selectNewBatter,
  selectBowler,
  teams,
  battingTeamID,
  bowlingTeamID,
  properties,
  switchEnd,
  changeBowler,
}) => {
  const [isAddingWicket, setIsAddingWicket] = useState(false);
  const [isAddingNB, setIsAddingNB] = useState(false);
  const [isAddingWide, setIsAddingWide] = useState(false);
  const [isAddingBye, setIsAddingBye] = useState(false);
  const [isAddingLB, setIsAddingLB] = useState(false);

  const {
    outBatterID,
    currentBatterIDs,
    currentStrikerID,
    manhatten,
    teamName,
  } = teams[battingTeamID];

  const { currentBowlerID } = teams[bowlingTeamID];

  return (
    <Box gap="small" margin="small" align="center">
      <Box gap="small" direction="row" width="680px">
        <Box
          pad={{ vertical: "small" }}
          round="xsmall"
          border={{ color: "#5b4ebb" }}
          style={{ position: "relative", flex: "0 0 360px" }}
        >
          <RunScorer
            state={state}
            isTryIt={true}
            ball={ball}
            isAddingNB={isAddingNB}
            isAddingWicket={isAddingWicket}
            isAddingWide={isAddingWide}
            isAddingBye={isAddingBye}
            isAddingLegBye={isAddingLB}
            setIsAddingWicket={setIsAddingWicket}
            setIsAddingWide={setIsAddingWide}
            setIsAddingNB={setIsAddingNB}
            setIsAddingBye={setIsAddingBye}
            setIsAddingLegBye={setIsAddingLB}
            outBatterID={outBatterID}
            currentBowlerID={currentBowlerID}
            currentStrikerID={currentStrikerID}
            selectNewBatter={selectNewBatter}
            selectBowler={selectBowler}
            teams={teams}
            battingTeamID={battingTeamID}
            bowlingTeamID={bowlingTeamID}
            properties={properties}
            switchEnd={switchEnd}
            changeBowler={changeBowler}
          />
        </Box>
        <Box
          gap="small"
          width="100%"
          pad="small"
          round="xsmall"
          border={{ color: "#5b4ebb" }}
        >
          <Score
            {...{
              ...teams[battingTeamID].score,
              battingTeamName: teams[battingTeamID]
                ? teams[battingTeamID].teamShortName
                : "",
            }}
          />
          <Box>
            <CurrentBatters
              {...{
                currentBatterIDs,
                currentStrikerID,
                outBatterID,
                players: teams[battingTeamID].players,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box gap="small" width="680px">
        <ScoreCard
          {...{
            currentBatterIDs,
            battingTeam: teams[battingTeamID],
            bowlingTeam: teams[bowlingTeamID],
          }}
        />
        <BowlingCard bowlingTeam={teams[bowlingTeamID]} />
        {/* <Worm></Worm> */}
      </Box>
      <Box width="880px">
        <Manhatten
          totalOvers={20}
          teamName={teamName}
          overs={manhatten.overs}
          max={manhatten.max}
        ></Manhatten>
        <Worm
          totalBalls={120}
          worms={[
            {
              balls: teams[battingTeamID].worm
                ? teams[battingTeamID].worm.balls
                : [],
            },
            {
              balls: teams[bowlingTeamID].worm
                ? teams[bowlingTeamID].worm.balls
                : [],
            },
          ]}
        ></Worm>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TryIt);
