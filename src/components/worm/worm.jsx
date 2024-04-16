import React, { useCallback, useMemo } from "react";
import { Box, Chart, Stack, Text } from "grommet";
import { XaxisPart, Yaxis, YaxisPart } from "./styles";
import { Wrapper } from "../wrapper/wrapper";

const height = 400;

const colors = ["#466fb4", "#cc8b5f", "#46b45e"];

const Worm = ({ teamName, worms, totalBalls }) => {
  let initMax = 50;

  worms.forEach((w) => {
    if (w.balls.length && w.balls[w.balls.length - 1].runs > initMax) {
      initMax = w.balls[w.balls.length - 1].runs;
    }
  });

  let step = 25;

  if (initMax > 100) {
    step = 50;
  }

  if (initMax > 300) {
    step = 100;
  }

  const max = Math.ceil(initMax / step) * step;

  const charts = worms.map((w) => {
    const c = {
      values: w.balls.map((b, idx) => ({ value: [idx, b.runs] })),
    };

    c.wickets = [];
    w.balls.forEach((ball, idx) => {
      if (!ball.wicket) {
        return;
      } else {
        c.wickets.push({
          value: [idx, ball.runs],
        });
      }
    });

    return c;
  });

  console.log(charts);

  const getX = useCallback(() => {
    const xaxis = [];
    for (let i = 30; i <= totalBalls; i = i + 30) {
      xaxis.push(
        <XaxisPart thickness={thickness} totalOvers={totalBalls}>
          {(i / 30) * 5}
        </XaxisPart>,
      );
    }
    return xaxis;
  }, [totalBalls]);

  const getY = useCallback(() => {
    const yaxis = [];
    console.log(max, "<-");
    for (let i = max; i > 0; i = i - step) {
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
    if (totalBalls > 49) {
      return "14";
    }

    if (totalBalls > 29) {
      return "20";
    }

    if (totalBalls > 19) {
      return "32";
    }

    if (totalBalls > 9) {
      return "40";
    }

    return "60";
  }, [totalBalls]);

  return (
    <Wrapper title={"Worm"}>
      <Yaxis
        background={{ color: "rgb(19, 8, 97)" }}
        thickness={thickness}
        height={height}
      >
        {getY()}
      </Yaxis>
      <Box width="100%">
        <Stack>
          {charts.map((c, idx) => (
            <Stack>
              <Chart
                values={c.values}
                type="line"
                color={{ color: colors[idx] }}
                bounds={[
                  [0, totalBalls - 1],
                  [0, max],
                ]}
                thickness={"3"}
                size={{ width: "full", height: `${height}px` }}
                gap="small"
                pad="none"
              />
              <Chart
                values={c.wickets}
                type="point"
                point="circle"
                color={{ color: "rgb(152, 40, 6)" }}
                bounds={[
                  [0, totalBalls - 1],
                  [0, max],
                ]}
                thickness={"8"}
                size={{ width: "full", height: `${height}px` }}
                gap="small"
              />{" "}
            </Stack>
          ))}
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

export { Worm };
