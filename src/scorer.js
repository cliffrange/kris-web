import React from "react";
import ReactDOM from "react-dom";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { rootReducer as update } from "@cliffrange/kris-store";
import Main from "./components/main";
import { createTeamReducer, teamReducer } from "./reducers/team";
import { matchesReducer } from "./reducers/match";
import { Auth0Provider } from "./utils/auth0";
import demoMatch from "./utils/demo-match.json";

const rootReducer = combineReducers({
  tryItMatchState: (state, action) => {
    if (!action.type.startsWith("LOCAL_")) {
      return state || {};
    }
    const newAction = {
      ...action,
      type: action.type.replace("LOCAL_", ""),
    };
    return update(state, newAction);
  },
  currentMatchState: (a, b) => {
    return update(a, b);
  },
  currentlyAddingTeam: createTeamReducer,
  teams: teamReducer,
  matches: matchesReducer,
  userFetched: (state, action) => {
    if (state === undefined) {
      return false;
    }
    if (action.type === "SET_USER") {
      return true;
    }
    return state;
  },
});

const onRedirectCallback = (appState) => {
  const url =
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname;
  history.pushState({}, "", url);
};

const render = async () => {
  const store = createStore(
    rootReducer,
    {
      tryItMatchState: demoMatch,
      currentlyAddingTeam: {
        teamName: "",
        players: [],
      },
      teams: [],
      matches: [],
      userFetched: false,
    },
    applyMiddleware(thunk)
  );

  const myTheme = { global: { ...grommet.global, drop: {} } };
  myTheme.global.colors.brand = "#130861";
  myTheme.global.colors.contrast = "#3d2db2";
  myTheme.global.colors.focus = "#b7b4e1";
  myTheme.global.colors.control = { dark: "#b7b4e1", light: "#b7b4e1" };
  myTheme.global.colors.border = { dark: "#b7b4e1", light: "#b7b4e1" };
  myTheme.global.drop.background = { dark: "#b7b4e1", light: "#b7b4e1" };

  ReactDOM.render(
    <Auth0Provider
      domain={"dev-6w0sykw3.auth0.com"}
      client_id={"PjplTGuTczaaS5JpV6J5OFoMqZkvfZYW"}
      redirect_uri={process.env.REDIRECT_URI}
      audience={"cket.live"}
      onRedirectCallback={(data) => onRedirectCallback(data)}
    >
      <Provider store={store}>
        <Grommet style={{ height: "100%" }} theme={myTheme} themeMode="dark">
          <Main />
        </Grommet>
      </Provider>
    </Auth0Provider>,
    document.getElementById("app")
  );
};

render();
