import React from "react";
import { Table, TableRow, TableCell, Box } from "grommet";
import { Scrollbars } from "react-custom-scrollbars";
import Ball from "../ball";

const BallRow = ({ ball, batter, wicket, runs }) => (
  <TableRow key={ball}>
    <TableCell style={{ fontSize: "14px" }}>{ball}</TableCell>
    <TableCell style={{ fontSize: "14px" }}>{batter}</TableCell>
    <TableCell>
      <Box direction="row" gap="xsmall">
        <Ball text={runs} background={{ color: "brand" }} />
        {wicket && (
          <Ball text={"W"} background={{ color: "rgb(152, 40, 6)" }} />
        )}
      </Box>
    </TableCell>
  </TableRow>
);

const OverTable = ({ updates, bowler, over, score }) => {
  return (
    <Box>
      <Box
        direction="row"
        gap="xsmall"
        justify="between"
        background={{ color: "#F6F9FC" }}
        pad="xsmall"
      >
        <Box>Over {over}</Box>|
        <Box>
          <strong>{bowler}</strong>
        </Box>
        |<Box>{score}</Box>
      </Box>
      <Table>
        {updates
          .map((a) => {
            const { type, ball, wicket, batter, bowler, runs } = a;
            console.log(a);
            switch (type) {
              case "BALL":
                return <BallRow {...{ ball, batter, wicket, runs }}></BallRow>;
            }
          })
          .reverse()}
      </Table>
    </Box>
  );
};

const Updates = ({ updates, innings, ownMatch }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        top: ownMatch ? "236px" : "5px",
        left: "0px",
        right: "0px",
        minHeight: "10px",
      }}
    >
      <Scrollbars className="test" style={{ flexGrow: 1 }}>
        {updates
          .map(({ type, ...rest }, idx) => {
            switch (type) {
              case "OVER":
                return <OverTable key={idx} {...rest}></OverTable>;
            }
          })
          .reverse()}
      </Scrollbars>
    </div>
  );
};

export { Updates };
