import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormField,
  Select,
  TextInput,
  Text,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CheckBox,
} from "grommet";
import { Header } from "./header";
import { createMatch } from "../redux/actions/action-creators";
import { useCallback } from "react";
import { useAuth0 } from "../utils/auth0";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  createMatch,
};

const getShort = (teamName) => {
  return teamName.substring(0, 3);
};

const matchProperties = {
  t20: { ppt: 11, opi: 20, opb: 4, swe: true },
  od: { ppt: 11, opi: 50, opb: 10, swe: true },
  sas: { ppt: 6, opi: 5, opb: 1, swe: true },
};

const matchTemplates = [
  { id: "t20", name: "T20" },
  { id: "od", name: "One Day" },
  { id: "sas", name: "Six A Side" },
];

const CreateMatch = ({ teams, createMatch }) => {
  if (teams.length < 2) {
    return null;
  }

  const [description, setDescription] = useState("");
  const [templateIdx, setTemplateIdx] = useState(0);
  const [ppt, setPpt] = useState(
    () => matchProperties[matchTemplates[templateIdx].id].ppt,
  );
  const [opi, setOpi] = useState(
    () => matchProperties[matchTemplates[templateIdx].id].opi,
  );
  const [opb, setOpb] = useState(
    () => matchProperties[matchTemplates[templateIdx].id].opb,
  );

  const { getTokenSilently } = useAuth0();
  const history = useHistory();

  const resetProperties = useCallback((newTemplateIdx) => {
    setPpt(matchProperties[matchTemplates[newTemplateIdx].id].ppt);
    setOpi(matchProperties[matchTemplates[newTemplateIdx].id].opi);
    setOpb(matchProperties[matchTemplates[newTemplateIdx].id].opb);
  });

  const rendorSelect = useCallback(
    (option, index, options, { active, disabled, selected }) => {
      return (
        <Box pad={"small"} background={selected ? "#130861" : "none"}>
          <Box direction="row" justify="between" alignContent="center">
            <Box>
              <Text truncate>{option}</Text>
            </Box>
            {teams[index] && teams[index].noOfPlayers < ppt && (
              <Box
                justify="center"
                flex={{
                  grow: 0,
                  shrink: 0,
                }}
              >
                <Text size="small">{"not enough players"}</Text>
              </Box>
            )}
          </Box>
        </Box>
      );
    },
    [teams, ppt],
  );

  const [disabledTeams, enabledTeams] = useMemo(() => {
    const disabledTeams = [];
    const enabledTeams = [];

    teams.forEach((t, id) => {
      t.noOfPlayers >= ppt ? enabledTeams.push(id) : disabledTeams.push(id);
    });

    return [disabledTeams, enabledTeams];
  }, [teams, ppt]);

  const [team1, setTeam1] = useState(enabledTeams[0]);
  const [team2, setTeam2] = useState(enabledTeams[1]);
  const [team1Short, setTeam1Short] = useState(() => {
    return teams[team1] ? getShort(teams[team1].teamName).toUpperCase() : "";
  });
  const [team2Short, setTeam2Short] = useState(() => {
    return teams[team1] ? getShort(teams[team2].teamName).toUpperCase() : "";
  });

  useEffect(() => {
    if (enabledTeams[0] === undefined) {
      setTeam1(undefined);
      setTeam1Short("");
      setTeam2(undefined);
      setTeam2Short("");
      return;
    }

    if (team1 === undefined) {
      console.log(enabledTeams[0]);
      setTeam1(enabledTeams[0]);
      setTeam1Short(getShort(teams[enabledTeams[0]].teamName).toUpperCase());
    }

    if (enabledTeams[1] === undefined) {
      setTeam2(undefined);
      setTeam2Short("");
      return;
    }

    if (team2 === undefined) {
      setTeam2(enabledTeams[1]);
      setTeam2Short(getShort(teams[enabledTeams[1]].teamName).toUpperCase());
    }
  }, [ppt]);

  return (
    <Box fill justify="center">
      <Header name="Create A Match">
        <Button
          label="Create"
          onClick={async () => {
            const tokenPromise = getTokenSilently();
            createMatch(
              {
                teams: [teams[team1], teams[team2]],
                shortNames: [team1Short, team2Short],
                description,
                properties: {
                  ppt,
                  opi,
                  opb,
                },
              },
              tokenPromise,
            );

            history.push("/my-matches");
          }}
        />
      </Header>
      <Box width="medium">
        <FormField label="Match Description" name="match-description" required>
          <TextInput
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Eg: Hero Cup 2021 - Match 1"
          />
        </FormField>
      </Box>
      <Box direction="row" gap="small">
        <Box width="large" justify="between">
          <Box
            border={{
              color: "border",
              size: "small",
              side: "all",
            }}
            round="small"
            margin={{ bottom: "large", top: "large" }}
            width="medium"
          >
            <Box
              round={{ size: "small", corner: "top" }}
              pad="small"
              background="brand"
            >
              {"Match Properties"}
            </Box>
            <Box pad="small">
              <FormField label="Select Match Template" name="template">
                <Select
                  options={matchTemplates.map((tmpl) => tmpl.name)}
                  value={matchTemplates[templateIdx].name}
                  onChange={({ selected }) => {
                    setTemplateIdx(selected);
                    resetProperties(selected);
                  }}
                />
              </FormField>
              <Box>
                <Box gap="small" pad="small">
                  <Box direction="row" justify="between">
                    <Box scope="row">
                      <strong>Players Per Team</strong>
                    </Box>
                    <Box width="55px">
                      <TextInput
                        value={ppt}
                        onChange={(e) => {
                          setPpt(parseInt(e.target.value) || 0);
                        }}
                      ></TextInput>
                    </Box>
                  </Box>
                  <Box direction="row" justify="between">
                    <Box scope="row">
                      <strong>Overs Per Innings</strong>
                    </Box>
                    <Box width="55px">
                      <TextInput
                        value={opi}
                        onChange={(e) => {
                          setOpi(parseInt(e.target.value) || 0);
                        }}
                      ></TextInput>
                    </Box>
                  </Box>
                  <Box direction="row" justify="between">
                    <Box scope="row">
                      <strong>Overs Per Bowler</strong>
                    </Box>
                    <Box width="55px">
                      <TextInput
                        value={opb}
                        onChange={(e) => {
                          setOpb(parseInt(e.target.value) || 0);
                        }}
                      ></TextInput>
                    </Box>
                  </Box>
                  {/* <Box direction="row" justify="between">
                  <Box scope="row">
                    <strong>Switch Ends After Over?</strong>
                  </Box>
                  <Box width="55px">
                    <CheckBox></CheckBox>
                  </Box>
                </Box> */}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            border={{
              color: "border",
              size: "small",
              side: "all",
            }}
            round="small"
            margin={{ bottom: "large" }}
          >
            <Box
              round={{ size: "small", corner: "top" }}
              pad="small"
              background="brand"
            >
              {"Select Teams"}
            </Box>
            <Box pad="small" direction="row" justify="center">
              <Box pad="small">
                <FormField label="Select Team 1" name="team-1">
                  <Select
                    options={teams.map((t) => `${t.teamName}`)}
                    value={teams[team1] ? teams[team1].teamName : ""}
                    children={rendorSelect}
                    disabled={disabledTeams}
                    onChange={({ selected }) => {
                      setTeam1(selected);
                      setTeam1Short(
                        getShort(teams[selected].teamName).toUpperCase(),
                      );
                    }}
                  />
                </FormField>
                <FormField label="Short Name for Team 1" name="team1-short">
                  <TextInput
                    id="team1-short"
                    value={team1Short}
                    onChange={(e) => setTeam1Short(e.target.value)}
                    textAlign="end"
                  />
                </FormField>
              </Box>
              <Box justify="center">
                <Text margin="small" weight="bold" textAlign="center">
                  VS
                </Text>
              </Box>
              <Box pad="small">
                <FormField label="Select Team 2" name="team-2">
                  <Select
                    options={teams.map((t) => `${t.teamName}`)}
                    value={teams[team2] ? teams[team2].teamName : ""}
                    onChange={({ selected }) => {
                      setTeam2(selected);
                      setTeam2Short(
                        getShort(teams[selected].teamName).toUpperCase(),
                      );
                    }}
                  />
                </FormField>
                <FormField label="Short Name for Team 2" name="team2-short">
                  <TextInput
                    id="team2-short"
                    value={team2Short}
                    onChange={(e) => setTeam2Short(e.target.value)}
                  />
                </FormField>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch);
