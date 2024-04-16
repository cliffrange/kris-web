import React from 'react';
import { Batter, CurrentBatters } from './batter';

export default { title: 'Batter' };

export const batter = () => (
    <Batter player={{lastName: 'Herath'}} score={75} balls={43}/>
);

export const LongLastName = () => (
    <Batter player={{lastName: 'AReallyReallyLongLongLongLastName'}} score={75} balls={43}/>
);

export const bigScore = () => (
    <Batter player={{lastName: 'Warner'}} score={1275} balls={1243}/>
);
