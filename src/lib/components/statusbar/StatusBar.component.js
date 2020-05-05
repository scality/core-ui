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
  // external links
  transform?: Array<Object>,
  href?: Object,
  tooltip?: Array<Object>,
  // the addional text be display in the top right
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
        transform,
        encoding: {
          x: xAxis,
          color,
          y: yAxis,
          tooltip,
          href,
        },
      },
      // text on the top right
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
