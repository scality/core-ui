//@flow
import React, { useEffect } from "react";
import styled from "styled-components";
import vegaEmbed from "vega-embed";

type Props = {
  id: string,
  data: Object,
  layer?: Array<Object>,
  height?: any,
  width?: any
};

const TestchartContainer = styled.div``;

function Testchart({ id, height, width, data, layer, ...props }: Props) {
  useEffect(() => {
    vegaEmbed(id, spec);
  }, []);

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    height: height,
    width: width,
    data: data,
    layer: layer,
    ...props
  };

  return (
    <TestchartContainer className="sc-testchart">
      <div id={id.substr(1)}></div>
    </TestchartContainer>
  );
}

export default Testchart;
