import { actionTypes as commonActions } from "../redux/actions/action-types";

const initialState = {
  teamName: "",
  players: [],
};

export const actionTypes = {
  SET_TEAM_NAME: "SET_TEAM_NAME",
  ADD_PLAYER: "ADD_PLAYER",
  ADD_TEAM: "ADD_TEAM",
  ADDING_TEAM: "ADDING_TEAM",
  DELETE_TEAM: "DELETE_TEAM",
};

export function createTeamReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TEAM_NAME: {
      return {
        ...state,
        teamName: action.teamName,
      };
    }

    case actionTypes.ADD_PLAYER: {
      return {
        ...state,
        players: [...state.players, action.player],
      };
    }

    case actionTypes.ADD_TEAM: {
      return {
        teamName: "",
        players: [],
      };
    }

    default: {
      return state;
    }
  }
}

export function teamReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADDING_TEAM: {
      return [...state, { adding: true, ...action.team }];
    }

    case actionTypes.ADD_TEAM: {
      return state.map((team) => {
        if (team.teamID === action.team.teamID) {
          return {
            ...team,
            adding: false,
          };
        }
        return team;
      });
    }

    case actionTypes.DELETE_TEAM: {
      console.log(state.length);
      console.log(action);
      console.log(
        state.filter((team) => {
          return team.teamID !== action.teamID;
        }),
      );
      return state.filter((team) => {
        return team.teamID !== action.teamID;
      });
    }

    case commonActions.SET_USER: {
      return action.user.teams;
    }

    default: {
      return state;
    }
  }
}
