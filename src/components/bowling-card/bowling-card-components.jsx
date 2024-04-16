import styled from "styled-components";
import { Table, TableRow, TableCell, TableBody } from "grommet";

export const BowlingCardTable = styled(Table)`
  width: 100%;
`;

export const BowlingCardBody = styled(TableBody)`
  background-color: #5b4ebb;
`;

export const BowlerRow = styled(TableRow)`
  background-color: #466fb466;
`;

export const Bowler = styled(TableCell)`
  font-weight: bold;
`;

export const Balls = styled(TableCell)`
  text-align: left;
  width: 10px;
`;

export const Overs = styled(TableCell)`
  text-align: right;
  min-width: 75px;
`;

export const Runs = styled(TableCell)`
  text-align: right;
  font-weight: bold;
  min-width: 75px;
`;

export const Wickets = styled(TableCell)`
  text-align: right;
  font-weight: bold;
  min-width: 75px;
`;

export const Header = styled(TableCell)`
  text-align: right;
`;
