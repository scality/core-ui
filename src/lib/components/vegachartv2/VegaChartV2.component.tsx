// @ts-nocheck
import React, { useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import * as vega from 'vega';
import vegaEmbed, { Result } from 'vega-embed';
import { createGlobalStyle, css, useTheme } from 'styled-components';
import { useCursorX, SyncedCursorChartsContext } from './SyncedCursorCharts';
import { TooltipHandlerWithPaint } from '../linetemporalchart/tooltip';
export const TOP = 'top';
export const BOTTOM = 'bottom';
type Position = typeof TOP | typeof BOTTOM;
type Props = {
  spec: Record<string, any>;
  tooltipPosition?: Position;
  theme?: 'light' | 'dark' | 'custom';
  id?: string;
  onHover?: (dataPoint: any) => void;
  formatTooltip?: (
    value: any,
    valueToHtml: (value: any) => string,
    maxDepth: number,
  ) => string;
};

/* How to theme tooltip:
https://github.com/vega/vega-tooltip/blob/master/docs/customizing_your_tooltip.md
*/
const VegaTooltipTheme = createGlobalStyle`
  #vg-tooltip-element.vg-tooltip.custom-theme {
    ${(props) => {
      const { theme } = props;
      return css`
        padding: 8px;
        position: fixed;
        z-index: 1000;
        width: calc(100vw / 6);
        font-family: 'Lato';
        font-size: 12px;
        border-radius: 3px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        color: ${theme.textPrimary};
        background-color: ${theme.backgroundLevel1};
        border: 1px solid ${theme.border};
        // customize the title
        h2 {
          color: ${theme.textPrimary};
          margin-bottom: 10px;
          font-size: 12px;
        }
        table {
          width: 100%;
        }
        table tr td.key {
          color: ${theme.textSecondary};
        }
      `;
    }}
    
  }
`;

function VegaChartInternal(
  {
    spec,
    tooltipPosition = BOTTOM,
    theme = 'custom',
    formatTooltip,
    onHover,
  }: Props,
  ref?: {
    current: typeof vega.View | null;
  },
) {
  // $FlowFixMe
  const { cursorX, setCursorX } = useCursorX();
  const currentTheme = useTheme();
  const themeConfig = {
    config: {
      background: 'transparent',
      axis: {
        labelColor: currentTheme.textSecondary,
        titleColor: currentTheme.textSecondary,
        grid: false,
        domainColor: 'transparent',
      },
      title: {
        color: currentTheme.textPrimary,
        font: 'Lato',
      },
      view: {
        stroke: currentTheme.border,
        strokeWidth: 0.5,
        fill: currentTheme.backgroundLevel1,
      },
      // the headers provide a title and labels for faceted plots.
      header: {
        labelColor: currentTheme.textPrimary,
      },
      // the label of max/min
      text: {
        color: currentTheme.textPrimary,
        font: 'Lato',
      },
      legend: {
        labelColor: currentTheme.textSecondary,
      },
    },
  };
  const themedSpec = { ...spec, ...themeConfig };
  const vegaInstance = useRef<Result>();
  const vegaDOMInstance = useRef<HTMLDivElement | null>(null);
  let tooltipOptions = {
    theme: theme,
    formatTooltip: formatTooltip,
  };

  if (tooltipPosition === TOP) {
    tooltipOptions = {
      theme: theme,
      offsetX: -85,
      offsetY: -140,
      formatTooltip: formatTooltip,
    };
  }

  const tooltipHandler = useMemo(
    () => new TooltipHandlerWithPaint(tooltipOptions, onHover),
    [theme],
  );

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
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegaDOMInstance, currentTheme]);

  useLayoutEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;
      tooltipHandler.options.formatTooltip = formatTooltip;
      tooltipHandler.onHover = onHover;
      view.tooltip(tooltipHandler.call).run();
      tooltipHandler.paint(); // to repaint the tooltip
    }
  }, [formatTooltip, vegaInstance, onHover]);

  useLayoutEffect(() => {
    if (vegaInstance.current) {
      const view = vegaInstance.current.view;
      let changeset = vega
        .changeset()
        .remove(() => true)
        .insert(themedSpec.data.values);
      //only the data.values changes trigger the graph's repaint
      // For some reason source_0 is the default dataset name
      view
        .change('source_0', changeset)
        .runAsync()
        .then(() => {
          // call resize() after the data is loaded to make sure the width is set correctly.
          view.resize().runAsync();
        });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line
    JSON.stringify(themedSpec.data.values),
    vegaInstance,
  ]);

  useLayoutEffect(() => {
    if (vegaInstance.current && themedSpec.params) {
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line
    JSON.stringify(themedSpec),
    vegaInstance,
  ]);
  return (
    <div
      className="sc-vegachart"
      ref={vegaDOMInstance}
      style={{
        width: '100%',
      }}
    >
      <VegaTooltipTheme />
    </div>
  );
} // @ts-expect-error

export const VegaChart = React.forwardRef(VegaChartInternal);
