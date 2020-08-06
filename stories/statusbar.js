//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import StatusBar from "../src/lib/components/statusbar/StatusBar.component";
import { data } from "./data/statusbar";
import { Wrapper, Title } from "./common";

const id = "vis";

const title = {
  text: "GLOBAL HEALTH",
  anchor: "start",
  color: "#a8b5c1",
};

const xAxis = {
  timeUnit: "yearmonthdatehoursminutes",
  field: "date",
  type: "nominal",
  title: null,
  axis: {
    // Refer to all the available time format: https://github.com/d3/d3-time-format#locale_format
    format: "%d %b",
    // Boolean value that determines whether the axis should include ticks.
    ticks: false,
    // Display the label when the new day starts
    labelExpr: "timeFormat(datum.value, '%H') == '00'? datum.label:''",
    labelAngle: -80,
    labelColor: "#a8b5c1",
  },
};

const yAxis = {
  field: "symbol",
  type: "nominal",
  title: null,
  axis: null,
};

const color = {
  field: "status",
  type: "quantitative",
  title: null,
  // Set the color of the 3 statuss
  scale: {
    range: ["#dc3545", "#fefa52", "#28a745"],
  },
  // Disable the legend status bar
  legend: null,
};

// const transform = [
//   // Calculate Transform: transform extends data objects with new fields (columns).
//   {
//     calculate: "'https://www.google.com/search?q=' + datum.date",
//     as: "url",
//   },
// ];

// The mark becomes a hyperlink. The specified URL is loaded upon a mouse click.
// Note that using Hyperlink would lose all the context. `VegaEmbed` provides us a way to use `addEventListener`.
// const href = {
//   field: "url",
//   type: "nominal",
//   condition: {
//     test: "datum.alertNum === 0",
//     field: null,
//   },
// };

const tooltip = [
  {
    field: "date",
    type: "temporal",
    timeUnit: "yearmonthdatehoursminutes",
    title: "Date and Time",
  },
  { field: "alertNum", type: "nominal", title: "Number of alerts" },
  { field: "alert", type: "nominal", title: "Alerts" },
];

const text = {
  field: "currentStatus",
  type: "nominal",
  // The color of `Current Status` text
  color: "#a8b5c1",
};

storiesOf("StatusBar", module).add("Default", () => {
  return (
    <Wrapper>
      <Title>Vege-Lite statusbar demo</Title>
      <StatusBar
        id={id}
        data={data}
        title={title}
        xAxis={xAxis}
        yAxis={yAxis}
        color={color}
        // transform={transform}
        //  href={href}
        tooltip={tooltip}
        text={text}
      />
    </Wrapper>
  );
});
