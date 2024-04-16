import React from "react";
import { Manhatten } from "./manhatten";
import { storiesOf } from "@storybook/react";

storiesOf("Manhatten", module).add("10 overs", () => {
  const overs = [
    { runs: 5 },
    { runs: 14 },
    { runs: 4 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 5 },
    { runs: 13 },
    { runs: 9 },
    { runs: 13 },
  ];

  return <Manhatten overs={overs} totalOvers={10} />;
});

storiesOf("Manhatten", module).add("20 overs", () => {
  const overs = [
    { runs: 4 },
    { runs: 10 },
    { runs: 0, wickets: 1 },
    { runs: 1 },
    { runs: 5 },
    { runs: 13 },
    { runs: 4, wickets: 3 },
    { runs: 10, wickets: 1 },
    { runs: 4, wickets: 1 },
    { runs: 1 },
    { runs: 5 },
    { runs: 14 },
    { runs: 4 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 5 },
    { runs: 13, wickets: 1 },
    { runs: 9 },
    { runs: 13 },
  ];

  return <Manhatten overs={overs} totalOvers={20} />;
});

storiesOf("Manhatten", module).add("30 overs", () => {
  const overs = [
    { runs: 4 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 5, wickets: 2 },
    { runs: 13 },
    { runs: 4 },
    { runs: 10 },
    { runs: 4 },
    { runs: 1 },
    { runs: 5, wickets: 1 },
    { runs: 14 },
    { runs: 4 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 5 },
    { runs: 13 },
    { runs: 9 },
    { runs: 13 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 5 },
    { runs: 13 },
    { runs: 9 },
    { runs: 13 },
    { runs: 13, wickets: 3 },
    { runs: 9 },
    { runs: 13 },
  ];

  return <Manhatten overs={overs} totalOvers={30} />;
});

storiesOf("Manhatten", module).add("50 overs", () => {
  const overs = [
    { runs: 4 },
    { runs: 6, wickets: 1 },
    { runs: 10 },
    { runs: 13 },
    { runs: 10 },
    { runs: 0, wickets: 2 },
    { runs: 1 },
    { runs: 0 },
    { runs: 13 },
    { runs: 1 },
    { runs: 0 },
    { runs: 0 },
    { runs: 5 },
    { runs: 13, wickets: 1 },
    { runs: 12 },
    { runs: 5 },
    { runs: 4 },
    { runs: 10 },
    { runs: 14 },
    { runs: 4 },
    { runs: 9 },
    { runs: 1 },
    { runs: 2 },
    { runs: 5 },
    { runs: 5 },
    { runs: 14 },
    { runs: 14 },
    { runs: 4 },
    { runs: 6 },
    { runs: 10 },
    { runs: 12 },
    { runs: 10 },
    { runs: 2 },
    { runs: 1 },
    { runs: 4 },
    { runs: 1 },
    { runs: 5 },
    { runs: 5 },
    { runs: 13 },
    { runs: 11 },
    { runs: 5 },
    { runs: 9, wickets: 4 },
    { runs: 13 },
    { runs: 13 },
  ];

  return <Manhatten overs={overs} totalOvers={50} />;
});

storiesOf("Manhatten", module).add("50 overs - one big over", () => {
  const overs = [
    { runs: 4 },
    { runs: 6 },
    { runs: 10 },
    { runs: 13, wickets: 1 },
    { runs: 10 },
    { runs: 0 },
    { runs: 1 },
    { runs: 0 },
    { runs: 13 },
    { runs: 1 },
    { runs: 0 },
    { runs: 0, wickets: 2 },
    { runs: 5 },
    { runs: 13 },
    { runs: 12 },
    { runs: 5 },
    { runs: 4 },
    { runs: 10 },
    { runs: 34 },
    { runs: 4 },
    { runs: 9 },
    { runs: 1 },
    { runs: 2 },
    { runs: 5 },
    { runs: 5 },
    { runs: 14 },
    { runs: 14 },
    { runs: 4 },
    { runs: 6 },
    { runs: 10 },
    { runs: 12 },
    { runs: 10 },
    { runs: 2 },
    { runs: 1 },
    { runs: 4 },
    { runs: 1 },
    { runs: 5 },
    { runs: 5 },
    { runs: 13 },
    { runs: 11, wickets: 1 },
    { runs: 5, wickets: 3 },
    { runs: 9 },
    { runs: 13 },
    { runs: 13 },
  ];

  return <Manhatten overs={overs} totalOvers={50} max={35} />;
});
