import React from "react";
import { Box, Button, Text } from "grommet";

function Ball({ className, text, content, onClick, background, refForward }) {
  return (
    <Box
      className={className}
      round="full"
      width="32px"
      height="32px"
      background={background}
      ref={refForward}
    >
      <Button fill onClick={onClick} alignContent="center">
        <Box>
          {content ? (
            content
          ) : (
            <Text alignSelf="center" size="small" weight="bold">
              {text}
            </Text>
          )}
        </Box>
      </Button>
    </Box>
  );
}

export default Ball;
