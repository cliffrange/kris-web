import React from "react";
import { Table, TableRow, TableCell, Box, Text } from "grommet";
import {
  Badge,
  Tag,
  MatchTitle,
  MatchHeader,
  Container,
  MatchDescription,
  MatchScore,
} from "./styles";
import { MiniSummary } from "../result";

const MatchThumbnail = ({ match }) => (
  <Container
    background={{ color: "#5b4ebb" }}
    round="small"
    isNew={match.new}
    border={{
      color: match.new ? "lime" : "border",
      size: "small",
      side: "all",
    }}
  >
    <Box width="medium" pad={{bottom: "small"}}>
      <Box
        pad="small"
        round={{ size: "small", corner: "top" }}
        background="brand"
        justify="center"
        direction="row"
        align="center"
      >
        <MatchTitle>
          <Text>{match.name}</Text>
        </MatchTitle>
      </Box>
      {match.adding && <Text size="small">creating</Text>}
      {match.new && <Tag size="small">NEW</Tag>}
      {!match.adding && (
        <MiniSummary teams={match.teams}/>
      )}
    </Box>
  </Container>
);

export { MatchThumbnail };
