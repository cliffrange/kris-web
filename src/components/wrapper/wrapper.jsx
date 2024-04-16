import React from "react";
import { Box, Text } from "grommet";

const Wrapper = ({ title, subtitle, children }) => {
  return (
    <Box>
      <Box
        pad="small"
        background="brand"
        round={{ corner: "top", size: "small" }}
      >
        <Text textAlign="center">{title}</Text>
        {subtitle && (
          <Text textAlign="center" size="xsmall">
            {subtitle}
          </Text>
        )}
      </Box>
      <Box
        direction="row"
        flex
        justify="between"
        pad="small"
        border={[
          { size: "small", size: "xsmall", side: "vertical" },
          { size: "small", size: "xsmall", side: "bottom" },
        ]}
        round={{ corner: "bottom", size: "small" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export { Wrapper };
