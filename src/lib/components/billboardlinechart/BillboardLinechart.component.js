//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import { bb } from "billboard.js";
import "billboard.js/dist/billboard.css";
type Props = {
  chartdata: Object,
  bindto: string
};

const BillboardLinechartContainer = styled.div`
  height: 300px;
`;

function BillboardLinechart({ chartdata, bindto, ...rest }: Props) {
  useEffect(() => {
    var chart = bb.generate({
      ...chartdata,
      bindto
    });
  }, [chartdata, bindto]);

  return (
    <BillboardLinechartContainer
      id={bindto.substr(1)}
      className="sc-billboardlinechart"
    ></BillboardLinechartContainer>
  );
}

export default BillboardLinechart;
