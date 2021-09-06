//@flow
import React, { useEffect, useContext, useRef, useLayoutEffect } from 'react';
import * as vega from 'vega';
import vegaEmbed, { Result } from 'vega-embed';
import { ThemeContext, createGlobalStyle } from 'styled-components';
import { getThemePropSelector } from '../../utils';
import { useCursorX, SyncedCursorChartsContext } from './SyncedCursorCharts';
import { Handler } from 'vega-tooltip';

export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
type Props = {
  spec: Object,
  tooltipPosition?: Position,
  theme?: 'light' | 'dark' | 'custom',
  formatTooltip?: (
    value: any,
    valueToHtml: (value: any) => string,
    maxDepth: number,
  ) => string,
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
      color: ${getThemePropSelector('textPrimary')};
      margin-bottom: 10px;
      font-size: 12px;
    }
    table tr td.key {
      color: ${getThemePropSelector('textSecondary')};
    }
  }
`;

function VegaChart(
  { spec, tooltipPosition = BOTTOM, theme = 'custom', formatTooltip }: Props,
  ref?: { current: typeof vega.View | null },
) {
  // $FlowFixMe
  const { cursorX, setCursorX } = useCursorX();
  const themeContext = useContext(ThemeContext);

  // the background color of the view
  const seriesBackgroundColor =
    themeContext && themeContext.brand
      ? themeContext.brand.backgroundLevel1
      : themeContext.backgroundLevel1;

  const brandText =
    themeContext && themeContext.brand
      ? themeContext.brand.textPrimary
      : themeContext.textPrimary;

  const themeConfig = {
    config: {
      background: 'transparent',
      axis: {
        labelColor: brandText,
        titleColor: brandText,
        grid: false,
        domainColor: 'transparent',
      },
      title: {
        color: brandText,
        font: 'Lato',
      },
      view: { stroke: 'transparent', fill: seriesBackgroundColor },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: brandText,
      },
      // the label of max/min
      text: {
        color: brandText,
        font: 'Lato',
      },
    },
  };
  const themedSpec = { ...spec, ...themeConfig };

  const vegaInstance = useRef<Result>();
  const vegaDOMInstance = useRef<HTMLDivElement | null>(null);

  let tooltipOptions = { theme: theme, formatTooltip: formatTooltip };
  if (tooltipPosition === TOP) {
    tooltipOptions = {
      theme: theme,
      offsetX: -85,
      offsetY: -140,
      formatTooltip: formatTooltip,
    };
  }

  const tooltipHandler = new Handler(tooltipOptions);
  /* 
  useEffect() and useEffectLayout():
  The first effect will only render once, to initalize the chart and add the event lisener.

  The second useEffectLayout is in charge of updating the chart when the `themedSpec` or `tooltipOptions` get updated.
  Note it's important to useEffectLayout for the performance. 
   */
  useEffect(() => {
    let isMounted = true;
    // embed(el, spec[, opt]) the el can be a DOM element or CSS selector. https://github.com/vega/vega-embed
    vegaDOMInstance &&
      vegaDOMInstance.current &&
      vegaEmbed(vegaDOMInstance.current, themedSpec, {
        renderer: 'svg',
        // Override the DEFAULT_OPTIONS https://github.com/vega/vega-tooltip/blob/master/src/defaults.ts
        tooltip: tooltipHandler.call,
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
          if (ref) {
            ref.current = view;
          }

          if (SyncedCursorChartsContext && view) {
            view.addEventListener('mouseover', function (event, item) {
              const currentTime =
                item &&
                item.datum &&
                item.datum.datum &&
                item.datum.datum.timestamp;
              if (currentTime) {
                setCursorX(currentTime);
              }
            });
            /*When the mouse leaves the chart area, set the cursorX to null*/
            view.addEventListener('mouseleave', function (event, item) {
              setCursorX(0);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegaDOMInstance]);

  useLayoutEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;
      view.tooltip(tooltipHandler.call);
    }
  }, [tooltipHandler, vegaInstance]);

  useLayoutEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;
      let changeset = vega
        .changeset()
        .remove(() => true)
        .insert(themedSpec.data.values); //only the data.values changes trigger the graph's repaint
      // For some reason source_0 is the default dataset name
      view.change('source_0', changeset).run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line
    JSON.stringify(themedSpec.data.values),
    vegaInstance,
  ]);

  useLayoutEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line
    JSON.stringify(themedSpec),
    vegaInstance,
  ]);
  return (
    <div className="sc-vegachart" ref={vegaDOMInstance}>
      <VegaTooltipTheme />
    </div>
  );
}
// $FlowFixMe
export default React.forwardRef(VegaChart);
