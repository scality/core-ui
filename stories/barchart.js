//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import BarChart from "../src/lib/components/barchart/BarChart.component";
import { Wrapper, Title } from "./common";
import { data, horizontalData } from "./data/barchart";

// props for vertical stacked bar chart
const id = "vis";
const xAxis = { timeUnit: "yearmonthdate", field: "date", type: "ordinal" };
const yAxis = {
  aggregate: "count",
  field: "*",
  title: null,
  type: "quantitative",
  scale: {
    padding: 1
  }
};
const color = {
  field: "status",
  type: "nominal",
  legend: { direction: "horizontal", orient: "top" },
  scale: {
    domain: ["2XX", "401", "404", "4XX", "503", "5XX"],
    range: ["#4BE4E2", "#E45834", "#FEFA52", "#968BFF", "#BE2543", "#DC90F1"]
  }
};
const width = 1000;
// the size control the size of each small item of the bar
const barConfig = { cornerRadius: 8, size: 12 };

// props for horizontal stacked bar chart
const idHorizontal = "vis_horizontal";
const xAxisHorizontal = {
  aggregate: "sum",
  field: "yield",
  type: "quantitative"
};
const yAxisHorizontal = { field: "variety", type: "nominal" };
const colorHorizontal = { field: "site", type: "nominal" };

// props for simple bar chart

storiesOf("BarChart", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Vertical Stacked Bar Chart Demo </Title>
      <BarChart
        id={id}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        color={color}
        width={width}
        barConfig={barConfig}
      />
      <Title>horizontal Stacked Bar Chart Demo </Title>
      <BarChart
        id={idHorizontal}
        data={horizontalData}
        xAxis={xAxisHorizontal}
        yAxis={yAxisHorizontal}
        color={colorHorizontal}
      />
    </Wrapper>
  );
});
