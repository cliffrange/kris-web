import React from "react";
import { connect } from "react-redux";
import { Box, Menu, Stack } from "grommet";
import { useHistory, useParams } from "react-router-dom";
import { matchStates } from "@cliffrange/kris-store";
import {
  ball,
  changeBowler,
  switchEnd,
  selectNewBatter,
  selectBowler,
  deleteMatch,
  setMatch,
} from "../redux/actions/action-creators";
import Score from "../containers/score";
import ScoreCard, { BowlingTeamScoreCard } from "../containers/scorecard";
import BowlingCard, {
  BattingTeamBowlingCard,
} from "../containers/bowling-card";
import RunScorer from "./run-scorer";
import TeamCard from "./team/team-card";
import { CurrentBatters } from "./batter";
import Updates from "../containers/updates";
import { useState } from "react";
import { useAuth0 } from "../utils/auth0";
import { useEffect } from "react";
import { useCallback } from "react";
import CurrentBowler from "../containers/current-bowler";
import Manhatten, { BowlingTeamManhatten } from "../containers/manhatten";
import Worm from "../containers/worm";

const mapStateToProps = (state) => {
  return {
    ...state.currentMatchState,
    matches: state.matches,
    userFetched: state.userFetched,
  };
};

const mapDispatchToProps = {
  ball,
  changeBowler,
  switchEnd,
  selectNewBatter,
  selectBowler,
  deleteMatch,
  setMatch,
};

const Scorer = ({
  state,
  ball,
  changeBowler,
  switchEnd,
  score,
  selectNewBatter,
  selectBowler,
  setMatch,
  teams,
  battingTeamID,
  bowlingTeamID,
  deleteMatch,
  _id,
  matches,
  userFetched,
  properties,
  innings,
}) => {
  const history = useHistory();
  const params = useParams();
  const [isAddingWicket, setIsAddingWicket] = useState(false);
  const [isAddingNB, setIsAddingNB] = useState(false);
  const [isAddingBye, setIsAddingBye] = useState(false);
  const [isAddingLegBye, setIsAddingLegBye] = useState(false);
  const [isAddingWide, setIsAddingWide] = useState(false);
  const [connected, setConnected] = useState(false);
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  const { currentBowlerID, lastBowlerID } = teams[bowlingTeamID] || {};
  const { currentStrikerID, outBatterID } = teams[battingTeamID] || {};

  const deleteThisMatch = useCallback(async () => {
    deleteMatch(_id);
    history.push("/my-matches");
    const token = await getTokenSilently();
    await fetch(`/api/match/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  }, []);

  const showScoreStream = useCallback(() => {
    history.push(`/match/${params.id}/score-stream`);
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated && !userFetched) {
      return;
    }

    if (isAuthenticated && userFetched && matches[_id]) {
      return;
    }

    if (connected) {
      return;
    }

    setConnected(true);

    const conn = new WebSocket(process.env.UPDATES_URI);

    conn.addEventListener("message", function (event) {
      const updateObj = JSON.parse(event.data);
      updateObj.localOnly = true;
      if (updateObj.type === "BALL") {
        ball(updateObj);
        return;
      }
      if (updateObj.type === "PICK_BOWLER") {
        selectBowler(updateObj);
        return;
      }
      if (updateObj.type === "START_INNINGS") {
        setMatch(updateObj);
        return;
      }
    });

    conn.addEventListener("open", function (event) {
      conn.send(JSON.stringify({ matchId: _id }));
    });
  }, [loading, isAuthenticated, userFetched]);

  return (
    <Box>
      <Box gap="small" direction="row">
        <Box
          round="xsmall"
          border={{ color: "contrast" }}
          style={{
            position: "relative",
            minHeight: "600px",
            flex: "0 0 360px",
          }}
        >
          <Updates ownMatch={Boolean(matches[_id])} />
          {matches[_id] && (
            <RunScorer
              state={state}
              ball={ball}
              changeBowler={changeBowler}
              switchEnd={switchEnd}
              deleteMatch={deleteThisMatch}
              showScoreStream={showScoreStream}
              score={score}
              isAddingWide={isAddingWide}
              isAddingWicket={isAddingWicket}
              isAddingNB={isAddingNB}
              isAddingBye={isAddingBye}
              isAddingLegBye={isAddingLegBye}
              setIsAddingWicket={setIsAddingWicket}
              setIsAddingWide={setIsAddingWide}
              setIsAddingNB={setIsAddingNB}
              setIsAddingBye={setIsAddingBye}
              setIsAddingLegBye={setIsAddingLegBye}
              outBatterID={outBatterID}
              currentBowlerID={currentBowlerID}
              lastBowlerID={lastBowlerID}
              currentStrikerID={currentStrikerID}
              selectNewBatter={selectNewBatter}
              selectBowler={selectBowler}
              teams={teams}
              battingTeamID={battingTeamID}
              bowlingTeamID={bowlingTeamID}
              properties={properties}
            />
          )}
        </Box>
        <Box gap="small" width="100%">
          <Box
            direction="row"
            gap="small"
            pad="small"
            border={{ size: "xsmall", size: "xsmall", color: "contrast" }}
            round={{ size: "small" }}
          >
            <Score />
            <CurrentBatters />
            <CurrentBowler />
          </Box>
          {state !== matchStates.CREATED && state !== matchStates.NOT_STARTED && (
            <Box gap="small">
              <ScoreCard />
              <BowlingCard />
              {innings > 1 && (
                <Box gap="small">
                  <BowlingTeamScoreCard></BowlingTeamScoreCard>
                  <BattingTeamBowlingCard></BattingTeamBowlingCard>
                </Box>
              )}
            </Box>
          )}
          <Box gap="small" direction="row">
            {Object.keys(teams)
              .sort()
              .map((teamId) =>
                teams[teamId].batLineup ? (
                  <TeamCard
                    teamName={teams[teamId].teamName}
                    players={teams[teamId].batLineup.map(
                      (id) => teams[teamId].players[id],
                    )}
                  ></TeamCard>
                ) : null,
              )}
          </Box>
        </Box>
      </Box>
      {state !== matchStates.CREATED && state !== matchStates.NOT_STARTED && (
        <Box gap="small" margin={{ top: "small" }}>
          <Manhatten></Manhatten>
          {innings > 1 && <BowlingTeamManhatten></BowlingTeamManhatten>}
          <Worm></Worm>
        </Box>
      )}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Scorer);
