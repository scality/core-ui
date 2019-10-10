//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Reactlinechart from "../src/lib/components/reactlinechart/Reactlinechart.component";
import { Pie } from "react-chartjs-2";
const data = {
  labels: ["Availble", "Used", "Unknown"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

storiesOf("react-chartjs-2", module).add("Default", () => {
  return (
    <div>
      <h3>react-chartjs-2 linechart demo</h3>
      <Reactlinechart />
      <h3>react-chartjs-2 piechart demo</h3>
      <Pie data={data} height={70} />
    </div>
  );
});
