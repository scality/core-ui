//@flow
import React from "react";
import styled from "styled-components";
import * as vega from "vega";
import vegaEmbed from "vega-embed";

type Props = {
  spec: Object,
  handleClick?: Function
};

const VegaLinechartContainer = styled.div``;

function VegaLinechart({ spec, handleClick }: Props) {
  const chartContainer = React.useRef(null);
  React.useEffect(() => {
    const createView = async () => {
      try {
        const view = new vega.View(vega.parse(spec), {
          logLevel: vega.Warn,
          renderer: "svg",
          container: chartContainer.current,
          hover: true
        });

        const awaitedView = await view.runAsync();
        awaitedView.addSignalListener("clickOnCategory", handleClick);
      } catch (error) {
        console.error(error);
      }
    };

    createView();
  }, [spec, handleClick]);
  vegaEmbed("#vis", spec);

  return (
    <VegaLinechartContainer
      className="sc-vegalinechart"
      ref={chartContainer}
      id="vis"
    ></VegaLinechartContainer>
  );
}

export default VegaLinechart;
