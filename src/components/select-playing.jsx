import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Accordion, AccordionPanel, Button, Text } from "grommet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Header } from "./header";
import { selectPlayers } from "../redux/actions/action-creators";
import { Previous, Next } from "grommet-icons";
import { useCallback } from "react";
import { useEffect } from "react";
import { useAuth0 } from "../utils/auth0";

const mapStateToProps = (state) => {
  return state.currentMatchState;
};

const mapDispatchToProps = {
  selectPlayers,
};

const SelectPlaying = ({ _id: matchId, teams, properties, selectPlayers }) => {
  const [fullTeams, setFullTeams] = useState({});
  const [players, setPlayers] = useState({});
  const [sitters, setSitters] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const promises = Object.values(teams).map(async ({ teamID }) => {
      const response = await fetch(`/api/team/${teamID}`, {
        method: "GET",
      });
      const teamResult = await response.json();

      setFullTeams((fullTeams) => ({ ...fullTeams, [teamID]: teamResult }));
      const lineup = Object.values(teamResult.players).map((p) => p.id);

      setPlayers((players) => ({
        ...players,
        [teamID]: Array(parseInt(properties.ppt))
          .fill()
          .map((el, i) => {
            return {
              index: i,
              pid: lineup[i],
            };
          }),
      }));
      setSitters((sitters) => ({
        ...sitters,
        [teamID]: lineup.slice(properties.ppt, lineup.length),
      }));
    });

    const getTeams = async () => {
      setLoading(true);
      await Promise.all(promises);
      setLoading(false);
    };

    getTeams();
  }, []);

  const removePlayer = useCallback((teamId, removedPid) => {
    const removeIndex = players[teamId].findIndex((p) => p.pid === removedPid);
    const newPlayers = [...players[teamId]];
    newPlayers[removeIndex] = {
      ...newPlayers[removeIndex],
      pid: undefined,
    };
    setPlayers({
      ...players,
      [teamId]: newPlayers,
    });
    setSitters({
      ...sitters,
      [teamId]: [...sitters[teamId], removedPid],
    });
  });

  const addPlayer = useCallback((teamId, addedPid) => {
    const addIndex = players[teamId].findIndex((p) => p.pid === undefined);
    const newPlayers = [...players[teamId]];
    newPlayers[addIndex] = {
      ...newPlayers[addIndex],
      pid: addedPid,
    };
    setPlayers({
      ...players,
      [teamId]: newPlayers,
    });
    setSitters({
      ...sitters,
      [teamId]: sitters[teamId].filter((pid) => pid !== addedPid),
    });
  });

  const update = async () => {
    const tokenPromise = getTokenSilently();
    const playerInfo = {};
    Object.keys(players).forEach((teamId) => {
      playerInfo[teamId] = {
        batLineup: players[teamId].map(({ pid }) => pid),
        players: players[teamId].reduce(
          (curr, { pid }) => ({
            ...curr,
            [pid]: { ...fullTeams[teamId].players[pid] },
          }),
          {},
        ),
      };
    });
    selectPlayers(playerInfo, tokenPromise);
  };

  if (loading) {
    return "loading teams";
  }

  return (
    <Box fill justify="center">
      <Header name="Select Players">
        <Button label="Done" onClick={() => update()}></Button>
      </Header>
      <Box>
        <Accordion multiple>
          {Object.keys(teams).map((key) => {
            const batLineup = players[key];
            const bench = sitters[key];
            const team = fullTeams[key];
            return (
              <AccordionPanel label={team.teamName} key={key}>
                <Box direction="row" gap="small" margin="small">
                  <DragDropContext
                    onDragEnd={({ destination, source }) => {
                      if (source.droppableId !== destination.droppableId) {
                        return;
                      }
                      const result = Array.from(players[source.droppableId]);
                      const [removed] = result.splice(source.index, 1);
                      result.splice(destination.index, 0, removed);

                      setPlayers({ ...players, [source.droppableId]: result });
                    }}
                  >
                    <Droppable droppableId={key}>
                      {(provided, snapshot) => (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          pad="small"
                          background="#466fb466"
                          round="small"
                          width="380px"
                        >
                          {batLineup.map(({ pid, index }, idx) => (
                            <Draggable
                              key={pid}
                              draggableId={pid || idx}
                              index={idx}
                            >
                              {(provided, snapshot) => (
                                <Box
                                  pad="xsmall"
                                  direction="row"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box width="32px" flex={false}>
                                    <Text
                                      truncate
                                      margin={{ right: "small" }}
                                      style={{ lineHeight: "36px" }}
                                      textAlign="end"
                                    >
                                      {idx + 1}.
                                    </Text>
                                  </Box>
                                  {pid ? (
                                    <Box direction="row" justify="between" fill>
                                      <Text
                                        truncate
                                        margin={{ right: "small" }}
                                        style={{ lineHeight: "36px" }}
                                      >
                                        {team.players[pid].firstName +
                                          " " +
                                          team.players[pid].lastName}
                                      </Text>
                                      <Button
                                        label="out"
                                        icon={<Next color="#cd463f" />}
                                        onClick={() => {
                                          removePlayer(key, pid);
                                        }}
                                      />
                                    </Box>
                                  ) : null}
                                </Box>
                              )}
                            </Draggable>
                          ))}

                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <Box
                    pad="small"
                    background="#466fb466"
                    round="small"
                    width="380px"
                  >
                    {bench.map((pid) => (
                      <Box
                        pad="xsmall"
                        direction="row"
                        alignContent="center"
                        justify="between"
                      >
                        <Button
                          label="in"
                          icon={<Previous color="#97c59c" />}
                          onClick={() => {
                            addPlayer(key, pid);
                          }}
                        />
                        <Text
                          truncate
                          alignContent="center"
                          margin={{ left: "small" }}
                          style={{ lineHeight: "36px" }}
                        >
                          {team.players[pid].firstName +
                            " " +
                            team.players[pid].lastName}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </AccordionPanel>
            );
          })}
        </Accordion>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlaying);
