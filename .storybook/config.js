import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Grommet, grommet } from 'grommet';

configure(require.context('../src', true, /\.stories\.js$/), module);

const GrommetDeco = (storyFn) => {
    return <Grommet theme={grommet}>
        {
            storyFn()
        }
    </Grommet>
};

addDecorator(GrommetDeco);