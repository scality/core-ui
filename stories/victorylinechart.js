//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import Victorylinechart from "../src/lib/components/victorylinechart/Victorylinechart.component";
import { VictoryPie, VictoryTooltip } from "victory";

const VictorypiechartContainer = styled.div`
  position: absolute;
  padding-top: 400px;
  padding-left: 100px;
`;

const VictoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

storiesOf("Victory", module).add("Default", () => {
  return (
    <VictoryContainer>
      <h3>Victory linechart demo</h3>
      <Victorylinechart />
      <VictorypiechartContainer>
        <h3>Victory piechart demo</h3>
        <VictoryPie
          data={[{ x: "used", y: 2400 }, { x: "availble", y: 4567 }]}
          colorScale={["orange", "green"]}
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
        />
      </VictorypiechartContainer>
    </VictoryContainer>
  );
});
