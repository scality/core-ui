//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import LineChart from "../src/lib/components/linechart/LineChart.component";
import { data } from "./data/linechart";
import { Wrapper, Title } from "./common";

const xAxis = {
  field: "time",
  type: "temporal",
  timeUnit: "yearmonthdatehoursminutes",
  title: "time"
};

const yAxis = [
  {
    field: "total_space",
    type: "quantitative",
    title: "TOTAL SPACE (GB)",
    color: "yellow"
  },
  {
    field: "used_space",
    type: "quantitative",
    title: "USED SPACE (GB)",
    color: "blue"
  }
];

const id = "vis";

storiesOf("LineChart", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Vege-Lite line chart demo</Title>
      <LineChart id={id} data={data} xAxis={xAxis} yAxis={yAxis} width={1000} />
    </Wrapper>
  );
});
