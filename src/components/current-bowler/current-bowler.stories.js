import React from "react";
import { CurrentBowler } from "./current-bowler";

export default { title: "CurrentBowler" };

export const normal = () => {
  const currentBowler = {
      firstName: "Aruna",
      lastName: "Herath"
  };

  return (
    <div>
      <CurrentBowler currentBowler={currentBowler} />
    </div>
  );
};
