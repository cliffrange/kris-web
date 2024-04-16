import styled from "styled-components";
import { Box } from "grommet";

export const XaxisPart = styled(Box)`
  text-align: center;
  font-size: ${(props) => (props.totalOvers > 30 ? "9px" : "14px")};
  width: ${(props) => `${props.thickness}px`};
  font-weight: 700;
`;

export const Yaxis = styled(Box)`
  flex: 0 0 20px;
  height: ${(props) => props.height}px;
  margin-right: 14px;
  align-items: stretch;
  padding-bottom: ${(props) => props.thickness / 2}px;
  padding-top: ${(props) => props.thickness / 2}px;
`;

export const YaxisPart = styled(Box)`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  height: 100%;
  border-top: 2px solid #466fb4;
`;
