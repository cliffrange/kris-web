import React from "react";
import { Updates } from "./updates";
import { storiesOf } from "@storybook/react";
import { Box } from "grommet";

const updates = [
  {
    type: "OVER",
    bowler: "McGrath",
    over: 34,
    score: "210/4",
    updates: [
      {
        type: "BALL",
        ball: "33.1",
        batter: "Jayasuriya",
        runs: 4
      },
      {
        type: "BALL",
        ball: "33.2",
        batter: "Jayasuriya",
        runs: 1
      },
      {
        type: "BALL",
        ball: "33.3",
        batter: "Ranatunga",
        runs: 0
      },
      {
        type: "BALL",
        ball: "33.4",
        batter: "Jayasuriya",
        runs: 6
      },
      {
        type: "BALL",
        ball: "33.5",
        batter: "Jayasuriya",
        runs: 1
      },
      {
        type: "BALL",
        ball: "33.6",
        batter: "Ranatunga",
        runs: 0
      }
    ]
  },
  {
    type: "OVER",
    bowler: "Warne",
    over: 35,
    score: "220/4",
    updates: [
      {
        type: "BALL",
        ball: "34.1",
        batter: "Jayasuriya",
        runs: 4
      },
      {
        type: "BALL",
        ball: "34.2",
        batter: "Jayasuriya",
        runs: 1
      },
      {
        type: "BALL",
        ball: "34.3",
        batter: "Ranatunga",
        runs: 0
      }
    ]
  }
];

storiesOf("Updates", module).add("Updates", () => {
  return (
    <Box width={"300px"}>
      <Updates updates={updates}></Updates>
    </Box>
  );
});
