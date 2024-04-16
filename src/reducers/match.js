import { actionTypes as commonActions } from "../redux/actions/action-types";

const initialState = [];

export const actionTypes = {
  DELETE_MATCH: "DELETE_MATCH",
  ADDING_MATCH: "ADDING_MATCH",
  ADD_MATCH: "ADD_MATCH"
};

export function matchesReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.DELETE_MATCH: {
      const newState = {
        ...state
      };
      delete newState[action.matchId];
      return newState;
    }

    case actionTypes.ADDING_MATCH: {
      const newState = {
        ...state
      };
      newState[action.match.matchID] = { adding: true, ...action.match };
      return newState;
    }

    case actionTypes.ADD_MATCH: {
      console.log(action.match, state)
      const newState = {
        ...state
      };
      newState[action.match.matchID] = {
        adding: false,
        new: true,
        ...action.match
      };
      console.log(newState)
      return newState;
    }

    case commonActions.SET_USER: {
      console.log(action.user.matches)
      return action.user.matches;
    }

    default: {
      return state;
    }
  }
}
