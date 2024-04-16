import React from 'react';
import Ball from './ball';

export default { title: 'Ball' };

export const ball = () => (
    <div>
    <Ball text={6} background={{color: "brand"}}/>
    <Ball text={6} background={{color: "#55ff00"}}/>
    <Ball text={"nb"} background={{color: "#f1f81f"}}/>
    </div>
);
