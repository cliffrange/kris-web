import React from "react";
import { connect } from "react-redux";
import { Box, Button, Form, FormField, Select } from "grommet";

const Extra = ({ onClose, ballState, ball }) => {
  const [selectedExtrasAmount, setSelectedExtrasAmount] = React.useState("1");

  return (
    <Box pad="small" background="#EEEEEEF0" style={{ zIndex: 3 }}>
      <Box direction="row" justify="between" align="center">
        <Form
          style={{ width: "100%" }}
          onSubmit={() => {
            ball({
              ...ballState,
              runs: parseInt(selectedExtrasAmount),
              wide: true,
            });
            onClose();
          }}
        >
          <FormField label="How Many?">
            <Select
              id="wide-number-select"
              placeholder="placeholder"
              options={["1", "2", "3", "4", "5", "6", "7", "8"]}
              value={selectedExtrasAmount}
              onChange={({ option }) => setSelectedExtrasAmount(option)}
            />
          </FormField>
          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button label="Cancel" onClick={onClose} />
            <Button type="submit" label="Done" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default Extra;
