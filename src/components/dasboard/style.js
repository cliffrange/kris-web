import { Box } from "grommet";
import styled, { keyframes } from "styled-components";

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const AppearBox = styled(Box)`
  animation: ${appear} 1s linear;
`;

export { AppearBox };
