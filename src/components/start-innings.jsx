import React from "react";
import { connect } from "react-redux";
import { Box, Button, FormField, Select } from "grommet";
import {
  startInnings,
  selectOpennerOne,
  selectOpennerTwo,
  selectBowler,
  startInningsLocal,
  selectOpennerOneLocal,
  selectOpennerTwoLocal,
  selectBowlerLocal,
} from "../redux/actions/action-creators";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.isTryIt) {
    return state.tryItMatchState;
  }
  return state.currentMatchState;
};

const mapDispatchToProps = (dispatch, { isTryIt }) => {
  return {
    selectOpennerOne: (openerOneId) => {
      dispatch(
        isTryIt
          ? selectOpennerOneLocal(openerOneId)
          : selectOpennerOne(openerOneId),
      );
    },
    selectOpennerTwo: (openerTwoId) => {
      dispatch(
        isTryIt
          ? selectOpennerTwoLocal(openerTwoId)
          : selectOpennerTwo(openerTwoId),
      );
    },
    startInnings: () => {
      dispatch(isTryIt ? startInningsLocal() : startInnings());
    },
    selectBowler: (bowlerId) => {
      dispatch(
        isTryIt
          ? selectBowlerLocal({ bowlerID: bowlerId })
          : selectBowler({ bowlerID: bowlerId }),
      );
    },
  };
};

const StartInnings = ({
  teams,
  battingTeamID,
  bowlingTeamID,
  selectBowler,
  selectOpennerOne,
  selectOpennerTwo,
  startInnings,
}) => {
  const battingTeam = battingTeamID && teams[battingTeamID];
  const bowlingTeam = bowlingTeamID && teams[bowlingTeamID];

  const { currentBatterIDs } = battingTeam;
  const { currentBowlerID } = bowlingTeam;

  let opennerOneName = "";
  if (
    currentBatterIDs[0] &&
    battingTeam &&
    battingTeam.players[currentBatterIDs[0]]
  ) {
    const opennerOne = battingTeam.players[currentBatterIDs[0]];
    opennerOneName = `${opennerOne.firstName} ${opennerOne.lastName}`;
  }

  let opennerTwoName = "";
  if (
    currentBatterIDs[1] &&
    battingTeam &&
    battingTeam.players[currentBatterIDs[1]]
  ) {
    const opennerTwo = battingTeam.players[currentBatterIDs[1]];
    opennerTwoName = `${opennerTwo.firstName} ${opennerTwo.lastName}`;
  }

  let bowlerName = "";
  if (currentBowlerID && bowlingTeam && bowlingTeam.players[currentBowlerID]) {
    const bowler = bowlingTeam.players[currentBowlerID];
    bowlerName = `${bowler.firstName} ${bowler.lastName}`;
  }

  const opennerOneNames = [];
  const opennerOneIDs = [];
  if (battingTeam) {
    battingTeam.playerIDs.forEach((pid) => {
      if (currentBatterIDs[1] && pid === currentBatterIDs[1]) {
        return;
      }
      const player = battingTeam.players[pid];
      opennerOneNames.push(`${player.firstName} ${player.lastName}`);
      opennerOneIDs.push(pid);
    });
  }

  const opennerTwoNames = [];
  const opennerTwoIDs = [];
  if (battingTeam) {
    battingTeam.playerIDs.forEach((pid) => {
      if (currentBatterIDs[0] && pid === currentBatterIDs[0]) {
        return;
      }
      const player = battingTeam.players[pid];
      opennerTwoNames.push(`${player.firstName} ${player.lastName}`);
      opennerTwoIDs.push(pid);
    });
  }

  const bowlingTeamPlayerNames = [];
  const bowlingTeamPlayerIDs = [];
  if (bowlingTeam) {
    bowlingTeam.playerIDs.forEach((pid) => {
      const player = bowlingTeam.players[pid];
      bowlingTeamPlayerNames.push(`${player.firstName} ${player.lastName}`);
      bowlingTeamPlayerIDs.push(pid);
    });
  }

  return (
    <Box
      background={{ color: "#EEEEEEF0" }}
      round={{ corner: "top-right", size: "16px" }}
      pad="small"
      fill
      justify="center"
    >
      <Box width="medium">
        <FormField label="Select Openner 1" name="openner-1">
          <Select
            options={opennerOneNames}
            value={opennerOneName}
            onChange={({ selected }) => {
              selectOpennerOne(opennerOneIDs[selected]);
            }}
          />
        </FormField>
        <FormField label="Select Openner 2" name="openner-2">
          <Select
            options={opennerTwoNames}
            value={opennerTwoName}
            onChange={({ selected }) => {
              selectOpennerTwo(opennerTwoIDs[selected]);
            }}
          />
        </FormField>
        <FormField label="Select Opening Bowler" name="bowler">
          <Select
            options={bowlingTeamPlayerNames}
            value={bowlerName}
            onChange={({ selected }) => {
              selectBowler(bowlingTeamPlayerIDs[selected]);
            }}
          />
        </FormField>
        <Box direction="row" justify="end" margin={{ top: "medium" }}>
          <Button
            label="Start"
            primary
            onClick={() => {
              startInnings();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StartInnings);
