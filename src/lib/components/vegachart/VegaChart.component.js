//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import vegaEmbed from "vega-embed";

type Props = {
  id: string,
  spec: Object
};

const VegaChartContainer = styled.div``;

function VegaChart({ id, spec }: Props) {
  useEffect(() => {
    vegaEmbed(`#${id}`, spec, { renderer: "svg" });
  }, [id, spec]);

  return (
    <VegaChartContainer id={id} className="sc-vegachart"></VegaChartContainer>
  );
}

export default VegaChart;
