//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import StackedBarChart from "../src/lib/components/stackedbarchart/StackedBarChart.component";
import { Wrapper, Title } from "./common";
import { data } from "./data/stackedbarchart";

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

// the size control the size of each small item of the bar
const mark = { type: "bar", cornerRadius: 8, size: 12 };

storiesOf("StackedBarChart", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Vertical Stacked Bar Chart Demo </Title>
      <StackedBarChart
        id={id}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        color={color}
        mark={mark}
      />
    </Wrapper>
  );
});
