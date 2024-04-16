import React from "react";
import { Box, Text } from "grommet";

function Loading({ children }) {
  return (
    <Box style={{ height: "200px" }} justify="center">
      <Text alignSelf="center" size="48px" weight="bold" color="#5243b9">
        {children}
      </Text>
    </Box>
  );
}

export default Loading;
