import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { Box, Button, Drop, Layer, Text } from "grommet";
import { Header } from "../header";
import EditTeam from "../edit-team";
import { useAuth0 } from "../../utils/auth0";
import { More } from "grommet-icons";
import { deleteTeam } from "../../redux/actions/action-creators";
import { useHistory } from "react-router-dom";

const Team = ({ match, deleteTeam }) => {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState({});
  const [updating, setUpdating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropRef = useRef();
  const { getTokenSilently } = useAuth0();

  const history = useHistory();

  useEffect(() => {
    async function fetchMatch() {
      setLoading(true);
      const response = await fetch(`/api/team/${match.params.id}`, {
        method: "GET",
      });
      const teamResult = await response.json();
      setTeam({ ...teamResult, newPlayers: [], edittedPlayers: {} });
      setLoading(false);
    }
    fetchMatch();
  }, []);

  const deleteThisTeam = useCallback(async () => {
    deleteTeam(match.params.id);
    history.push("/my-teams");
    const token = await getTokenSilently();
    await fetch(`/api/team/${match.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  }, []);

  const addPlayer = (p) => {
    setTeam({
      ...team,
      newPlayers: [...team.newPlayers, p],
    });
  };

  const update = async () => {
    setUpdating(true);
    const token = await getTokenSilently();
    const result = await fetch(`/api/edit-team/${team._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPlayers: team.newPlayers }),
    });
    const { newPlayerIDs } = await result.json();

    const players = { ...team.players };

    newPlayerIDs.forEach((id, index) => {
      players[id] = team.newPlayers[index];
    });

    setTeam({
      ...team,
      players,
      newPlayers: [],
    });
    setUpdating(false);
  };

  if (loading) {
    return "loading";
  }

  return (
    <Box fill>
      <Header name="Edit Team">
        <Button
          disabled={updating}
          onClick={() => {
            update();
          }}
          label={updating ? "Updating" : "Update Team"}
        ></Button>
      </Header>
      <Box direction="row" justify="between">
        {showConfirmation && (
          <Layer
            onEsc={() => setShowConfirmation(false)}
            onClickOutside={() => setShowConfirmation(false)}
          >
            <Box pad="small">
              <Text>Are you sure you want to delete this team?</Text>
              <Box width="xsmall" alignSelf="center" margin={{ top: "small" }}>
                <Button
                  size="small"
                  label="Delete"
                  onClick={() => {
                    setShowConfirmation(false);
                    deleteThisTeam();
                  }}
                />
              </Box>
            </Box>
          </Layer>
        )}

        <EditTeam
          teamName={team.teamName}
          players={[...Object.values(team.players), ...team.newPlayers]}
          addPlayer={addPlayer}
          setTeamName={(n) => {
            console.log(n);
          }}
        />
        <Box margin={{ top: "small" }}>
          <Button
            label="More"
            icon={<More></More>}
            onClick={() => {
              setMenuOpen(true);
            }}
            ref={dropRef}
          ></Button>
        </Box>
      </Box>
      {menuOpen && (
        <Drop
          background={{ dark: "#b7b4e1", light: "#b7b4e1" }}
          target={dropRef.current}
          onClickOutside={() => {
            setMenuOpen(false);
          }}
          onEsc={() => {
            setMenuOpen(false);
          }}
          align={{ top: "top", right: "right" }}
        >
          <Box pad="small">
            <Button
              gap="small"
              label="Delete Team"
              plain
              hoverIndicator="background"
              onClick={() => {
                setMenuOpen(false);
                setShowConfirmation(true);
              }}
            />
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const mapDispatchToProps = {
  deleteTeam,
};

export default connect(() => ({}), mapDispatchToProps)(Team);
