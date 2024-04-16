import React from "react";
import Wicket from "./wicket";

export default { title: "Wicket" };

const team = {
  teamName: "Kaboomers",
  playerIDs: ["1", "2", "3"],
  players: {
    "1": {
      lastName: "Herath"
    },
    "2": {
      lastName: "Taylor"
    },
    "3": {
      lastName: "Cat"
    }
  }
};

export const bowlers = () => <Wicket fieldingTeam={team} />;
