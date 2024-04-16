import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box } from "grommet";
import Scorer from "./scorer";
import { setMatch } from "../redux/actions/action-creators";
import { useState } from "react";
import Loading from "./loading";
import { matchStates } from "@cliffrange/kris-store";
import SelectPlaying from "./select-playing";
import { ScoreStream } from "./score-stream";
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => {
  return { ownedMatches: state.matches, currentMatch: state.currentMatchState };
};

const mapDispatchToProps = {
  setMatch,
};

const Match = ({ match, setMatch, ownedMatches, currentMatch }) => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("match");

  const { id, action } = match.params;

  useEffect(() => {
    async function fetchMatch() {
      setLoading(true);
      const response = await fetch(`/api/match/${id}`, {
        method: "GET",
      });
      const matchResult = await response.json();
      setMatch(matchResult);

      setLoading(false);
    }
    fetchMatch();
  }, []);

  if (loading) {
    return <Loading>LOADING THE MATCH</Loading>;
  }

  const getComp = () => {
    if (currentMatch.state === matchStates.CREATED) {
      return <SelectPlaying></SelectPlaying>;
    }

    if (view === "scoreStream" || action === "score-stream") {
      return <ScoreStream matchID={match.params.id}></ScoreStream>;
    }

    return <Scorer></Scorer>;
  };

  return (
    <Box>
      <Box>{getComp()}</Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Match);
