import React from "react";
import { Box, Text } from 'grommet';

function ScoreCard({ team }) {
    if (!team) {
        return "NO INFO"
    }

    return (
        <Box width="360px" >
            <Box pad="xsmall" align="center" round={{ corner: "top", size: "small" }} background={{ color: "brand" }}><Text size="large">{team.teamName}</Text></Box>
            <Box pad={{ vertical: "small" }} round={{ corner: "bottom", size: "small" }} border={{ color: "brand" }} gap="xxsmall">
                {
                    team.batLineup.map((pid) => {
                        return (
                            <Box direction="row" justify="between" pad={{ horizontal: "small" }} border={{ side: "horizontal", color: "brand" }}>
                                <Box height="32px" justify="center">{team.players[pid].lastName}</Box>
                                <Box height="32px" justify="center">
                                    <Text textAlign="end">{`${team.players[pid].batter.score}(${team.players[pid].batter.balls})`}</Text>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    );
}

export default ScoreCard;
