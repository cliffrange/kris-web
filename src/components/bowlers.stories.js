import React from "react";
import Bowlers from "./bowlers";

export default { title: "Bowlers" };

const team = {
  teamName: "Kaboomers",
  playerIDs: ["1", "2", "3"],
  players: {
    "1": {
      lastName: "Herath",
      bowler: {
        runs: 10,
        overs: 1,
        wickets: 1
      }
    },
    "2": {
      lastName: "Taylor",
      bowler: {
        runs: 13,
        overs: 3,
        wickets: 3
      }
    },
    "3": {
      lastName: "Cat",
      bowler: {
        runs: 13,
        overs: 3,
        wickets: 0
      }
    }
  }
};

export const bowlers = () => <Bowlers team={team} />;
