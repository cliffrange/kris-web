import React from "react";
import { Box, Button, Text } from "grommet";
import { Scorecard, Channel, LineChart } from "grommet-icons";
import { useAuth0 } from "../../utils/auth0";
import MemberDashboard from "../../containers/member-dashboard";
import Loading from "../loading";
import { AppearBox } from "./style";
import { TryIt } from "../try-it";
import logo from "../../resources/logo.png";
import bg1 from "../../resources/background-1.png";

function getContent(loading, isAuthenticated, loginWithRedirect) {
  if (loading) {
    return <Loading>TAKING GUARD</Loading>;
  }

  if (isAuthenticated) {
    return <MemberDashboard></MemberDashboard>;
  }

  return (
    <Box align="center">
      <img
        height="650px"
        style={{ marginTop: "-30px", position: "absolute" }}
        src={bg1}
      ></img>
      <AppearBox style={{ zIndex: 1, marginTop: "210px" }}>
        <Box justify="center" direction="row" margin={{ top: "40px" }}>
          <Box direction="row" align="center">
            <img height="76px" style={{ marginTop: "30px" }} src={logo}></img>
          </Box>
        </Box>
        <Box justify="center" direction="row" margin={{ top: "40px" }}>
          <Text size="xlarge">
            <Text weight="bold" size="xlarge">
              cket.live
            </Text>{" "}
            can help cricket tournament organizers with,
          </Text>
        </Box>
        <Box justify="center" direction="row" margin={{ top: "40px" }}>
          <Box>
            <Box gap="small" direction="row" align="center">
              <Scorecard />
              <Text size="xlarge">scoring</Text>
            </Box>
            <Box gap="small" direction="row" align="center">
              <Channel />
              <Text size="xlarge">broadcasting</Text>
            </Box>
            <Box gap="small" direction="row" align="center">
              <LineChart />
              <Text size="xlarge">analyzing</Text>
            </Box>
          </Box>
        </Box>
        <Box justify="center" direction="row" margin={{ top: "40px" }}>
          <Text size="xlarge">matches.</Text>
        </Box>
      </AppearBox>
      <AppearBox width="250px" margin={{ top: "40px" }}>
        <Button
          pad="small"
          size="large"
          onClick={() => loginWithRedirect({})}
          label="Log In or Sign Up"
        />
      </AppearBox>
      <AppearBox margin={{ top: "40px" }}>
        <Box justify="center" direction="row" margin={{ top: "40px" }}>
          <Text size="xxlarge">Try out the scorer!</Text>
        </Box>
        <Box margin={{ top: "40px" }}>
          <TryIt />
        </Box>
      </AppearBox>
    </Box>
  );
}

function Dashboard({ text, onClick, background }) {
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  return getContent(loading, isAuthenticated, loginWithRedirect);
}

export { Dashboard };
