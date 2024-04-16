import React, { useState } from 'react';
import { Box, Button, FormField, Select, TextInput } from 'grommet';

const AddPlayer = ({onAdd}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    return (
        <Box filljustify="center">
            <Box width="medium">
            <FormField label="Last Name" name="lastName" required>
                <TextInput value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </FormField>
            <FormField label="First Name" name="firstName">
                <TextInput value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </FormField>
            <FormField label="Role" name="role">
                <Select options={["Batter", "Bowler", "All Rounder", "Wicket Keeper Batter"]}
                    value={role}
                    onChange={({option}) => setRole(option)}/>
            </FormField>
            <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button label="Cancel" />
                <Button label="Add" primary onClick={() => {
                    onAdd({firstName, lastName, role});
                    setFirstName("");
                    setLastName("");
                    setRole("");
                }}/>
            </Box>
            </Box>
        </Box>
    );
};

export default AddPlayer;