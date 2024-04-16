import React from "react";
import { Box, Text } from "grommet";
import  styled  from "styled-components";

const HeaderBox = styled(Box)`
height: 60px;
    padding-bottom: 8px;
`;

export const Header = ({ children, name }) => <HeaderBox direction="row" justify="between" align="center" border={{
    "color": "brand",
    "size": "small",
    "side": "bottom"
  }}>
<Text size="large" weight="bold">{name}</Text>{children}</HeaderBox>;
