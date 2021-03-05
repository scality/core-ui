//@flow
import React, { useEffect, useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";
import vegaEmbed, { Result } from "vega-embed";

type Props = {
  id: string,
  spec: Object,
  theme?: string, // predefine theme light/dark, or 'custom'
  // How to theme tooltip:
  // https://github.com/vega/vega-tooltip/blob/master/docs/customizing_your_tooltip.md)
  history?: Object,
  link?: string,
};

const VegaChartContainer = styled.div``;

function VegaChart({ id, spec, theme = "light", history, link }: Props) {
  const themeContext = useContext(ThemeContext);

  const currentBackgroundColor =
    themeContext && themeContext.brand && themeContext.brand.primaryDark1;

  const currentBackgroundColor2 =
    themeContext && themeContext.brand && themeContext.brand.primaryDark2;

  const brandText =
    themeContext && themeContext.brand && themeContext.brand.textPrimary;

  const themeConfig = {
    config: {
      background: currentBackgroundColor,
      axis: {
        labelColor: brandText,
        titleColor: brandText,
        grid: false,
        domainColor: currentBackgroundColor2,
      },
      title: {
        color: brandText,
        font: "Lato",
      },
      view: { stroke: "transparent", fill: currentBackgroundColor2 },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: brandText,
      },
      // the label of max/min
      text: {
        color: brandText,
        font: "Lato",
      },
      // the up, bottom trend line and verticle line when hover
      rule: {
        color: brandText,
      },
      legend: {
        labelColor: brandText,
        titleColor: brandText,
      },
    },
  };
  const themedSpec = { ...spec, ...themeConfig };

  const vegaInstance = useRef<Result>();

  useEffect(() => {
    let isMounted = true;

    vegaEmbed(`#${id}`, themedSpec, {
      renderer: "svg",
      tooltip: { theme: theme },
      // Determines if action links
      // ("Export as PNG/SVG", "View Source", "View Vega" (only for Vega-Lite), "Open in Vega Editor")
      // are included with the embedded view.
      // If the value is true, all action links will be shown and none if the value is false.
      actions: false,
    })
      .then((result) => {
        vegaInstance.current = result;
        result.view.addEventListener("click", function (event, item) {
          console.log("CLICK", event, item);
          history && history.push(link);
        });
      })
      .catch((...args) => {
        if (isMounted) {
          console.error(...args); // TODO: we should handle this with a retry or an error state of the component
        }
      });

    return () => {
      isMounted = false;
      if (vegaInstance.current) {
        vegaInstance.current.view.finalize();
      }
    };
  }, [id, themedSpec, theme, vegaInstance, history, link]);

  return (
    <VegaChartContainer id={id} className="sc-vegachart"></VegaChartContainer>
  );
}

export default VegaChart;
