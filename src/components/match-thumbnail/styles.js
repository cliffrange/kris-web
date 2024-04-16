import styled from "styled-components";
import { Box, Text } from "grommet";

export const Badge = styled(Box)`
  height: 25px;
  border-radius: 2px;
  background-color: #2ab52a;
  padding: 0px 6px;
  color: #eeeeee;
  font-size: 14px;
  font-weight: bold;
`;

export const Tag = styled(Text)`
  position: absolute;
  font-weight: bold;
  color: lime;
  background-color: #6b6b56;
  padding: 2px;
  margin: 10px;
`;

export const MatchTitle = styled(Box)`
  font-weight: bold;
`;

export const MatchHeader = styled(Box)`
  min-height: 50px;
`;

export const MatchDescription = styled.span`
  font-size: 16px;
`;

export const MatchScore = styled(Box)`
  font-size: 20px;
  font-weight: bold;
`;

export const Container = styled(Box)`
  max-width: 360px;
  :hover {
  border-color: ${(props) => props.isNew ? "lime" : "white" };
  }
`;
