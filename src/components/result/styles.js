import styled from "styled-components";
import { Box } from "grommet";

export const MatchScore = styled(Box)`
  & {
    animation: ${({ winner }) => (winner ? "pulse 500ms 3" : "none")};
    font-size: 20px;
  }

  .overs {
    font-size: 14px;
    margin-left: 5px;
  }

  @keyframes pulse {
    0% {
      background-color: rgb(19, 8, 97);
    }
    50% {
      background-color: rgb(131, 85, 149);
    }
    100% {
      background-color: rgb(19, 8, 97);
    }
  }
`;
