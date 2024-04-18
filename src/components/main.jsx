import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Text, Footer, Button } from "grommet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import CreateTeam from "./create-team";
import CreateMatch from "./create-match";
import Teams from "./teams";
import Match from "./match";
import Team from "./team/team";
import Matches from "./matches";
import { useAuth0 } from "../utils/auth0";
import { Dashboard } from "./dasboard/dashboard";
import { setUser } from "../redux/actions/action-creators";
import styled from "styled-components";
import logo from "../resources/logo.png";

const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (state) => {
  return state;
};

const App = styled(Box)`
  background: rgb(61, 45, 178);
  background: radial-gradient(
    circle,
    rgba(61, 45, 178, 1) 0%,
    rgba(19, 8, 97, 1) 100%
  );
`;

const Header = styled(Box)``;

const Content = styled(Box)`
  min-height: calc(100% - 44px);
`;

function Main({ teams, matches, setUser }) {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

    const callApi = async () => {
      const token = await getTokenSilently();
      const response = await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setUser(result);
    };
    callApi();
  }, [isAuthenticated, loading]);

  return (
    <Router>
      <App style={{ minHeight: "100%" }}>
        <Header
          align="center"
          background={{
            color: "brand",
          }}
        >
          <Box
            width="xlarge"
            direction="row"
            align="center"
            justify="between"
            height="48px"
          >
            <Link to="/">
              <Box
                direction="row"
                align="center"
                pad="xxsmall"
                style={{ textDecoration: "none", color: "white" }}
              >
                <img
                  height="36px"
                  style={{ marginTop: "5px" }}
                  src={logo}
                ></img>
              </Box>
            </Link>
            {isAuthenticated && (
              <Box direction="row" align="center">
                <Box
                  pad="small"
                  direction="row"
                  gap="xsmall"
                  justify="center"
                  align="center"
                >
                  <Link
                    to="/my-teams"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    My Teams
                  </Link>
                  <Box
                    background={{ color: "contrast" }}
                    round="full"
                    width="30px"
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    <Text size="small" weight="bold">
                      {teams.length}
                    </Text>
                  </Box>
                </Box>
                <Box
                  pad="small"
                  direction="row"
                  gap="xsmall"
                  justify="center"
                  align="center"
                >
                  <Link
                    to="/my-matches"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    My Matches
                  </Link>
                  <Box
                    background={{ color: "contrast" }}
                    round="full"
                    width="30px"
                    height="30px"
                    align="center"
                    justify="center"
                  >
                    <Text size="small" weight="bold">
                      {Object.values(matches).length}
                    </Text>
                  </Box>
                </Box>
                <Button
                  margin={{ left: "small" }}
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                  label="Log Out"
                />
              </Box>
            )}
            {!isAuthenticated && (
              <Button onClick={() => loginWithRedirect({})} label="Log In" />
            )}
          </Box>
        </Header>
        <Scrollbars style={{ flexGrow: 1 }}>
          <Content align="center" pad={"small"}>
            <Box width="xlarge">
              <Route path="/" exact component={Dashboard} />
              <Route path="/create-team/" component={CreateTeam} />
              <Route path="/match/:id/:action?" component={Match} />
              <Route path="/my-teams/" component={Teams} />
              <Route path="/my-matches/" component={Matches} />
              <Route path="/create-match/" component={CreateMatch} />
              <Route path="/team/:id" component={Team} />
            </Box>
          </Content>

          <Footer background="brand" justify="center" pad="small">
            <Text textAlign="center" size="small">
              © 2020 copyright cket.live
            </Text>
          </Footer>
        </Scrollbars>
      </App>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
