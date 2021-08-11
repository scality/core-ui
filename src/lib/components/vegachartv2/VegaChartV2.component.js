//@flow
import React, { useEffect, useContext, useRef } from 'react';
import * as vega from 'vega';
import vegaEmbed, { Result } from 'vega-embed';
import { ThemeContext, createGlobalStyle } from 'styled-components';
import { getThemePropSelector } from '../../utils';
import { useCursorX, SyncedCursorChartsContext } from './SyncedCursorCharts';

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
    background-color: ${getThemePropSelector('backgroundLevel1')};
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
  theme = 'custom',
}: Props) {
  const useCursorContext = useCursorX();
  const themeContext = useContext(ThemeContext);
  const cursorX = useCursorX().cursorX;

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

  /* 
  There are two useEffect():
  The first effect will only render once, to initalize the chart and add the event lisener.
  The second effect in charge of updating the chart when the `themedSpec` or `tooltipOptions` get updated.
   */
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
        // get the current state of view: result.view.getState()
        const view = result.view;

        if (SyncedCursorChartsContext) {
          view.addEventListener('mouseover', function (event, item) {
            const currentTime =
              item &&
              item.datum &&
              item.datum.datum &&
              item.datum.datum.timestamp;
            if (currentTime) {
              useCursorContext.setCursorX(currentTime);
            }
          });
          /*When the mouse leaves the chart area, set the cursorX to null*/
          view.addEventListener('mouseleave', function (event, item) {
            useCursorContext.setCursorX(null);
          });
        }
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
  }, []);

  useEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;
      let changeset = vega
        .changeset()
        .remove(() => true)
        .insert(themedSpec.data.values);
      // For some reason source_0 is the default dataset name
      view.change('source_0', changeset).run();

      // when the mouse go out, we trigger the event to set cursorX to null
      if (
        !themedSpec.params.find((param) => param.name === 'cursorX').value ||
        !cursorX
      ) {
        view
          .signal(
            'cursorX',
            (themedSpec &&
              themedSpec.data &&
              themedSpec.data.values &&
              themedSpec.data.values[0] &&
              themedSpec.data.values[0].timestamp) ||
              Date.now(),
          )
          .run();
        view.signal('isCursorDisplayed', false).run();
      } else {
        view
          .signal(
            'cursorX',
            themedSpec.params.find((param) => param.name === 'cursorX').value,
          )
          .run();
        view.signal('isCursorDisplayed', true).run();
      }
    }
  }, [
    JSON.stringify(themedSpec),
    JSON.stringify(tooltipOptions),
    vegaInstance,
  ]);
  return (
    // TODO: the style may not be usefully, to be checked
    <div id={id} className="sc-vegachart" style={{ width: `${spec.width}px` }}>
      <VegaTooltipTheme />
    </div>
  );
}

export default VegaChart;
