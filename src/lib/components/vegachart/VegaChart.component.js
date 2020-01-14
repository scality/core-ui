//@flow
import React, { useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import vegaEmbed from "vega-embed";

type Props = {
  id: string,
  spec: Object,
  theme?: string // predefine theme light/dark, or 'custom'
  // How to theme tooltip:
  // https://github.com/vega/vega-tooltip/blob/master/docs/customizing_your_tooltip.md)
};

const VegaChartContainer = styled.div``;

function VegaChart({ id, spec, theme = "light" }: Props) {
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
        grid: false,
        domainColor: currentBackgroundColor2
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
      // the up,bottom trend line and verticle line when hover
      rule: {
        color: brandText
      },
      legend: {
        labelColor: brandText,
        titleColor: brandText
      }
    }
  };
  const themedSpec = { ...spec, ...themeConfig };

  useEffect(() => {
    vegaEmbed(`#${id}`, themedSpec, {
      renderer: "svg",
      tooltip: { theme: theme },
      // Determines if action links
      // ("Export as PNG/SVG", "View Source", "View Vega" (only for Vega-Lite), "Open in Vega Editor")
      // are included with the embedded view.
      // If the value is true, all action links will be shown and none if the value is false.
      actions: false
    });
  }, [id, themedSpec, theme]);

  return (
    <VegaChartContainer id={id} className="sc-vegachart"></VegaChartContainer>
  );
}

export default VegaChart;
