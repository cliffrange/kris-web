import React from "react";
import { Box, Button, FormField, Select, TextInput, Text } from "grommet";
import AddPlayer from "./add-player";

const EditTeam = ({ players, addPlayer, teamName, setTeamName }) => {
  return (
    <Box direction="row" gap="large" margin="small">
      <Box width="medium">
        <FormField label="Team Name" name="team-name" required>
          <TextInput
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
          />
        </FormField>

        <Box
          border={{
            color: "border",
            size: "small",
            side: "all",
          }}
          round="small"
          margin={{ top: "large" }}
        >
          <Box
            round={{ size: "small", corner: "top" }}
            pad="small"
            background="brand"
          >{`Add Players (${players.length})`}</Box>
          <Box pad="small">
            <AddPlayer onAdd={addPlayer} />
          </Box>
        </Box>
        {/* <Box direction="row" justify="between" margin={{ top: "medium" }}>
          <Button label="Cancel" />
          <Button
            label="Create"
            primary
            onClick={async () => {
              const tokenPromise = getTokenSilently();
              createTeam(tokenPromise);
              history.push("/my-teams");
            }}
          />
        </Box> */}
      </Box>

      <Box width="medium">
        <Box
          pad="small"
          background="brand"
          round={{ corner: "top", size: "small" }}
          width="380px"
        >
          <Text textAlign="center">{teamName}</Text>
        </Box>
        <Box
          pad="small"
          background="#466fb466"
          round={{ corner: "bottom", size: "small" }}
          width="380px"
        >
          {players.map((player, index) => (
            <Box pad="xsmall" direction="row" key={player.id}>
              <Box direction="row" justify="between" fill>
                <Text
                  truncate
                  margin={{ right: "small" }}
                  style={{ lineHeight: "36px" }}
                >
                  {player.firstName + " " + player.lastName}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EditTeam;
