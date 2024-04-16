import React from "react";
import { Box, Text, TableHeader, TableRow, TableCell } from "grommet";
import {
  BowlingCardBody,
  Overs,
  Balls,
  Runs,
  Wickets,
  Bowler,
  BowlerRow,
  Header,
  BowlingCardTable,
} from "./bowling-card-components";

function BowlingCard({ bowlingTeam }) {
  if (!bowlingTeam) {
    return "NO INFO";
  }

  return (
    <Box>
      <Box
        pad="xsmall"
        align="center"
        round={{ corner: "top", size: "small" }}
        background={{ color: "brand" }}
      >
        <Text size="large">{bowlingTeam.teamName}</Text>
      </Box>
      <BowlingCardTable style={{ width: "100%" }}>
        <TableHeader>
          <TableRow>
            <TableCell scope="col"></TableCell>
            <Header pad={{ bottom: "xsmall", right: "none" }} scope="col">
              Overs
            </Header>
            <Balls pad={{ right: "none" }} plain></Balls>
            <Header scope="col">Runs</Header>
            <Header scope="col">Wickets</Header>
          </TableRow>
        </TableHeader>
        <BowlingCardBody>
          {bowlingTeam.bowlOrder
            .map((pid) => bowlingTeam.players[pid])
            .map(
              ({ id, lastName, bowler: { wickets, runs, overs, balls } }) => (
                <BowlerRow key={id}>
                  <Bowler scope="row">{lastName}</Bowler>
                  <Overs pad={{ right: "none" }}>{overs}</Overs>
                  <Balls pad={{ left: "none" }}>
                    {balls > 0 ? `.${balls}` : ""}
                  </Balls>
                  <Runs>{runs}</Runs>
                  <Wickets>{wickets}</Wickets>
                </BowlerRow>
              ),
            )}
        </BowlingCardBody>
      </BowlingCardTable>
      <Box
        pad="xsmall"
        align="center"
        round={{ corner: "bottom", size: "small" }}
        background={{ color: "brand" }}
      ></Box>
    </Box>
  );
}

export { BowlingCard };
