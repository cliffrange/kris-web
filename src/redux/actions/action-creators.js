import { actionTypes } from "@cliffrange/kris-store";
import { actionTypes as teamActions } from "../../reducers/team";
import { actionTypes as matchActions } from "../../reducers/match";
import { actionTypes as commonActions } from "./action-types";

import shortid from "shortid";

export const ball = (ballInfo) => async (dispatch, getState) => {
  const { currentMatchState } = getState();
  dispatch({ type: actionTypes.BALL, ...ballInfo });
  if (ballInfo.localOnly) {
    return;
  }

  const result = await fetch("/api/ball", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ball: ballInfo, matchId: currentMatchState._id }),
  });
};

export const changeBowler =
  (info = {}) =>
  async (dispatch) => {
    if (info.localOnly) {
      dispatch({ type: `LOCAL_${actionTypes.CHANGE_BOWLER}` });
      return;
    }

    dispatch({ type: actionTypes.CHANGE_BOWLER });
  };

export const switchEnd =
  (info = {}) =>
  async (dispatch, getState) => {
    if (info.localOnly) {
      const localAction = { type: `LOCAL_${actionTypes.SWITCH_ENDS}` };
      dispatch(localAction);
      return;
    }

    const action = { type: actionTypes.SWITCH_ENDS };
    dispatch(action);

    const { currentMatchState } = getState();
    const result = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchId: currentMatchState._id,
        action,
      }),
    });
  };

export const ballLocal = (ballInfo) => ({
  type: `LOCAL_${actionTypes.BALL}`,
  ...ballInfo,
});

export const addPlayer = (player) => ({
  type: teamActions.ADD_PLAYER,
  player,
});

export const setTeamName = (teamName) => ({
  type: teamActions.SET_TEAM_NAME,
  teamName,
});

export const createTeam = (tokenPromise) => async (dispatch, getState) => {
  const { currentlyAddingTeam } = getState();
  currentlyAddingTeam.teamID = shortid.generate();
  dispatch({ type: teamActions.ADDING_TEAM, team: currentlyAddingTeam });
  const token = await tokenPromise;
  const result = await fetch("/api/create-team", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(currentlyAddingTeam),
  });
  const team = await result.json();
  dispatch({ type: teamActions.ADD_TEAM, team });
};

export const createMatch = (match, tokenPromise) => async (dispatch) => {
  match.matchID = shortid.generate();
  dispatch({ type: matchActions.ADDING_MATCH, match });
  const token = await tokenPromise;
  const result = await fetch("/api/create-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(match),
  });
  const matchResult = await result.json();
  console.log(matchResult);
  dispatch({ type: matchActions.ADD_MATCH, match: matchResult });
};

export const setPlayers = (match, tokenPromise) => async (dispatch) => {
  match.matchID = shortid.generate();
  dispatch({ type: matchActions.ADDING_MATCH, match });
  const token = await tokenPromise;
  const result = await fetch("/api/create-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(match),
  });
  const matchResult = await result.json();
  dispatch({ type: matchActions.ADD_MATCH, match: matchResult });
};

export const startMatch = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.START_MATCH }); // optimistic update
  const { currentMatchState } = getState();
  const { ...toSend } = currentMatchState;
  const result = await fetch("/api/start-match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSend),
  });
};

export const startInnings = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.START_INNINGS }); // optimistic update
  const { currentMatchState } = getState();
  const { ...toSend } = currentMatchState;
  const result = await fetch("/api/start-innings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toSend),
  });
};

export const selectPlayers =
  (playerInfo, tokenPromise) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.SELECT_PLAYERS, playerInfo }); // optimistic update
    const {
      currentMatchState: { _id: matchId },
    } = getState();
    const token = await tokenPromise;
    const sentPlayers = {};
    Object.keys(playerInfo).forEach((teamId) => {
      sentPlayers[teamId] = playerInfo[teamId].batLineup;
    });
    await fetch(`/api/select-players/${matchId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ players: sentPlayers, matchId }),
    });
  };

export const startInningsLocal = () => ({
  type: `LOCAL_${actionTypes.START_INNINGS}`,
});

export const deleteMatch = (matchId) => async (dispatch) => {
  dispatch({ type: matchActions.DELETE_MATCH, matchId });
};

export const deleteTeam = (teamID) => async (dispatch) => {
  dispatch({ type: teamActions.DELETE_TEAM, teamID });
};

export const setMatch = (match) => ({
  type: actionTypes.SET_MATCH,
  match,
});

export const setUser = (user) => ({
  type: commonActions.SET_USER,
  user,
});

export const selectBattingTeam = (teamID) => ({
  type: actionTypes.PICK_BATTING_TEAM,
  teamID,
});

export const selectOpennerOne = (batterID) => ({
  type: actionTypes.PICK_STRIKER,
  batterID,
});

export const selectOpennerOneLocal = (batterID) => ({
  type: `LOCAL_${actionTypes.PICK_STRIKER}`,
  batterID,
});

export const selectOpennerTwo = (batterID) => ({
  type: actionTypes.PICK_BATTER,
  batterID,
});

export const selectOpennerTwoLocal = (batterID) => ({
  type: `LOCAL_${actionTypes.PICK_BATTER}`,
  batterID,
});

export const selectBowler =
  ({ bowlerID, localOnly }) =>
  async (dispatch, getState) => {
    const bowlerInfo = {
      bowlerID,
    };

    dispatch({
      type: actionTypes.PICK_BOWLER,
      ...bowlerInfo,
    });

    if (localOnly) {
      return;
    }

    const { currentMatchState } = getState();
    const result = await fetch("/api/select-bowler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchId: currentMatchState._id,
        bowlerInfo,
      }),
    });
  };

export const selectBowlerLocal = ({ bowlerID, localOnly }) => {
  const bowlerInfo = {
    bowlerID,
  };

  return {
    type: `LOCAL_${actionTypes.PICK_BOWLER}`,
    ...bowlerInfo,
  };
};

export const selectNewBatter =
  ({ batterID, localOnly }) =>
  async (dispatch, getState) => {
    const batterInfo = {
      batterID,
    };

    dispatch({
      type: actionTypes.PICK_BATTER,
      ...batterInfo,
    });

    if (localOnly) {
      return;
    }

    const { currentMatchState } = getState();
    const result = await fetch("/api/select-new-batter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matchId: currentMatchState._id,
        batterInfo,
      }),
    });
  };

export const selectNewBatterLocal = ({ batterID }) => {
  const batterInfo = {
    batterID,
  };

  return {
    type: `LOCAL_${actionTypes.PICK_BATTER}`,
    ...batterInfo,
  };
};
