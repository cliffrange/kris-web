import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button, FormField, Select, TextInput } from 'grommet';
import { startMatch } from '../redux/actions/action-creators';

const mapStateToProps = (state) => {
    return { teams: state.currentMatchState.teams };
};

const mapDispatchToProps = {
    startMatch
}

const InitializeMatch = ({teams}) => {

    return (
        <Box fill justify="center">
            <Box width="medium">
                <FormField label="Match Description" name="match-description" required >
                    <TextInput
                        onChange={(e) => {}} />
                </FormField>
                <FormField label="Select Team 1" name="team-1">
                    <Select options={teams.map(t => `${t.name}`)}
                        value={team1}
                        onChange={({option}) => {setTeam1(option)}}/>
                </FormField>
                <FormField label="Select Team 2" name="team-2">
                    <Select options={teams.map(t => `${t.name}`)}
                        value={team2}
                        onChange={({option}) => {setTeam2(option)}}/>
                </FormField>
                <Box direction="row" justify="between" margin={{ top: "medium" }}>
                    <Button label="Cancel" />
                    <Button label="Start" primary onClick={() => {console.log(team1, team2)}}/>
                </Box>
            </Box>
        </Box>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(InitializeMatch);
