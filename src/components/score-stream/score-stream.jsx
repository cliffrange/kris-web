import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Text } from "grommet";
import { useHistory, useParams } from "react-router-dom";
import { useAuth0 } from "../../utils/auth0";
import { Header } from "../header";

const ScoreStream = ({ matchID }) => {
  const history = useHistory();
  const params = useParams();
  const { getTokenSilently } = useAuth0();

  const [status, setStatus] = useState("LOADING");
  const [url, setUrl] = useState("");

  const fetStatus = useCallback(async () => {
    const res = await fetch(`/stream/status?matchID=${matchID}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  }, []);

  useEffect(() => {
    const updateStatus = async () => {
      const { status, url } = await fetStatus();
      setStatus(status);
      setUrl(url);
    };
    updateStatus();
  }, []);

  useEffect(() => {
    if (
      status === "LINK_REQUESTED" ||
      status === "WAITING_FOR_CLIENT" ||
      status === "STREAMING"
    ) {
      const interval = setInterval(async () => {
        const { status, url } = await fetStatus();
        if (status !== "NOT_PRESENT") {
          setStatus(status);
          setUrl(url);
        }
      }, 4000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [status]);

  const getLink = async () => {
    setStatus("LINK_REQUESTING");
    const token = await getTokenSilently();
    try {
      await fetch(`/api/scorestream/${matchID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus("LINK_REQUESTED");
    } catch (e) {
      console.log(e);
      setStatus("ERROR");
    }
  };

  const getContent = () => {
    if (status === "LOADING") {
      return "FETCHING SCOREBOARD STREAMING STATE";
    }

    if (status === "STOPPED") {
      return (
        <>
          <span>Streaming of this match has stopped.</span>
          <span>Click following button to get a new link.</span>
          <Button
            margin="small"
            label="Get a new Link"
            onClick={getLink}
          ></Button>
        </>
      );
    }

    if (status === "STREAMING") {
      return (
        <>
          <span>We are streaming this match's score card successfully.</span>
          <span>Click following to stop streaming.</span>
          <Button margin="small" label="Stop Streaming"></Button>
        </>
      );
    }

    if (status === "WAITING_FOR_CLIENT") {
      return (
        <>
          <span>
            We are listening. Please connect your client to the following URL
          </span>
          <Box border="small" pad="small" margin="medium">
            {url}
          </Box>

          <span>
            type: <b>webm</b>
          </span>

          <Box margin="small">
            <span>
              If you are using OBS, create a new media source with input set to
              above url and input type set to <b>webm</b>
            </span>
          </Box>
          <Button label="Stop Listening"></Button>
        </>
      );
    }

    if (status === "TIMEDOUT") {
      return (
        <>
          <span>
            Your client did not connect. We were listening for 10 minutes. So we
            stopped listening.
          </span>
          <span>Click following button to get a new link.</span>
          <Button
            margin="small"
            label="Get a new Link"
            onClick={getLink}
          ></Button>
        </>
      );
    }

    let label = "Get a Link";
    let text =
      "Get a scoreboard stream link by clicking on the button to begin";
    if (status === "LINK_REQUESTED") {
      label = "Getting Link";
      text = "Getting your scoreboard stream link. Please wait...";
    }

    return (
      <>
        <span>
          Using this section you can add a score board to your video stream of
          this match.
        </span>
        <span>{text}</span>
        <Button
          label={label}
          onClick={getLink}
          disabled={status === "LINK_REQUESTED" || status === "LINK_REQUESTING"}
        ></Button>
      </>
    );
  };

  return (
    <Box>
      <Header name="Score Stream">
        <Button
          label="Done"
          onClick={() => {
            console.log(params);

            history.push(`/match/${params.id}`);
          }}
        ></Button>
      </Header>
      <Box justify="center">
        <Box
          gap="small"
          align="center"
          margin={{ top: "small" }}
          justify="center"
        >
          {getContent()}
        </Box>
      </Box>
    </Box>
  );
};

export { ScoreStream };
