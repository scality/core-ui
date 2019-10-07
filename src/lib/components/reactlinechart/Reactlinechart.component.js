//@flow
import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
type Props = {};
const data = {
  labels: [
    "5:07 AM",
    "9:03 AM",
    "4:56 AM",
    "10:26 PM",
    "5:23 AM",
    "9:18 PM",
    "7:25 AM",
    "12:14 PM",
    "2:43 AM",
    "5:11 AM"
  ],
  datasets: [
    {
      label: "Total Objects",
      fill: false,
      lineTension: 0.2,
      backgroundColor: "#E9EBED", // not the real background color;
      borderColor: "#FF8F1C",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#FF8F1C",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#FF8F1C",
      pointHoverBorderColor: "#FF8F1C",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [10, 10, 13, 74, 8, 50, 94, 18, 71, 36]
    }
  ]
};
const ReactlinechartContainer = styled.div`
  background-color: #e9ebed;
`;

function Reactlinechart(props: Props) {
  return (
    <ReactlinechartContainer className="sc-reactlinechart">
      <Line
        width={800}
        height={400}
        options={{ maintainAspectRatio: false }}
        data={data}
      />
    </ReactlinechartContainer>
  );
}

export default Reactlinechart;
