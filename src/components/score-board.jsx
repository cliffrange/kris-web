import React from 'react';
import { Text } from 'grommet'

const ScoreBoard = ({score, wickets, over, ball}) => {
    return (
        <div>
            <Text size={'77px'}>{score}/{wickets}</Text>
            overs {over}.{ball}
        </div>
    );
};

export default ScoreBoard;