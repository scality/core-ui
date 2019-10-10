//@flow
import React from "react";
import styled from "styled-components";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  createContainer,
  VictoryAxis
} from "victory";
import { chartdatalist } from "/Users/yanjin/Scality/core-ui/stories/data/chartdatalist";
type Props = {};

const VictorylinechartContainer = styled.div`
  position: absolute;
`;

function Victorylinechart(props: Props) {
  const VictoryCursorVoronoiContainer = createContainer("cursor", "voronoi");

  return (
    <VictorylinechartContainer className="sc-victorylinechart">
      <VictoryChart
        width={1000}
        height={400}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryCursorVoronoiContainer
            cursorDimension="x"
            voronoiDimension="x"
            labels={({ datum }) =>
              datum._y === datum.total_space
                ? `${datum.time} total space: ${datum.total_space}`
                : `${datum.time} used space: ${datum.used_space}`
            }
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: "white" }}
              />
            }
          />
        }
      >
        <VictoryAxis tickCount={10} scale={{ x: "time" }} />
        <VictoryAxis dependentAxis tickFormat={y => `${y}GB`} />
        <VictoryLine
          style={{ data: { stroke: "orange" }, labels: { fill: "orange" } }}
          interpolation="linear"
          data={chartdatalist}
          x="time"
          y="total_space"
          // animate={{
          //   duration: 2000,
          //   onLoad: { duration: 1000 }
          // }}
        />

        <VictoryLine
          style={{ data: { stroke: "green" }, labels: { fill: "green" } }}
          interpolation="linear"
          data={chartdatalist}
          x="time"
          y="used_space"
          // animate={{
          //   duration: 2000,
          //   onLoad: { duration: 1000 }
          // }}
        />
      </VictoryChart>
    </VictorylinechartContainer>
  );
}

export default Victorylinechart;
