import React from "react";
import { storiesOf } from "@storybook/react";

import FullScoreCard from "./full-score-card";

const styles = {
  textAlign: "center"
};
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

storiesOf("Full Score Card", module)
  .addDecorator(CenterDecorator)
  .add("full score card", () => {
    const team = {
      teamName: "Storybook Readers",
      playerIDs: ["7", "2", "3", "5", "11", "6", "1", "4", "8", "10", "9"],
      players: {
        "1": {
          firstName: "Sanath",
          lastName: "Jayasuriya",
          batter: {
            score: 20,
            balls: 18,
            didBat: true,
            inAt: 1
          },
          bowler: {}
        },
        "2": {
          firstName: "Romesh",
          lastName: "Kaluwitarana",
          batter: {
            score: 34,
            balls: 23,
            didBat: true,
            inAt: 2
          },
          bowler: {}
        },
        "3": {
          firstName: "Aravinda",
          lastName: "de Silva",
          batter: {
            score: 120,
            balls: 102,
            didBat: true,
            inAt: 3
          },
          bowler: {}
        },
        "4": {
          firstName: "Arjuna",
          lastName: "Ranatunga",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 4
          },
          bowler: {}
        },
        "5": {
          firstName: "Asanka",
          lastName: "Gurusinghe",
          batter: {
            score: 0,
            balls: 3,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "6": {
          lastName: "Mahanama",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "7": {
          lastName: "Thillekeratne",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "8": {
          lastName: "Dharmasena",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "9": {
          lastName: "Vaas",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "10": {
          lastName: "Muralitharan",
          batter: {
            score: 9,
            balls: 12,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        },
        "11": {
          lastName: "Wickkramasinghe",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {}
        }
      },
      batOrder: ["1", "2", "3", "10", "5"],
      outBatters: {
        "1": {},
        "2": {},
        "10": {}
      },
      batLinup: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      bowlOrder: ["21", "25", "30"]
    };

    return <FullScoreCard team={team} />;
  });
