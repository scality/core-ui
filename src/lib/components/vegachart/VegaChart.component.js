//@flow
import React, { useEffect, useContext, useRef } from 'react';
import vegaEmbed, { Result } from 'vega-embed';
import { ThemeContext, createGlobalStyle } from 'styled-components';
import { getThemePropSelector } from '../../utils';

export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
type Props = {
  id: string,
  spec: Object,
  tooltipPosition?: Position,
  theme?: 'light' | 'dark' | 'custom',
};

/* How to theme tooltip:
https://github.com/vega/vega-tooltip/blob/master/docs/customizing_your_tooltip.md
*/
const VegaTooltipTheme = createGlobalStyle`
  #vg-tooltip-element.vg-tooltip.custom-theme {
    padding: 8px;
    position: fixed;
    z-index: 1000;
    font-family: 'Lato';
    font-size: 12px;
    border-radius: 3px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    color: ${getThemePropSelector('textPrimary')};
    background-color: ${getThemePropSelector('primaryDark2')};
    border: 1px solid ${getThemePropSelector('border')};
    // customize the title
    h2 {
      color: ${getThemePropSelector('textSecondary')};
      margin-bottom: 10px;
      font-size: 12px;
    }
  }
`;

function VegaChart({
  id,
  spec,
  tooltipPosition = BOTTOM,
  theme = 'light',
}: Props) {
  const themeContext = useContext(ThemeContext);

  const currentBackgroundColor =
    themeContext && themeContext.brand
      ? themeContext.brand.backgroundLevel4
      : themeContext.backgroundLevel4;
  // the background color of the view
  const currentBackgroundColor2 =
    themeContext && themeContext.brand
      ? themeContext.brand.backgroundLevel1
      : themeContext.backgroundLevel1;

  const brandText =
    themeContext && themeContext.brand
      ? themeContext.brand.textPrimary
      : themeContext.textPrimary;

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
        font: 'Lato',
      },
      view: { stroke: 'transparent', fill: currentBackgroundColor2 },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: brandText,
      },
      // the label of max/min
      text: {
        color: brandText,
        font: 'Lato',
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

  let tooltipOptions = { theme: theme };
  if (tooltipPosition === TOP) {
    tooltipOptions = { theme: theme, offsetX: -85, offsetY: -140 };
  }

  useEffect(() => {
    let isMounted = true;
    vegaEmbed(`#${id}`, themedSpec, {
      renderer: 'svg',
      // Override the DEFAULT_OPTIONS https://github.com/vega/vega-tooltip/blob/master/src/defaults.ts
      tooltip: tooltipOptions,
      /* Determines if action links
      ("Export as PNG/SVG", "View Source", "View Vega" (only for Vega-Lite), "Open in Vega Editor") are included with the embedded view.
      If the value is true, all action links will be shown and none if the value is false. */
      actions: false,
    })
      .then((result) => {
        vegaInstance.current = result;
        // result.view contains the Vega view
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
  }, [id, themedSpec, tooltipOptions, vegaInstance]);

  return (
    <div id={id} className="sc-vegachart">
      <VegaTooltipTheme />
    </div>
  );
}

export default VegaChart;
