import styled from "styled-components";
import { Table, TableRow, TableCell, TableBody } from "grommet";

export const ScoreCardTable = styled(Table)`
  width: 100%;
  table-layout: auto;
`;

export const ScoreCardBody = styled(TableBody)`
  background-color: #5b4ebb;
  ${BatterRow}:last-child {
    border-bottom: none;
  }
`;

export const BatterRow = styled(TableRow)`
  background-color: ${props => (props.notOut ? "#3d2db2" : "#466fb466")};
  color: ${props => (props.notOut ? "#fffbfb" : "inherit")};
  border-bottom: 0.1px solid black;
`;

export const Batter = styled(TableCell)`
  font-weight: bold;
`;

export const BatterStatus = styled(TableCell)`
  width: 60%;
  font-size: 15px;
  min-width: 100px;
`;

export const BallCount = styled(TableCell)`
  text-align: right;
  font-size: 15px;
`;

export const Score = styled(TableCell)`
  padding-right: 0px;
  text-align: right;
  font-weight: bold;
`;
