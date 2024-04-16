import React from 'react';
import Score from './score';

export default { title: 'Score' };

export const score = () => (
    <Score score={23} wickets={2} over={6} ball={3} />
);

export const bigScore = () => (
    <Score score={1989} wickets={6} over={223} ball={3} />
);
