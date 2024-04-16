import React from "react";
import { MatchThumbnail } from "./match-thumbnail";
import { storiesOf } from "@storybook/react";
import { Box } from "grommet";

storiesOf("MatchThumbnail", module).add("Live", () => {
  const match = {
    state: "LIVE",
    score: [
      { teamName: "KAB", score: "209/3", overs: "43.4" },
      { teamName: "SCR", score: "278/6", overs: "50" }
    ],
    stateDescription: "KAB need 69 runs in 56 balls",
    name: "Kaboomers vs Scriptors",
    description: "Wimbledon Cup - Match 1"
  };

  return <MatchThumbnail match={match} />;
});

storiesOf("MatchThumbnail", module).add("Long description", () => {
  const match = {
    state: "LIVE",
    score: [
      { teamName: "KAB", score: "209/3", overs: "43.4" },
      { teamName: "SCR", score: "278/6", overs: "50" }
    ],
    stateDescription: "KAB need 69 runs in 56 balls",
    name: "Kaboomers vs Scriptors",
    description:
      "With a much longer description. Like really long. This is a very important match. Like a big final maybe."
  };

  return <MatchThumbnail match={match} />;
});

storiesOf("MatchThumbnail", module).add("No description", () => {
  const match = {
    state: "LIVE",
    score: [
      { teamName: "KAB", score: "209/3", overs: "43.4" },
      { teamName: "SCR", score: "278/6", overs: "50" }
    ],
    stateDescription: "KAB need 69 runs in 56 balls",
    name: "Kaboomers vs Scriptors",
    description: ""
  };

  return <MatchThumbnail match={match} />;
});
