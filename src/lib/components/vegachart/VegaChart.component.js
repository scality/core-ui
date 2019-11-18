//@flow
import React, { useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import vegaEmbed from "vega-embed";

type Props = {
  id: string,
  spec: Object
};

const VegaChartContainer = styled.div``;

function VegaChart({ id, spec }: Props) {
  const themeContext = useContext(ThemeContext);

  const currentBackgroundColor =
    themeContext &&
    themeContext.brand &&
    themeContext.brand.backgroundContrast1;

  const themeConfig = {
    config: {
      background: currentBackgroundColor,
      axis: {
        labelColor:
          themeContext && themeContext.brand && themeContext.brand.text,
        titleColor:
          themeContext && themeContext.brand && themeContext.brand.text,
        grid: false
      },
      view: { stroke: "transparent" }
    }
  };
  const themedSpec = { ...spec, ...themeConfig };

  useEffect(() => {
    vegaEmbed(`#${id}`, themedSpec, { renderer: "svg" });
  }, [id, themedSpec]);

  return (
    <VegaChartContainer id={id} className="sc-vegachart"></VegaChartContainer>
  );
}

export default VegaChart;
