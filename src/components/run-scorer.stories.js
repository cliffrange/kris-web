import React from 'react';
import RunScorer from './run-scorer';
import { action } from '@storybook/addon-actions';

export default { title: 'Run Scorer' };

export const score = () => (
    <RunScorer onBall={(value) => { action("value")}}/>
);

