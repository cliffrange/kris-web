import React from "react";
import { Box, Text } from "grommet";
import {
  ScoreCardTable,
  ScoreCardBody,
  BallCount,
  Score,
  Batter,
  BatterStatus,
  BatterRow,
} from "./scorecard-components";

function getWicketText(battingTeam, bowlingTeam, wicket) {
  if (wicket.type === "BOWLED") {
    return `b ${bowlingTeam.players[wicket.bowlerID].lastName}`;
  }
  if (wicket.type === "LBW") {
    return `lbw b ${bowlingTeam.players[wicket.bowlerID].lastName}`;
  }
  if (wicket.type === "CAUGHT") {
    if (wicket.fielders[0] === wicket.bowlerID) {
      return `c & b ${bowlingTeam.players[wicket.bowlerID].lastName}`;
    }
    return `c ${bowlingTeam.players[wicket.fielders[0]].lastName} b ${
      bowlingTeam.players[wicket.bowlerID].lastName
    }`;
  }
  if (wicket.type === "STUMPED") {
    return `st ${bowlingTeam.players[wicket.fielders[0]].lastName} b ${
      bowlingTeam.players[wicket.bowlerID].lastName
    }`;
  }
  if (wicket.type === "RUNOUT") {
    return `run out (${bowlingTeam.players[wicket.fielders[0]].lastName})`;
  }
  if (wicket.type === "HITWICKET") {
    return `hit wicket b ${bowlingTeam.players[wicket.bowlerID].lastName}`;
  }
  if (wicket.type === "RETIRED_OUT") {
    return "retired out";
  }
}

function ScoreCard({ battingTeam, bowlingTeam, currentBatterIDs }) {
  if (!battingTeam) {
    return "NO INFO";
  }

  const scoreboardData = {};
  const playerIDs = [];

  battingTeam.batOrder.forEach((pid) => {
    scoreboardData[pid] = {
      id: pid,
      firstName: battingTeam.players[pid].firstName,
      lastName: battingTeam.players[pid].lastName,
      score: battingTeam.players[pid].batter.score,
      balls: battingTeam.players[pid].batter.balls,
      notOut: false,
    };
    playerIDs.push(pid);
  });

  battingTeam.batLineup.forEach((pid) => {
    if (scoreboardData[pid]) {
      return;
    }
    scoreboardData[pid] = {
      firstName: battingTeam.players[pid].firstName,
      lastName: battingTeam.players[pid].lastName,
    };
    playerIDs.push(pid);
  });

  battingTeam.wickets.forEach((wicket) => {
    scoreboardData[wicket.batterID].wicket = getWicketText(
      battingTeam,
      bowlingTeam,
      wicket,
    );
  });

  currentBatterIDs.forEach((pid) => {
    scoreboardData[pid].wicket = "not out";
    scoreboardData[pid].notOut = true;
  });

  return (
    <Box>
      <Box
        pad="xsmall"
        align="center"
        round={{ corner: "top", size: "small" }}
        background={{ color: "brand" }}
      >
        <Text size="large">{battingTeam.teamName}</Text>
      </Box>
      <ScoreCardTable>
        <ScoreCardBody>
          {playerIDs
            .map((pid) => scoreboardData[pid])
            .map(({ id, lastName, wicket, score, balls, notOut }) => (
              <BatterRow key={id} notOut={notOut}>
                <Batter plain>{lastName}</Batter>
                <BatterStatus plain>{wicket ? wicket : ""}</BatterStatus>
                <Score plain>{score !== undefined ? score : ""}</Score>
                <BallCount plain>{balls !== undefined ? balls : ""}</BallCount>
              </BatterRow>
            ))}
        </ScoreCardBody>
      </ScoreCardTable>
      <Box
        pad="xsmall"
        align="center"
        round={{ corner: "bottom", size: "small" }}
        background={{ color: "brand" }}
        direction="row"
        justify="between"
      >
        <Box pad="xsmall">Extras {battingTeam.extras.total}</Box>
        <Box pad="xsmall">
          {battingTeam.score.score}/{battingTeam.score.wickets}
        </Box>
      </Box>
    </Box>
  );
}

export default ScoreCard;
