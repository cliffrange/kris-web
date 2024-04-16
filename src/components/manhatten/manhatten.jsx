import React, { useCallback, useMemo } from "react";
import { Box, Chart, Stack, Text } from "grommet";
import { XaxisPart, Yaxis, YaxisPart } from "./style";
import { Wrapper } from "../wrapper/wrapper";

const height = 400;

const Manhatten = ({ teamName, overs, totalOvers, max: initMax = 15 }) => {
  const minInitMax = initMax == 0 ? 5 : initMax;
  const max = Math.ceil(minInitMax / 5) * 5;

  const values = overs.map((over, idx) => {
    return { value: [idx, over.runs] };
  });

  const getX = useCallback(() => {
    const xaxis = [];
    for (let i = 0; i < totalOvers; i++) {
      xaxis.push(
        <XaxisPart thickness={thickness} totalOvers={totalOvers}>
          {i % 5 == 4 ? i + 1 : ""}
        </XaxisPart>,
      );
    }
    return xaxis;
  }, [totalOvers]);

  const getY = useCallback(() => {
    const yaxis = [];
    for (let i = max; i > 0; i = i - 5) {
      console.log(
        height,
        thickness,
        height - thickness / 2,
        (height - thickness / 2) / (max / 5),
      );
      yaxis.push(<YaxisPart>{i}</YaxisPart>);
    }
    return yaxis;
  }, [max]);

  const thickness = useMemo(() => {
    if (totalOvers > 49) {
      return "14";
    }

    if (totalOvers > 29) {
      return "20";
    }

    if (totalOvers > 19) {
      return "32";
    }

    if (totalOvers > 9) {
      return "40";
    }

    return "60";
  }, [totalOvers]);

  const thickNessHighRun = ((max + 0.5) * thickness) / height;

  const wickets = [];
  overs.forEach((over, idx) => {
    if (over.wickets === 0) {
      return;
    } else {
      for (let i = 0; i < over.wickets; i++) {
        wickets.push({
          value: [idx, i * thickNessHighRun + 0.5 * thickNessHighRun],
        });
      }
    }
  });

  return (
    <Wrapper title={teamName} subtitle={"Manhatten"}>
      <Yaxis
        background={{ color: "rgb(19, 8, 97)" }}
        thickness={thickness}
        height={height}
      >
        {getY()}
      </Yaxis>
      <Box width="100%">
        <Stack>
          <Chart
            values={values}
            color={{ color: "#466fb4" }}
            bounds={[
              [0, totalOvers - 1],
              [0, max],
            ]}
            thickness={thickness}
            size={{ width: "full", height: `${height}px` }}
            gap="small"
            pad="none"
          />
          <Chart
            values={wickets}
            type="point"
            point="circle"
            color={{ color: "rgb(152, 40, 6)" }}
            bounds={[
              [0, totalOvers - 1],
              [0, max],
            ]}
            thickness={thickness}
            size={{ width: "full", height: `${height}px` }}
            gap="small"
          />
        </Stack>
        <Box
          direction="row"
          flex
          height="10px"
          justify="between"
          background={{ color: "rgb(19, 8, 97)" }}
        >
          {getX()}
        </Box>
      </Box>
    </Wrapper>
  );
};

export { Manhatten };
