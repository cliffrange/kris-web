import React, { useState } from "react";
import { Box, Button, FormField, Select } from "grommet";

const SelectPlayer = ({ players, selectNewBatter, text }) => {
  const [selectedBatterIdx, selectBatter] = useState(0);
  const options = players.map((p) => p.lastName);
  const disabled = [];
  players.forEach((p, i) => {
    if (p.disabled) {
      disabled.push(i);
    }
  });

  return (
    <Box
      background={{ color: "#EEEEEEF0" }}
      pad="small"
      style={{ position: "relative", zIndex: 3 }}
    >
      <FormField label={text || "Select new Player"} name="new-batter">
        <Select
          options={options}
          value={options[selectedBatterIdx]}
          onChange={({ selected }) => {
            console.log(selected);
            selectBatter(selected);
          }}
          disabled={disabled}
        />
      </FormField>
      <Box direction="row" margin={{ top: "medium" }}>
        <Button
          label="Done"
          alignSelf="end"
          primary
          onClick={() => {
            selectNewBatter(players[selectedBatterIdx]);
          }}
        />
      </Box>
    </Box>
  );
};

export default SelectPlayer;
