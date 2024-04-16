import React from "react";
import { storiesOf } from "@storybook/react";

import { BowlingCard } from "./bowling-card";

const styles = {
  textAlign: "center"
};
const CenterDecorator = storyFn => <div style={styles}>{storyFn()}</div>;

storiesOf("Bowling", module)
  .addDecorator(CenterDecorator)
  .add("bowling card", () => {
    const battingTeam = {
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
          firstName: "Roshan",
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
          firstName: "Hashan",
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
          firstName: "Kumara",
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
          firstName: "Chaminda",
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
          firstName: "Muttiah",
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
          firstName: "Pramodaya",
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
      wickets: [
        { batterID: "1", bowlerID: "31", type: "BOWLED" },
        { batterID: "2", bowlerID: "31", type: "CAUGHT", fielders: ["21"] },
        { batterID: "10", bowlerID: "29", type: "CAUGHT", fielders: ["29"] }
      ],
      batLineup: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      bowlOrder: ["21", "25", "30"]
    };

    const bowlingTeam = {
      teamName: "Scriptors",
      playerIDs: [
        "27",
        "22",
        "23",
        "25",
        "31",
        "26",
        "21",
        "24",
        "28",
        "30",
        "29"
      ],
      players: {
        "21": {
          firstName: "Mark",
          lastName: "Waugh",
          batter: {
            score: 20,
            balls: 18,
            didBat: true,
            inAt: 1
          },
          bowler: {}
        },
        "22": {
          firstName: "Mark",
          lastName: "Taylor",
          batter: {
            score: 34,
            balls: 23,
            didBat: true,
            inAt: 2
          },
          bowler: {
            runs: 17,
            overs: 1,
            balls: 0,
            wickets: 0
          }
        },
        "23": {
          firstName: "Ricky",
          lastName: "Ponting",
          batter: {
            score: 120,
            balls: 102,
            didBat: true,
            inAt: 3
          },
          bowler: {}
        },
        "24": {
          firstName: "Stuart",
          lastName: "Law",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 4
          },
          bowler: {}
        },
        "25": {
          firstName: "Steve",
          lastName: "Waugh",
          batter: {},
          bowler: {}
        },
        "26": {
          firstName: "Michael",
          lastName: "Beven",
          batter: {},
          bowler: {}
        },
        "27": {
          firstName: "Ian",
          lastName: "Healy",
          bowler: {}
        },
        "28": {
          firstName: "Shane",
          lastName: "Warne",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {
            runs: 5,
            overs: 2,
            balls: 2,
            wickets: 1
          }
        },
        "29": {
          firstName: "Paul",
          lastName: "Reiffel",
          batter: {
            score: 0,
            balls: 0,
            didBat: true,
            inAt: 5
          },
          bowler: {
            runs: 43,
            overs: 4,
            balls: 0,
            wickets: 0
          }
        },
        "30": {
          firstName: "Damien",
          lastName: "Flemming",
          batter: {
            score: 9,
            balls: 12,
            didBat: true,
            inAt: 5
          },
          bowler: {
            runs: 23,
            overs: 2,
            balls: 0,
            wickets: 0
          }
        },
        "31": {
          firstName: "Glenn",
          lastName: "McGrath",
          batter: {},
          bowler: {
            runs: 13,
            overs: 5,
            balls: 0,
            wickets: 2
          }
        }
      },
      batOrder: [],
      wickets: [],
      batLineup: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
      bowlOrder: ["31", "30", "28", "29", "22"]
    };

    return <BowlingCard bowlingTeam={bowlingTeam} />;
  });
