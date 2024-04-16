import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { Box, Stack, Layer, Drop, Button, Text } from "grommet";
import { matchStates } from "@cliffrange/kris-store";
import Ball from "./ball";
import SelectPlayer from "./select-new-batter";
import Wicket from "./wicket";
import Extra from "./extra";
import CurrentToNext from "./current-to-next/current-to-next";
import StartInnings from "./start-innings";
import ResultSummary from "../containers/result/mini-summary";
import StartMatch from "./start-match";
import { More } from "grommet-icons";
import { useState } from "react";
import { CustomBall } from "./custom-ball/custom-ball";

const HoverBall = styled(Ball)`
  margin-left: ${({ right }) => (right ? "auto" : "0px")};
  z-index: ${({ right }) => (right ? 1 : 0)};
  &:hover {
    background-color: #bcbee3;
    color: #060b4f;
  }
`;

const RunScorer = ({
  state,
  isTryIt,
  ball,
  changeBowler,
  switchEnd,
  setIsAddingWicket,
  setIsAddingWide,
  setIsAddingNB,
  setIsAddingBye,
  setIsAddingLegBye,
  isAddingNB,
  isAddingWicket,
  isAddingWide,
  isAddingBye,
  isAddingLegBye,
  outBatterID,
  currentBowlerID,
  lastBowlerID,
  currentStrikerID,
  selectNewBatter,
  selectBowler,
  teams,
  battingTeamID,
  bowlingTeamID,
  deleteMatch,
  showScoreStream,
  properties,
}) => {
  const score = battingTeamID ? teams[battingTeamID].score : {};
  const dropRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInitialInfo, setShowInitialInfo] = useState(true);
  const [showInningsInfo, setShowInningsInfo] = useState(true);
  const [isAddingCustomBall, setIsAddingCustomBall] = useState(false);

  const getModalContent = () => {
    if (showInitialInfo === true && isTryIt) {
      return (
        <Box pad={"small"} background={{ color: "rgba(83, 91, 184, 0.9)" }}>
          <Text margin={{ top: "12px", right: "26px" }}>
            2019 World Cup finalists are battling it out again in a T20!
          </Text>
          <Text margin={{ top: "10px" }}>
            Team New Zealand is 83/3 after 10.3 overs.
          </Text>
          <Text margin={{ top: "10px" }}>
            Continue to score the match from here.
          </Text>
          <Box width="80px" margin={{ left: "auto", right: "auto" }}>
            <Button
              margin={{ top: "10px" }}
              label="OK"
              onClick={() => {
                setShowInitialInfo(false);
              }}
            ></Button>
          </Box>
        </Box>
      );
    }

    if (state === matchStates.INNINGS_OVER && showInningsInfo) {
      return (
        <Box
          pad={"small"}
          round={{ corner: "top", size: "xxsmall" }}
          background={{ color: "rgba(83, 91, 184, 0.9)" }}
        >
          <Text margin={{ top: "10px", right: "20px" }}>
            End of the {teams[bowlingTeamID].teamName} innings.
          </Text>
          <Text margin={{ top: "10px" }}>
            {teams[bowlingTeamID].teamName} scored{" "}
            {teams[bowlingTeamID].score.score} for{" "}
            {teams[bowlingTeamID].score.wickets}.
          </Text>
          <Text margin={{ top: "10px" }}>
            {teams[battingTeamID].teamName} need{" "}
            {teams[battingTeamID].score.target} runs to win at{" "}
            {teams[battingTeamID].score.target / properties.opi} runs per over
          </Text>
          <Box width="80px" margin={{ left: "auto", right: "auto" }}>
            <Button
              margin={{ top: "10px" }}
              label="OK"
              onClick={() => {
                setShowInningsInfo(false);
              }}
            ></Button>
          </Box>
        </Box>
      );
    }

    if (state === matchStates.INNINGS_OVER) {
      return (
        <Box pad={"small"}>
          <StartInnings isTryIt={isTryIt} />
        </Box>
      );
    }

    if (state === matchStates.NOT_STARTED) {
      return (
        <Box pad={"small"}>
          <StartMatch isTryIt={isTryIt} />
        </Box>
      );
    }

    if (state === matchStates.MATCH_OVER) {
      let winTeam;
      let margin = "";

      if (
        teams[battingTeamID].score.score >= teams[battingTeamID].score.target
      ) {
        winTeam = teams[battingTeamID].teamName;
        margin = `${
          properties.ppt - 1 - teams[battingTeamID].score.wickets
        } wickets`;
      } else if (
        teams[battingTeamID].score.score <
        teams[battingTeamID].score.target - 1
      ) {
        winTeam = teams[bowlingTeamID].teamName;
        margin = `${
          teams[battingTeamID].score.target -
          1 -
          teams[battingTeamID].score.score
        } runs`;
      }

      return (
        <Box
          background={{ color: "rgba(83, 91, 184, 0.8)" }}
          round={{ corner: "top", size: "xxsmall" }}
          pad="small"
        >
          <ResultSummary isTryIt={isTryIt} />
          <Text margin={{ top: "10px" }} textAlign="center">
            {winTeam ? `${winTeam} won by ${margin}` : "Match Drawn"}
          </Text>
        </Box>
      );
    }

    if (state !== matchStates.LIVE) {
      return null;
    }

    if (isAddingWicket) {
      return (
        <Box>
          <Wicket
            ball={onBall}
            fieldingTeam={teams[bowlingTeamID]}
            onClose={() => {
              setIsAddingWicket(false);
            }}
            isAddingNB={isAddingNB || isAddingBye || isAddingLegBye}
          />
        </Box>
      );
    }

    if (isAddingWide) {
      return (
        <Box>
          <Extra
            ball={ball}
            onClose={() => {
              setIsAddingWide(false);
            }}
          />
        </Box>
      );
    }

    if (outBatterID) {
      const alreadyBatted = {};
      teams[battingTeamID].batOrder.forEach((id) => {
        alreadyBatted[id] = true;
      });

      return (
        <SelectPlayer
          players={teams[battingTeamID].batLineup
            .filter((id) => !alreadyBatted[id])
            .map((id) => teams[battingTeamID].players[id])}
          selectNewBatter={(player) => selectNewBatter({ batterID: player.id })}
          text={"Select New Batter"}
        />
      );
    }

    if (!currentBowlerID) {
      return (
        <SelectPlayer
          players={[...teams[bowlingTeamID].playerIDs].reverse().map((id) => ({
            ...teams[bowlingTeamID].players[id],
            disabled: id === lastBowlerID,
          }))}
          selectNewBatter={(player) => selectBowler({ bowlerID: player.id })}
          text={"Select New Bowler"}
        />
      );
    }

    if (isAddingCustomBall) {
      return (
        <Box>
          <CustomBall
            onSubmit={(value) => {
              let runsInput = value.runs ? value.runs.trim() : "0";
              runsInput = runsInput.length > 0 ? runsInput : "0";
              let runs = parseInt(runsInput);
              if (!runs) {
                runs = 0;
              }

              const ballInfo = { runs };

              if (value.isOut) {
                ballInfo.wicket = { type: "RETIRED_OUT" };
              }

              const { shouldCount, isExtra } = value;

              onBall({ ...ballInfo, shouldCount, isExtra });

              setIsAddingCustomBall(false);
            }}
            onCancel={() => {
              setIsAddingCustomBall(false);
            }}
          />
        </Box>
      );
    }

    return null;
  };

  const onBall = useCallback(
    (ballInfo) => {
      ball({
        ...ballInfo,
        noBall: isAddingNB,
        bye: isAddingBye,
        legBye: isAddingLegBye,
      });
      if (isAddingNB) {
        setIsAddingNB(false);
      }

      if (isAddingLegBye) {
        setIsAddingLegBye(false);
      }

      if (isAddingBye) {
        setIsAddingBye(false);
      }
    },
    [isAddingNB, isAddingLegBye, isAddingBye],
  );

  return (
    <Box>
      {showConfirmation && (
        <Layer
          onEsc={() => setShowConfirmation(false)}
          onClickOutside={() => setShowConfirmation(false)}
        >
          <Box pad="small">
            <Text>
              All the data associated with this match will be removed. This data
              cannot be recovered if you continue with deletion. Are you sure
              you want to delete?
            </Text>
            <Box width="xsmall" alignSelf="center" margin={{ top: "small" }}>
              <Button
                size="small"
                label="Delete"
                onClick={() => {
                  setShowConfirmation(false);
                  deleteMatch();
                }}
              />
            </Box>
          </Box>
        </Layer>
      )}
      <Stack>
        <Box>
          <Box gap="small" pad="small">
            <Box gap="small" direction="row">
              <HoverBall
                onClick={() => onBall({ runs: 0 })}
                background={{ color: "brand" }}
                text="."
              />
              <HoverBall
                onClick={() => onBall({ runs: 1 })}
                background={{ color: "brand" }}
                text="1"
              />
              <HoverBall
                onClick={() => onBall({ runs: 2 })}
                background={{ color: "brand" }}
                text="2"
              />
              <HoverBall
                onClick={() => onBall({ runs: 3 })}
                background={{ color: "brand" }}
                text="3"
              />
              <HoverBall
                right
                background={{ color: "brand" }}
                content={
                  <Box justify="center" direction="row">
                    <More size="14px" />
                  </Box>
                }
                onClick={() => {
                  setMenuOpen(true);
                }}
                refForward={dropRef}
              />
              {menuOpen && (
                <Drop
                  target={dropRef.current}
                  onClickOutside={() => {
                    setMenuOpen(false);
                  }}
                  onEsc={() => {
                    setMenuOpen(false);
                  }}
                  align={{ top: "top", right: "right" }}
                >
                  <Box pad="small">
                    <Button
                      gap="small"
                      label="Change Bowler"
                      plain
                      hoverIndicator="background"
                      onClick={() => {
                        changeBowler({ localOnly: isTryIt });
                        setMenuOpen(false);
                      }}
                    />
                    <Button
                      gap="small"
                      label="Switch Batter Ends"
                      plain
                      hoverIndicator="background"
                      onClick={() => {
                        switchEnd({ localOnly: isTryIt });
                        setMenuOpen(false);
                      }}
                    />
                    <Button
                      gap="small"
                      label="Custom Action"
                      plain
                      hoverIndicator="background"
                      onClick={() => {
                        setIsAddingCustomBall(true);
                        setMenuOpen(false);
                      }}
                    />
                    <hr></hr>

                    <Button
                      gap="small"
                      label="Score Board for Video Stream"
                      plain
                      hoverIndicator="background"
                      onClick={() => {
                        showScoreStream();
                        setMenuOpen(false);
                      }}
                    />
                    <hr></hr>
                    <Button
                      gap="small"
                      label="Delete Match"
                      plain
                      color="red"
                      hoverIndicator="background"
                      onClick={() => {
                        setShowConfirmation(true);
                        setMenuOpen(false);
                      }}
                    />
                  </Box>
                </Drop>
              )}
            </Box>
            <Box gap="small" direction="row">
              <HoverBall
                onClick={() => onBall({ runs: 4 })}
                background={{ color: "#835595" }}
                text="4"
              />
              <HoverBall
                onClick={() => onBall({ runs: 6 })}
                background={{ color: "#835595" }}
                text="6"
              />
            </Box>
            <Box gap="small" direction="row">
              <HoverBall
                onClick={() => setIsAddingWicket(true)}
                background={{ color: "contrast" }}
                text="W"
              />
            </Box>
            <Box gap="small" direction="row">
              <HoverBall
                onClick={() => setIsAddingNB(!isAddingNB)}
                background={{ color: isAddingNB ? "border" : "contrast" }}
                color="contrast"
                text={isAddingNB ? "x" : "nb"}
              />
              <HoverBall
                onClick={() => setIsAddingWide(true)}
                background={{ color: "contrast" }}
                color="contrast"
                text="wd"
              />
              <HoverBall
                onClick={() => setIsAddingBye(!isAddingBye)}
                background={{ color: isAddingBye ? "border" : "contrast" }}
                color="contrast"
                text={isAddingBye ? "x" : "bye"}
              />{" "}
              <HoverBall
                onClick={() => setIsAddingLegBye(!isAddingLegBye)}
                background={{ color: isAddingLegBye ? "border" : "contrast" }}
                color="contrast"
                text={isAddingLegBye ? "x" : "lb"}
              />
            </Box>
          </Box>
          <CurrentToNext
            score={score}
            battingTeamID={battingTeamID}
            bowlingTeamID={bowlingTeamID}
            teams={teams}
            currentBowlerID={currentBowlerID}
            currentStrikerID={currentStrikerID}
          />
        </Box>
        {getModalContent()}
      </Stack>
    </Box>
  );
};

export default RunScorer;
