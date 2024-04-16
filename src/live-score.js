import React from "react";
import ReactDOM from "react-dom";
import { Grommet, grommet } from "grommet";
import Score from "./components/score";

const update = async () => {
  const response = await fetch("/api/live/5e379dc1a6724a4d1b92fe3f", {
    method: "GET"
  });
  const result = await response.json();
  ReactDOM.render(
    <Grommet theme={grommet}>
      <Score {...result.score} />
    </Grommet>,
    document.getElementById("app")
  );
};

setInterval(update, 2000);
update();

module.hot.accept();
