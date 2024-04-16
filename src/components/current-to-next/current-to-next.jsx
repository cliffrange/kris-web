import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Box } from "grommet";
import styled from "styled-components";

const Current = styled(Box)`
  .current {
    position: absolute;
    top: 10px;
  }
  .item-enter {
    top: -20px;
  }
  .item-enter-active {
    top: 10px;
    transition: top 300ms ease-in;
  }
  .item-exit {
    top: 10px;
  }
  .item-exit-active {
    top: 40px;
    transition: top 300ms ease-in;
  }
`;

const CurrentToNext = ({
  score,
  teams,
  bowlingTeamID,
  battingTeamID,
  currentBowlerID,
  currentStrikerID,
}) => {
  let text = "";

  if (currentBowlerID && currentStrikerID) {
    try {
      text = `${score.over}.${score.ball + 1} ${
        teams[bowlingTeamID].players[currentBowlerID].lastName
      } to ${teams[battingTeamID].players[currentStrikerID].lastName}`;
    } catch (e) {
      console.log("Error while creating the current text")
    }
  } else {
    text = `End of over ${score.over}`;
  }

  return (
    <Box style={{ position: "relative", overflow: "hidden" }} height="xxsmall">
      <Current
        style={{ fontSize: "14px", backgroundColor: "rgb(19, 8, 97)" }}
        pad="small"
        height="xxsmall"
      >
        <TransitionGroup>
          {[
            <CSSTransition key={text} timeout={300} classNames="item">
              <div className="current">{text}</div>
            </CSSTransition>,
          ]}
        </TransitionGroup>
      </Current>
    </Box>
  );
};

export default CurrentToNext;
