import React from "react";
import { MiniSummary } from "./mini-summary";
import { storiesOf } from "@storybook/react";

storiesOf("Mini Summary", module).add("Live", () => {
  const props = {
    teams: [{
      name: "KAB",
      score: "201",
      overs: "47.4",
    },{
      name: "SCR",
      score: "202/3",
      overs: "43.5",
    }],
    resultText: "Scriptors won by 7 wickets"
  };

  return <MiniSummary {...props} />;
});
