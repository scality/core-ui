//@flow
import React from "react";
import VegaChart from "../vegachart/VegaChart.component.js";
import { lighten } from "polished";
type Props = {
  id: string,
  title?: string,
  width?: number,
  height?: number,
  data: Array<Object>,
  xAxis: Object,
  yAxis: Object,
  row: Object,
  color?: string,
  maxRuleColor?: string,
  minRuleColor?: string
};

function SparkLine({
  id,
  title,
  width = 300,
  height = 80,
  data,
  xAxis,
  yAxis,
  row,
  color,
  maxRuleColor = "#F1B434",
  minRuleColor = "#006F62"
}: Props) {
  const maxRuleColorLight = lighten(0.5, maxRuleColor).toString();
  const minRuleColorLight = lighten(0.5, minRuleColor).toString();

  const spec = {
    title: { text: title },
    data: { values: data },
    facet: {
      row
    },
    spec: {
      width,
      height,
      fill: "yellow",
      layer: [
        // display the sparkline chart
        {
          mark: "line",
          encoding: {
            x: xAxis,
            y: yAxis,
            color: { value: color }
          }
        },
        // display the label to specify the max/min data
        {
          mark: {
            type: "text",
            style: "labelMin",
            align: "bottom",
            dy: height / 2,
            dx: width / 2 + 10
          },
          encoding: {
            text: { aggregate: "min", field: "y", type: "quantitative" }
          }
        },
        {
          mark: {
            type: "text",
            style: "labelMax",
            align: "top",
            dy: -(height / 2),
            dx: width / 2 + 10
          },
          encoding: {
            text: { aggregate: "max", field: "y", type: "quantitative" }
          }
        },
        // display the rule of the max/min line
        {
          mark: { type: "rule", style: "ruleMaxEnd", color: maxRuleColor },
          encoding: {
            y: { aggregate: "max", field: "y", type: "quantitative" },
            x: { value: width - 15 },
            x2: { value: width }
          }
        },
        {
          mark: {
            type: "rule",
            style: "ruleMaxStart",
            color: maxRuleColorLight,
            opacity: 0.2
          },
          encoding: {
            y: { aggregate: "max", field: "y", type: "quantitative" },
            x: { value: 0 },
            x2: { value: width - 15 }
          }
        },
        {
          mark: { type: "rule", style: "ruleMinEnd", color: minRuleColor },
          encoding: {
            y: { value: height },
            x: { value: width - 15 },
            x2: { value: width }
          }
        },
        {
          mark: {
            type: "rule",
            style: "ruleMinStart",
            color: minRuleColorLight,
            opacity: 0.2
          },
          encoding: {
            y: { value: height },
            x: { value: 0 },
            x2: { value: width - 15 }
          }
        }
      ]
    }
  };
  return <VegaChart className="sc-sparkline" id={id} spec={spec}></VegaChart>;
}

export default SparkLine;
