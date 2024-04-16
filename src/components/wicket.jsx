import React from "react";
import { Box, Button, Form, FormField, Select } from "grommet";
import { ball } from "../redux/actions/action-creators";

const fielderWicketTypeIds = ["CAUGHT", "STUMPED", "RUNOUT"];

const allWicketTypes = [
  { label: "Bowled", name: "BOWLED" },
  { label: "Caught", name: "CAUGHT" },
  { label: "Run Out", name: "RUNOUT" },
  { label: "Stumped", name: "STUMPED" },
  { label: "LBW", name: "LBW" },
  { label: "Hit Wicket", name: "HITWICKET" },
];

const wicketTypesOnNb = [{ label: "Run Out", name: "RUNOUT" }];

const allWicketTypeLabels = allWicketTypes.map((type) => type.label);
const wicketTypeLabelsOnNB = wicketTypesOnNb.map((type) => type.label);

const getFielderSelect = (
  fieldingTeam,
  selectedFielderIdx,
  setSelectedFielderIdx,
) => {
  const options = fieldingTeam.playerIDs.map((id) => {
    const fielder = fieldingTeam.players[id];
    return fielder.lastName;
  });

  return (
    <Select
      id="fielder-select"
      placeholder="placeholder"
      options={options}
      value={options[selectedFielderIdx]}
      onChange={({ selected }) => setSelectedFielderIdx(selected)}
    />
  );
};

const Wicket = ({ onClose, ball, fieldingTeam, isAddingNB }) => {
  const [selectedWicketTypeIdx, setSelectedWicketTypeIdx] = React.useState(0);
  const [selectedFielderIdx, setSelectedFielderIdx] = React.useState(0);
  const wicketTypeLabels = isAddingNB
    ? wicketTypeLabelsOnNB
    : allWicketTypeLabels;
  const wicketTypes = isAddingNB ? wicketTypesOnNb : allWicketTypes;

  const shouldShowFielderList = fielderWicketTypeIds.includes(
    wicketTypes[selectedWicketTypeIdx].name,
  );

  return (
    <Box pad="small" background="#EEEEEEF0" style={{ zIndex: 3 }}>
      <Box>
        <FormField label="How?">
          <Select
            id="wicket-type-select"
            options={wicketTypeLabels}
            value={wicketTypes[selectedWicketTypeIdx].label}
            onChange={({ selected }) => setSelectedWicketTypeIdx(selected)}
          />
        </FormField>
        {shouldShowFielderList && (
          <FormField label="Fielder">
            {getFielderSelect(
              fieldingTeam,
              selectedFielderIdx,
              setSelectedFielderIdx,
            )}
          </FormField>
        )}
        <Box direction="row" justify="between" margin={{ top: "medium" }}>
          <Button label="Cancel" onClick={() => onClose()} />
          <Button
            type="submit"
            label="Done"
            primary
            onClick={() => {
              ball({
                runs: 0,
                wicket: {
                  type: wicketTypes[selectedWicketTypeIdx].name,
                  fielders: shouldShowFielderList
                    ? [fieldingTeam.playerIDs[selectedFielderIdx]]
                    : undefined,
                },
              });
              onClose();
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Wicket;
