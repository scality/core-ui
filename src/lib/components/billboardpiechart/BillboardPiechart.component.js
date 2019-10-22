//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import { bb } from "billboard.js";
import "billboard.js/dist/billboard.css";
type Props = {};

const BillboardPiechartContainer = styled.div``;

function BillboardPiechart(props: Props) {
  useEffect(() => {
    var chart = bb.generate({
      data: {
        columns: [["used", 30], ["availble", 120]],
        type: "pie"
      },
      color: { pattern: ["#FF8F1C", "#228F67"] },
      tooltip: {
        format: {
          value: function(value) {
            return value + " GB";
          }
        }
      },
      bindto: "#pieChart"
    });
  }, []);

  return (
    <BillboardPiechartContainer
      id="pieChart"
      className="sc-billboardpiechart"
    ></BillboardPiechartContainer>
  );
}

export default BillboardPiechart;
