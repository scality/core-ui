//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";

type Props = {
  id: string,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Object,
  color: Object,
  title?: Object,
  width?: number,
  height?: number,
  // External links
  transform?: Array<Object>,
  href?: Object,
  tooltip?: Array<Object>,
  // The addional text be display in the top right
  text?: Object,
};

function StatusBar({
  id,
  width = 700,
  height = 25,
  data,
  title,
  transform,
  xAxis,
  yAxis,
  color,
  tooltip,
  href,
  text,
}: Props) {
  const spec = {
    title,
    width,
    height,
    data: { values: data },
    layer: [
      {
        mark: {
          type: "rect",
          tooltip: true,
          cornerRadius: 1,
        },
        selection: {
          highlight: { type: "single", on: "mouseover" },
        },
        transform,
        encoding: {
          x: xAxis,
          y: yAxis,
          color,
          // Tooltip Channel
          tooltip,
          // Hyperlink Channel
          href,
          // Highlight the focused time-period
          opacity: {
            condition: { selection: "highlight", value: 1 },
            value: 0.6,
          },
        },
      },
      // Text on the top right
      {
        mark: {
          type: "text",
          dy: -25,
          color: text && text.color,
        },
        encoding: {
          x: xAxis,
          text,
        },
      },
    ],
  };
  return <VegaChart className="sc-statusbar" id={id} spec={spec}></VegaChart>;
}

export default StatusBar;
