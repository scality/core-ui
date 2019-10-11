//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import { bb } from "billboard.js";
import "billboard.js/dist/billboard.css";

type Props = {};

const BillboardGaugechartContainer = styled.div``;

function BillboardGaugechart(props: Props) {
  useEffect(() => {
    var chart = bb.generate({
      data: {
        columns: [["data", 91.4]],
        type: "gauge"
      },
      gauge: {},
      color: {
        pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"],
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      },
      bindto: "#gaugeChart"
    });
    setTimeout(function() {
      chart.load({
        columns: [["data", 10]]
      });
    }, 1000);

    setTimeout(function() {
      chart.load({
        columns: [["data", 50]]
      });
    }, 2000);

    setTimeout(function() {
      chart.load({
        columns: [["data", 70]]
      });
    }, 3000);

    setTimeout(function() {
      chart.load({
        columns: [["data", 0]]
      });
    }, 4000);

    setTimeout(function() {
      chart.load({
        columns: [["data", 100]]
      });
    }, 5000);
  }, []);
  return (
    <BillboardGaugechartContainer
      id="gaugeChart"
      className="sc-billboardgaugechart"
    ></BillboardGaugechartContainer>
  );
}

export default BillboardGaugechart;
