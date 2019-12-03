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

  const currentBackgroundColor2 =
    themeContext &&
    themeContext.brand &&
    themeContext.brand.backgroundContrast2;

  const brandText =
    themeContext && themeContext.brand && themeContext.brand.text;

  const themeConfig = {
    config: {
      background: currentBackgroundColor,
      axis: {
        labelColor: brandText,
        titleColor: brandText,
        grid: false
      },
      title: {
        color: brandText
      },
      view: { stroke: "transparent", fill: currentBackgroundColor2 },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: brandText
      },
      // the label of max/min
      text: {
        color: brandText
      },
      // the trend line max/min and verticle
      rule: {
        color: brandText
      }
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
