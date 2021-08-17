// @flow
import React, { useMemo } from 'react';
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
} from './ChartUtil.js';
import { useMetricsTimeSpan } from './MetricTimespanProvider';
import { spacing } from '../../style/theme';
import { BasicText } from '../text/Text.component.js';
import Loader from '../loader/Loader.component';

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

const LegendStroke = styled.span`
  width: ${spacing.sp8}; //8px
  height: ${spacing.sp4}; //4px
  background-color: ${(props) => props.lineColor};
  margin: 0 ${spacing.sp8} 0 ${spacing.sp16};
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
export type Series = {
  resource: string, // the name of the resource
  data: [number, string | null][], // the original data format from prometheus
  getTooltipLabel: (metricPrefix?: string, resource?: string) => string, // it's mandatory to display tooltip label in the tooltip
  getLegendLabel?: (metricPrefix?: string, resource?: string) => string, // get the legend label for each of the series
  color?: string, // optional color field to specify the color of the line
  metricPrefix?: string, // the name of the metric prefix with read, write, in, out
}[];

export type LineChartProps = {
  series: Series,
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

  const theme = useTheme();
  const { sampleFrequency, metricsTimeSpan } = useMetricsTimeSpan();
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
          metricsTimeSpan,
          sampleFrequency,
        ),
      };
    });
  }, [series, startingTimeStamp, metricsTimeSpan, sampleFrequency]);

  // 2. Change the data structure to a flat array which is required by Vega-lite
  const vegaData = convert2VegaData(addedMissingDataPointSeries);

  // 3. Search for the biggest value in order to define the unit for the chart, if the unit is needed.
  const maxValue = Math.max.apply(
    Math,
    vegaData.map(function (datum: {
      timestamp: number,
      label: string,
      value: number | null,
    }): number {
      if (datum.value) {
        return datum.value;
      }
      return 0;
    }),
  );

  // 4. Recompute the value base on the unit
  const valueBase = unitRange ? getUnitLabel(unitRange, maxValue).valueBase : 1;

  const vegaDataWithUnit = unitRange
    ? convertDataBaseValue(vegaData, valueBase)
    : vegaData;

  // 5. Convert the values of metric prefix `read` and `out` to negative.
  const vegaSpecValues = vegaDataWithUnit.map(
    (data: {
      timestamp: number,
      label: string, // same as the tooltip label
      value: number | null, // the value can be null, in order to not display the line during the downtime of the platform
      isNegativeValue: boolean,
    }) => {
      if (data.isNegativeValue && data.value) {
        return { ...data, value: 0 - data.value };
      } else return { ...data };
    },
  );
  //##### Data Transformation End

  //for the usecase of read/write graph, we use the same legend for the same resource
  const legendLabels = useMemo(() => {
    const uniqueLabel = [];
    series.map((line) => {
      if (line.getLegendLabel) {
        const legend = line.getLegendLabel(line.metricPrefix, line.resource);
        if (!uniqueLabel.find((uLabel) => uLabel === legend)) {
          uniqueLabel.push(legend);
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

  const customizedColorRange = useMemo(() => {
    const customizedColors = [];
    series.map((line) => {
      if (line.color) {
        return customizedColors.push(line.color);
      }
    });
    return customizedColors;
  }, [series]);

  // for the symmetrical graph, we want to have the same color for the series from the same resource
  const doubleColorRange = [];
  if (yAxisType === 'symmetrical') {
    for (let i = 0; i < colorRange.length; i++) {
      if (colorRange[i]) {
        doubleColorRange.push(colorRange[i]);
        doubleColorRange.push(colorRange[i]);
      }
    }
  }

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
      y: { datum: -Math.ceil(maxValue / valueBase) },
      y2: { datum: Math.ceil(maxValue / valueBase) },
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
    },
    title: null,
  };

  const yAxis = {
    field: 'value',
    type: 'quantitative',
    axis: {
      title: yAxisTitle ? yAxisTitle : ' ',
      orient: 'right',
      translate: -5, // translate both the x and y coordinates by 5 pixel
      tickOffset: 5, // shift back the y translate to make sure the tick align with the 0 seperation line
      labelPadding: 6,
      labelFlush: true,
    },
    scale:
      yAxisType === 'symmetrical'
        ? {
            domain: [
              -Math.ceil(maxValue / valueBase),
              Math.ceil(maxValue / valueBase),
            ],
          }
        : yAxisType === 'percentage'
        ? { domain: [0, 100] }
        : undefined,
  };

  const color = {
    field: 'label',
    type: 'nominal',
    scale: {
      //if there is no customized color range, we will use the default the line colors
      range: customizedColorRange.length ? customizedColorRange : colorRange,
    },
    legend: null,
  };

  const colorDouble = {
    field: 'label',
    type: 'nominal',
    scale: {
      range: doubleColorRange,
    },
    // handle the legends by our own, because of the limitation of vega-lite
    // for the read/write, in/out graph, we only want to display the instance name in the legend. so the legends is not one-to-one mapping with lines
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
            title: 'Date',
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
          color: yAxisType === 'symmetrical' ? colorDouble : color,
        },
        layer: [
          { mark: { type: 'line', strokeWidth: 1 } }, // the width of the line should be 1px
          {
            transform: [{ filter: { param: 'hover', empty: false } }],
            mark: 'point',
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
    spec.layer.push(seperationLine);
  }

  const seriesNames = series
    .map(
      (serie) =>
        title + serie.resource + (serie.metricPrefix ? serie.metricPrefix : ''),
    )
    .join(',');

  return (
    <LineTemporalChartWrapper>
      <ChartHeader>
        {unitRange ? (
          <EmphaseText>
            {title} ({getUnitLabel(unitRange, maxValue).unitLabel})
          </EmphaseText>
        ) : yAxisType === 'percentage' ? (
          <EmphaseText>{title} (%)</EmphaseText>
        ) : (
          // for the chart doesn't have title
          <EmphaseText>{title}</EmphaseText>
        )}
        {isLoading && <Loader style={{ paddingLeft: `${spacing.sp4}` }} />}
      </ChartHeader>
      {/* When the chart is in loading status, we display the chart skeleton */}
      <VegaChart key={seriesNames} spec={spec} theme={'custom'}></VegaChart>
      {/* if it's for read/write and in/out graph, we only display the legends for the instances. */}
      {!isLegendHided && (
        <Legends>
          {legendLabels.map((legend, index) => {
            return (
              <>
                <LegendStroke lineColor={colorRange[index]}></LegendStroke>
                <BasicText>{legend}</BasicText>
              </>
            );
          })}
        </Legends>
      )}
    </LineTemporalChartWrapper>
  );
}

export default LineTemporalChart;
