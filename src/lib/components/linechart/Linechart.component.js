//@flow
import React from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush
} from "recharts";
import { chartdatalist } from "/Users/yanjin/Scality/core-ui/stories/data/chartdatalist";
type Props = {};

const LinechartContainer = styled.div`
  width: 100%;
  height: 500px;
`;

function Linechart(props: Props) {
  return (
    <LinechartContainer className="sc-linechart">
      <ResponsiveContainer>
        <LineChart
          width={1000}
          height={400}
          data={chartdatalist}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            name="total space"
            type="linear"
            dataKey="total_space"
            stroke="#FF8F1C"
            dot={false}
            strokeWidth={2}
          />
          <Line
            name="used space"
            type="linear"
            dataKey="used_space"
            stroke="#228F67"
            dot={false}
            strokeWidth={2}
          />
          <Brush />
          <Legend verticalAlign="top" />
        </LineChart>
      </ResponsiveContainer>
    </LinechartContainer>
  );
}

export default Linechart;
