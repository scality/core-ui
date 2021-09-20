// @flow
import React, { useMemo, useRef, useLayoutEffect, Fragment } from 'react';
import styled, { useTheme } from 'styled-components';
import { lighten, darken } from 'polished';
import { expressionFunction } from 'vega';
import {
  lineColor1,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor5,
  lineColor6,
  lineColor7,
  lineColor8,
} from '../../style/theme.js';
import VegaChart from '../vegachartv2/VegaChartV2.component.js';
import { useCursorX } from '../vegachartv2/SyncedCursorCharts';
import { EmphaseText } from '../text/Text.component.js';
import {
  convert2VegaData,
  getUnitLabel,
  convertDataBaseValue,
  addMissingDataPoint,
  getRelativeValue,
  getColorDomains,
} from './ChartUtil.js';
import { useMetricsTimeSpan } from './MetricTimespanProvider';
import { spacing } from '../../style/theme';
import { SmallerText } from '../text/Text.component.js';
import Loader from '../loader/Loader.component';
import { formatValue } from './tooltip/index.js';

// some predefined values
export const YAXIS_TITLE_READ_WRITE = 'write(+) / read(-)';
export const YAXIS_TITLE_IN_OUT = 'in(+) / out(-)';

export const UNIT_RANGE_BS = [
  { threshold: 0, label: 'B/s' },
  { threshold: 1024, label: 'KiB/s' },
  { threshold: 1024 * 1024, label: 'MiB/s' },
  { threshold: 1024 * 1024 * 1024, label: 'GiB/s' },
  { threshold: 1024 * 1024 * 1024 * 1024, label: 'TiB/s' },
];

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // to make sure the header, the graph itself and legend are aligned
`;

const Legends = styled.div`
  display: flex;
  align-items: center;
`;

const LegendStroke = styled.div`
  margin: 0 ${spacing.sp8} 0 ${spacing.sp16};
  height: ${spacing.sp2};
  background: ${(props) =>
    props.isLineDashed
      ? `repeating-linear-gradient(to right,${props.lineColor} 0,${props.lineColor} ${spacing.sp1},transparent ${spacing.sp1},transparent ${spacing.sp2})`
      : props.lineColor};
  width: ${spacing.sp8};
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
`;

/* 
We need to convert the data from raw prometheus data in the following steps:
prometheusData => series => addMissingDataPoint(series.data, startTimeStamp, sampleDuration, sampleFrequency) => VegaData

The data structure of multi-series chart using Vega-lite library
https://vega.github.io/vega-lite/examples/interactive_multi_line_pivot_tooltip.html
*/
export type Serie = {
  resource: string, // the name of the resource
  data: [number, string | null][], // the original data format from prometheus
  getTooltipLabel: (metricPrefix?: string, resource?: string) => string, // it's mandatory to display tooltip label in the tooltip
  getLegendLabel?: (metricPrefix?: string, resource?: string) => string, // get the legend label for each of the series
  color?: string, // optional color field to specify the color of the line
  metricPrefix?: string, // the name of the metric prefix with read, write, in, out
  isLineDashed?: boolean, // to specify if the line is dash
};

export type LineChartProps = {
  series: Serie[],
  title: string,
  height: number,
  startingTimeStamp: number, // pass to addMissingDataPoint()
  unitRange?: { threshold: number, label: string }[],
  isLoading?: boolean, // if to display a loader next to the title
  isLegendHided?: boolean,
  yAxisType?: 'default' | 'percentage' | 'symmetrical',
  yAxisTitle?: string,
};

// Custom formatter to display negative value as an absolute value in read/write, in/out chart
expressionFunction('negativeValueFormatter', function (datum) {
  return Math.abs(datum).toFixed(2);
});

// We use 8 main color from the palette and decline them (lighter/ darker) when we have more than 8 datasets
const colorRange = [
  lineColor1,
  lineColor2,
  lineColor3,
  lineColor4,
  lineColor5,
  lineColor6,
  lineColor7,
  lineColor8,
  lighten(0.3, lineColor1),
  lighten(0.3, lineColor2),
  lighten(0.3, lineColor3),
  lighten(0.3, lineColor4),
  lighten(0.3, lineColor5),
  lighten(0.3, lineColor6),
  lighten(0.3, lineColor7),
  lighten(0.3, lineColor8),
  darken(0.2, lineColor1),
  darken(0.2, lineColor2),
  darken(0.2, lineColor3),
  darken(0.2, lineColor4),
  darken(0.3, lineColor5),
  darken(0.3, lineColor6),
  darken(0.3, lineColor7),
  darken(0.3, lineColor8),
];

// Note: we need to make sure the start time and end timefor the prometheus query between the series are the same.
function LineTemporalChart({
  series,
  title,
  height,
  startingTimeStamp,
  unitRange,
  isLoading = false,
  isLegendHided = false,
  yAxisType = 'default',
  yAxisTitle,
  ...rest
}: LineChartProps) {
  // property validation
  if (!['default', 'percentage', 'symmetrical'].includes(yAxisType)) {
    console.error(
      `Invalid yAxisType props, expected default, percentage or symmetrical but received ${yAxisType}`,
    );
  }
  if (!height) {
    console.error('Please specify the height of the chart.');
  }
  if (!title) {
    console.error('Please specify the title of the chart.');
  }
  // we have to make sure that when prop unitRange exists, there is at least one item defined.
  if (unitRange) {
    if (unitRange.length === 0) {
      console.error('Please provide at least one entry in unitRange.');
    }
  }
  const vegaViewRef = useRef();
  const theme = useTheme();
  const { frequency, duration } = useMetricsTimeSpan();
  //##### Data Transformation Start

  /**
   * 1. Add missing data points
   * During the downtime of the platform, there is no data returned by Prometheus API.
   * Hence, we can see a line link the last data point before the downtime and the first data point once the platform restarts.
   * However, this is not what we expect to see.
   * So we need to manually add the missing data points with the value `null` to make sure there is nothing displayed on the graph during the downtime.
   */
  const addedMissingDataPointSeries = useMemo(() => {
    return series.map((line) => {
      return {
        ...line,
        data: addMissingDataPoint(
          line.data,
          startingTimeStamp,
          duration,
          frequency,
        ),
      };
    });
  }, [series, startingTimeStamp, duration, frequency]);

  // 2. Change the data structure to a flat array which is required by Vega-lite
  const vegaData = useMemo(() => {
    return convert2VegaData(addedMissingDataPointSeries);
  }, [addedMissingDataPointSeries]);

  // 3. Search for the biggest value in order to define the unit for the chart, if the unit is needed.
  const maxValue = useMemo(() => {
    return Math.max.apply(
      Math,
      vegaData.map(function (datum: {
        timestamp: number,
        label: string,
        value: number | 'NAN',
      }): number {
        if (datum.value && typeof datum.value === 'number') {
          return datum.value;
        }
        return 0;
      }),
    );
  }, [vegaData]);

  // 4. Recompute the value base on the unit
  const valueBase = useMemo(() => {
    return unitRange ? getUnitLabel(unitRange, maxValue).valueBase : 1;
  }, [maxValue, unitRange]);

  const vegaDataWithUnit = unitRange
    ? convertDataBaseValue(vegaData, valueBase)
    : vegaData;

  // 5. Convert the values of metric prefix `read` and `out` to negative.
  const vegaSpecValues = vegaDataWithUnit.map(
    (data: {
      timestamp: number,
      label: string, // same as the tooltip label
      value: number | 'NAN', // manually set it to a string. It's for the tooltip to display a hyphen for the data that don't exist
      isNegativeValue: boolean,
    }) => {
      if (
        data.isNegativeValue &&
        data.value &&
        typeof data.value === 'number'
      ) {
        return { ...data, value: 0 - data.value };
      } else return { ...data };
    },
  );
  //##### Data Transformation End

  const customizedColorRange = useMemo(() => {
    const customizedColors = [];
    series.map((line) => {
      if (line.color) {
        return customizedColors.push(line.color);
      }
    });
    return customizedColors;
  }, [series]);

  // for the series with the same resource, the color of legend and tooltip should be the same.
  const legendLabels = useMemo(() => {
    const uniqueLabel = [];
    series.forEach((serie, index) => {
      if (serie.getLegendLabel) {
        const legend = serie.getLegendLabel(serie.metricPrefix, serie.resource);
        if (!uniqueLabel.find((uLabel) => uLabel === legend)) {
          const serieIndex =
            yAxisType === 'symmetrical' && !customizedColorRange.length
              // $FlowFixMe
              ? [...new Set(series.map((serie) => serie.resource))].findIndex(
                  (serieResource) => serieResource === serie.resource,
                )
              : index;
          uniqueLabel.push({ legend, serie, serieIndex });
        }
      }
    });
    return uniqueLabel;
  }, [series]);

  const tooltipLabels = useMemo(
    () =>
      series.map((line) => {
        return line.getTooltipLabel(line.metricPrefix, line.resource);
      }),
    [series],
  );

  const syncedVerticalRuler = {
    mark: 'rule',
    encoding: {
      x: {
        datum: { expr: 'toDate(cursorX)' }, // convert the timestamp in milliseconds to Date object
        //https://vega.github.io/vega-lite/docs/datetime.html
      },
      color: { value: theme.highlight, opacity: 0.3 },
      /* 
      According to the design, the vertical ruler should be hided when the mouse points out of the graph area. 
      We can use param `isCursorDisplayed` to control the size of the vertical line.
      */
      size: {
        value: 0,
        condition: { test: 'isCursorDisplayed', value: 1 },
      },
    },
  };
  const syncedVerticalRulerPercentage = {
    mark: 'rule',
    encoding: {
      x: {
        datum: { expr: 'toDate(cursorX)' }, // convert the timestamp to Date object
      },
      // We draw the line manually for the percentage chart to solve the issue that the synced vertical line can
      // only reach the max value one the line.
      y: { datum: 0 },
      y2: { datum: 100 },
      color: { value: theme.highlight, opacity: 0.3 },
      /* 
      According to the design, the vertical ruler should be hided when the mouse points out of the graph area. 
      We can use param `isCursorDisplayed` to control the size of the vertical line.
      */
      size: {
        value: 0,
        condition: { test: 'isCursorDisplayed', value: 1 },
      },
    },
  };

  const syncedVerticalRulerSymmetrical = {
    mark: 'rule',
    encoding: {
      x: {
        datum: { expr: 'toDate(cursorX)' }, // convert the timestamp to Date object
      },
      y: { expr: '-yAxisMaxValue' },
      y2: { expr: 'yAxisMaxValue' },
      color: { value: theme.highlight, opacity: 0.3 },
      /* 
      According to the design, the vertical ruler should be hided when the mouse points out of the graph area. 
      We can use param `isCursorDisplayed` to control the size of the vertical line.
      */
      size: {
        value: 0,
        condition: { test: 'isCursorDisplayed', value: 1 },
      },
    },
  };

  const xAxis = {
    field: 'timestamp',
    type: 'temporal',
    axis: {
      // Refer to all the available time format: https://github.com/d3/d3-time-format#locale_format
      format: '%d %b %H:%M',
      ticks: true,
      tickCount: 5,
      labelColor: theme.textSecondary,
      labelFlush: 20,
      // TODO: labelFontSize is not responsiveness
      labelSeparation: 12,
      // The minimum separation that must be between label bounding boxes for them to be considered non-overlapping (default 0). This property is ignored if labelOverlap resolution is not enabled.
    },
    title: null,
  };

  const yAxis = useMemo(() => {
    return {
      field: 'value',
      type: 'quantitative',
      axis: {
        title: yAxisTitle ? yAxisTitle : ' ',
        orient: 'right',
        translate: -5, // translate both the x and y coordinates by 5 pixel
        tickOffset: 5, // shift back the y translate to make sure the tick align with the 0 seperation line
        labelBaseline: 'middle',
        labelPadding: 6,
        labelFlush: true,
      },
      scale:
        yAxisType === 'symmetrical'
          ? { domain: [{ expr: '-yAxisMaxValue' }, { expr: 'yAxisMaxValue' }] }
          : yAxisType === 'percentage'
          ? { domain: [0, 100] }
          : undefined,
    };
  }, [yAxisTitle, yAxisType]);

  const color = {
    field:
      yAxisType === 'symmetrical' && !customizedColorRange.length
        ? 'resource'
        : 'label',
    type: 'nominal',
    scale: {
      domain:
        yAxisType === 'symmetrical' && !customizedColorRange.length
          ? series.map((serie) => serie.resource)
          : getColorDomains(series), // the order of the domain should be the same as the order of colorRange, otherwise the colors will be assigned to the line base on the alphabetical order: ;
      range: customizedColorRange.length ? customizedColorRange : colorRange, //if there is no customized color range, we will use the default the line color
    },
    legend: null,
  };

  // In order to add the tooltip we refered this example
  // https://vega.github.io/vega-lite/examples/interactive_multi_line_pivot_tooltip.html
  const getTooltipConfig = (
    fields: { field: string, type: string, title: string, format: string }[],
  ) => {
    const tooltipConfigBase = {
      // The pivot transform maps unique values from a field to new aggregated fields (columns) in the output stream.
      // https://vega.github.io/vega-lite/docs/pivot.html
      transform: [{ pivot: 'label', value: 'value', groupby: ['timestamp'] }],
      mark: 'rule',
      encoding: {
        x: xAxis,
        opacity: {
          // to be check if we can remove this channel, since we don't need to have a rule next to the tooltip
          condition: { value: 0, selection: 'hover' },
          value: 0,
        },
        tooltip: [
          {
            field: 'timestamp',
            type: 'temporal',
            axis: {
              format: '%d %b %H:%M',
              ticks: true,
              tickCount: 4,
              labelAngle: -50,
              labelColor: '#B5B5B5',
            },
            title: 'title',
          },
        ],
      },
      selection: {
        hover: {
          type: 'single',
          fields: ['timestamp'],
          nearest: true,
          on: 'mouseover',
          empty: 'none',
          clear: 'mouseout',
        },
      },
    };
    if (fields.length) {
      const newFields = [...tooltipConfigBase.encoding.tooltip, ...fields];
      const newConfig = Object.assign({}, tooltipConfigBase);
      newConfig.encoding.tooltip = newFields;
      return newConfig;
    }
    return tooltipConfigBase;
  };

  const tooltipConfig = useMemo(
    () =>
      getTooltipConfig(
        (() => {
          const res = [];
          tooltipLabels.forEach((label) => {
            res.push({
              field: `${label.replace('.', '\\.')}`,
              type: 'quantitative',
              title: `${label}`,
              format: '.2f',
              formatType: 'negativeValueFormatter',
            });
          });
          return res;
        })(),
      ),
    [tooltipLabels],
  );

  // we need to retrieve the vega view in order to update the signal
  useLayoutEffect(() => {
    if (vegaViewRef.current && yAxisType === 'symmetrical') {
      vegaViewRef.current
        .signal(
          'yAxisMaxValue',
          Math.ceil(getRelativeValue(maxValue, valueBase)),
        )
        .run();
    }
  }, [maxValue, valueBase, vegaViewRef, yAxisType]);
  // $FlowFixMe
  const cursorX = useCursorX().cursorX;
  // the specification of the Vega-lite chart
  const spec = {
    data: { values: vegaSpecValues },
    height,
    width: 'container', // set responsive width
    mark: { type: 'line', tooltip: true },
    // Add two params to control the display of the vertical ruler.
    params: [
      {
        name: 'cursorX',
        value: cursorX || Date.now(), // the value of signal can't be null
      },
      {
        name: 'isCursorDisplayed',
        value: false,
      },
    ],
    layer: [
      {
        encoding: {
          x: xAxis,
          y: yAxis,
          strokeDash: {
            field: 'isDashed',
            type: 'nominal',
            legend: null,
            condition: {
              test: 'datum.isDashed === true',
              value: [4, 2], // Change the value here if the dash is not visible. https://vega.github.io/vega-lite/docs/mark.html#stroke
            },
          },
          color: color,
          opacity: {
            condition: {
              test: 'datum.isDashed === true', // for the dashed line, set the opacity to 0.5
              value: 0.6,
            },
            value: 1,
          },
        },
        layer: [
          { mark: { type: 'line', strokeWidth: 1 } }, // the width of the line should be 1px
          {
            mark: 'point',
            encoding: {
              size: {
                value: 0,
                condition: { selection: 'hover', value: 10 },
              },
            },
          },
          yAxisType === 'percentage'
            ? {
                // for percentage chart we need to manually draw the line from 0-100
                ...syncedVerticalRuler,
                encoding: {
                  ...syncedVerticalRuler.encoding,
                  ...syncedVerticalRulerPercentage.encoding,
                },
              }
            : yAxisType === 'symmetrical'
            ? {
                // for symmetrical chart we manually draw the line from minValue to maxValue
                ...syncedVerticalRuler,
                encoding: {
                  ...syncedVerticalRuler.encoding,
                  ...syncedVerticalRulerSymmetrical.encoding,
                },
              }
            : syncedVerticalRuler,
        ],
      },
      tooltipConfig,
    ],
    ...rest,
  };

  // the seperation line for symmetrical charts
  const seperationLine = {
    mark: 'rule',
    encoding: {
      y: {
        datum: 0,
      },
      color: { value: theme.border, opacity: 1 },
    },
  };

  if (yAxisType === 'symmetrical') {
    spec.layer.unshift(seperationLine);
    spec.params.push({
      name: 'yAxisMaxValue',
      value: Math.ceil(getRelativeValue(maxValue, valueBase)),
    });
  }

  const seriesNames = series
    .map(
      (serie) =>
        title + serie.resource + (serie.metricPrefix ? serie.metricPrefix : ''),
    )
    .join(',');

  const unitLabel = unitRange
    ? getUnitLabel(unitRange, maxValue).unitLabel
    : yAxisType === 'percentage'
    ? '%'
    : null;

  return (
    <LineTemporalChartWrapper>
      <ChartHeader>
        {unitLabel ? (
          <EmphaseText>
            {title} ({unitLabel})
          </EmphaseText>
        ) : (
          // for the chart doesn't have title
          <EmphaseText>{title}</EmphaseText>
        )}
        {isLoading && <Loader style={{ paddingLeft: `${spacing.sp4}` }} />}
      </ChartHeader>
      {/* When the chart is in loading status, we display the chart skeleton */}
      <VegaChart
        key={seriesNames}
        spec={spec}
        theme={'custom'}
        ref={vegaViewRef}
        formatTooltip={useMemo(
          () =>
            formatValue(
              series,
              customizedColorRange,
              colorRange,
              unitLabel,
              yAxisType,
            ),
          [unitLabel, seriesNames],
        )}
      ></VegaChart>
      {/* if it's for read/write and in/out graph, we only display the legends for the instances. */}
      {!isLegendHided && (
        <Legends>
          {legendLabels.map(({ legend, serie, serieIndex }, index) => {
            return (
              <Fragment key={`${title}-${legend}-${index}`}>
                <LegendStroke
                  lineColor={
                    customizedColorRange.length
                      ? customizedColorRange[serieIndex]
                      : colorRange[serieIndex]
                  }
                  isLineDashed={serie.isLineDashed}
                ></LegendStroke>
                <SmallerText>{legend}</SmallerText>
              </Fragment>
            );
          })}
        </Legends>
      )}
    </LineTemporalChartWrapper>
  );
}

export default LineTemporalChart;
