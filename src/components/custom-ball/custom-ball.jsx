import React from "react";
import { Box, Form, FormField, TextInput, CheckBox, Button } from "grommet";

const CustomBall = ({ onSubmit, onCancel }) => {
  return (
    <Box pad="small" background="#EEEEEEF0" style={{ zIndex: 3 }}>
      <Form
        onSubmit={({ value }) => {
          onSubmit(value);
        }}
      >
        <FormField name="runs" label="Runs scored" htmlfor="id-number-of-runs">
          <TextInput
            id="id-number-of-runs"
            placeholder="Number of runs"
            name="runs"
          />
        </FormField>
        <FormField name="isExtra">
          <CheckBox label="Extras" name="isExtra" />
        </FormField>
        <FormField name="shouldCount">
          <CheckBox label="Count ball" name="shouldCount" />
        </FormField>
        <FormField name="isOut">
          <CheckBox label="Wicket" name="isOut" />
        </FormField>
        <Box direction="row" justify="between">
          <Button label="Cancel" onClick={() => onCancel()} />
          <Button type="submit" primary label="Done" />
        </Box>
      </Form>
    </Box>
  );
};

export { CustomBall };
