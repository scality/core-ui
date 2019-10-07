//@flow
import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { chartdatalist } from "/Users/yanjin/Scality/core-ui/stories/data/chartdatalist";
type Props = {};

const LinechartContainer = styled.div``;

function Linechart(props: Props) {
  return (
    <LinechartContainer className="sc-linechart">
      <LineChart width={1000} height={400} data={chartdatalist}>
        <Line
          name="TOTAL SPACE"
          type="linear"
          dataKey="total_space"
          stroke="#FF8F1C"
          dot={false}
          strokeWidth={2}
        />
        <Line
          name="USED SPACE"
          type="linear"
          dataKey="used_space"
          stroke="#228F67"
          dot={false}
          strokeWidth={2}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={value => `${value} GB`} />
        <Tooltip formatter={value => `${value} GB`} />
        <Legend verticalAlign="top" height={36} />
      </LineChart>
    </LinechartContainer>
  );
}

export default Linechart;
