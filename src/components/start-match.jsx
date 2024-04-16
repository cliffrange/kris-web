import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button, FormField, Select } from "grommet";
import {
  startMatch,
  selectBattingTeam,
  selectOpennerOne,
  selectOpennerTwo,
  selectBowler,
} from "../redux/actions/action-creators";

const mapStateToProps = (state) => {
  return state.currentMatchState;
};

const mapDispatchToProps = {
  selectBattingTeam,
  selectOpennerOne,
  selectOpennerTwo,
  startMatch,
  selectBowler,
};

const StartMatch = ({
  teams,
  battingTeamID,
  bowlingTeamID,
  selectBowler,
  selectBattingTeam,
  selectOpennerOne,
  selectOpennerTwo,
  startMatch,
}) => {
  const teamNames = Object.values(teams).map((team) => team.teamName);
  const teamIDs = Object.values(teams).map((team) => team.teamID);
  const battingTeam = battingTeamID && teams[battingTeamID];
  const bowlingTeam = bowlingTeamID && teams[bowlingTeamID];
  const battingTeamName = battingTeam ? battingTeam.teamName : "";
  const currentBatterIDs = battingTeam ? battingTeam.currentBatterIDs : [];
  const currentBowlerID = bowlingTeam && bowlingTeam.currentBowlerID

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
        <FormField label="Select Batting Team" name="batting-team">
          <Select
            options={teamNames}
            value={battingTeamName}
            onChange={({ selected }) => {
              selectBattingTeam(teamIDs[selected]);
            }}
          />
        </FormField>
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
              selectBowler({ bowlerID: bowlingTeamPlayerIDs[selected] });
            }}
          />
        </FormField>
        <Box direction="row" justify="end" margin={{ top: "medium" }}>
          <Button
            label="Start"
            primary
            onClick={() => {
              startMatch();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StartMatch);
