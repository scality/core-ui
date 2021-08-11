// @flow
import React from 'react';
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
  getLegendLabelfromSeries,
  convertDataBaseValue,
} from './ChartUtil.js';
import { spacing } from '../../style/theme';
import { BasicText } from '../text/Text.component.js';

const LineTemporalChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

/* 
We need to convert the data in the following steps
PrometheusData => Series => VegaData

The data structure of multi-series chart using Vega-lite library
https://vega.github.io/vega-lite/examples/interactive_multi_line_pivot_tooltip.html
*/
export type Series = {
  label: string, // the name of the instance prefix with read, write, in, out
  instance: string, // the name of the instance which is displayed in the legend
  data: { timestamp: number, value: number }[], // timestamp must be milliseconds
}[];

export type LineChartProps = {
  id: string,
  series: Series,
  title: string,
  height: number,
  unitRange?: { threshold: number, label: string }[],
  isLegendHided?: boolean,
  yAxisType?: 'default' | 'percentage' | 'readwrite' | 'inout',
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

export const yAxisPercentage = {
  field: 'value',
  type: 'quantitative',
  // set the empty array for title to make sure different graph align with each other
  axis: { title: ' ', orient: 'right' },
  // the range of the percentage chart should be from 0 to 100
  scale: { domain: [0, 100] },
};

const yAxisDefault = {
  field: 'value',
  type: 'quantitative',
  axis: { title: ' ', orient: 'right' },
};

const yAxisReadWrite = {
  field: 'value',
  type: 'quantitative',
  axis: { title: 'write(+) / read(-)', orient: 'right' },
};

const yAxisInOut = {
  field: 'value',
  type: 'quantitative',
  axis: { title: 'in(+) / out(-)', orient: 'right' },
};

function LineTemporalChart({
  id,
  series,
  title,
  height,
  unitRange,
  isLegendHided = false,
  yAxisType = 'default',
  ...rest
}: LineChartProps) {
  // property validation
  if (!['default', 'percentage', 'readwrite', 'inout'].includes(yAxisType)) {
    console.error(
      `Invalid yAxisType props, expected default, percentage, readwrite, or inout but received ${yAxisType}`,
    );
  }
  if (!height) {
    console.error('Please specify the height of the chart.');
  }
  if (!title) {
    console.error('Please specify the title of the chart.');
  }
  const theme = useTheme();
  const vegaData = convert2VegaData(series);
  const syncedVerticalRuler = {
    mark: 'rule',
    encoding: {
      x: {
        datum: { expr: 'toDate(cursorX)' }, // convert the timestamp in milliseconds to Date object
        //https://vega.github.io/vega-lite/docs/datetime.html
        // {
        //   year: 2019,
        //   month: 'oct',
        //   date: 1,
        //   hours: 4,
        //   minutes: 0,
        //   seconds: 0,
        // },
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

  const maxValue = Math.max.apply(
    Math,
    vegaData.map(function (datum) {
      return datum.value;
    }),
  );
  const xAxis = {
    field: 'timestamp',
    type: 'temporal',
    axis: {
      // Refer to all the available time format: https://github.com/d3/d3-time-format#locale_format
      format: '%d%b %H:%M',
      ticks: true,
      tickCount: 5,
      labelColor: theme.textSecondary,
      labelFlush: 20,
    },
    title: null,
  };

  const color = {
    field: 'label',
    type: 'nominal',
    scale: {
      range: colorRange,
    },
    legend: null,
  };

  /* 
  If it's for readwrite or inout type of chart:
  1. The legend of read and write should be the same for one instance
  2. The color of the line should be the same
  */
  let legends = [];
  let doubleColorRange = [];
  if (yAxisType === 'readwrite' || yAxisType === 'inout') {
    series.forEach((line) => {
      if (!legends.find((legend) => legend === line.instance)) {
        legends.push(line.instance);
      }
    });

    for (let i = 0; i < colorRange.length; i++) {
      if (colorRange[i]) {
        // Adding twice the same color to have the same line color for both read and write
        doubleColorRange.push(colorRange[i]);
        doubleColorRange.push(colorRange[i]);
      }
    }
  }

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
          condition: { value: 0, selection: 'hover' }, //TODO: don't display the tooltip trendline. change the value to 0
          value: 0,
        },
        tooltip: [
          {
            field: 'timestamp',
            type: 'temporal',
            axis: {
              format: '%d%b %H:%M',
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

  const tooltipConfig = getTooltipConfig(
    (() => {
      let res = [];
      series.forEach((serie) => {
        res.push({
          field: `${serie.label.replace('.', '\\.')}`,
          type: 'quantitative',
          title: `${serie.label}`,
          format: '.2f',
          formatType: 'negativeValueFormatter',
        });
      });
      return res;
    })(),
  );

  // define the spec of YAxis
  let yAxisSpec = {};
  switch (yAxisType) {
    case 'default':
      yAxisSpec = yAxisDefault;
      break;
    case 'percentage':
      yAxisSpec = yAxisPercentage;
      break;
    case 'readwrite':
      yAxisSpec = yAxisReadWrite;
      break;
    case 'inout':
      yAxisSpec = yAxisInOut;
      break;
    default:
      yAxisSpec = yAxisDefault;
  }
  const cursorX = useCursorX().cursorX;

  // the specification of the chart
  const spec = {
    data: {
      values: unitRange
        ? convertDataBaseValue(
            vegaData,
            getUnitLabel(unitRange, maxValue).valueBase,
          )
        : vegaData,
    },
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
          y: yAxisSpec,
          color:
            yAxisType === 'readwrite' || yAxisType === 'inout'
              ? colorDouble
              : color,
        },
        layer: [
          { mark: { type: 'line', strokeWidth: 1 } }, // the width of the line should be 1px
          {
            transform: [{ filter: { param: 'hover', empty: false } }],
            mark: 'point',
          },
          yAxisType === 'percentage'
            ? syncedVerticalRulerPercentage
            : syncedVerticalRuler,
        ],
      },
      tooltipConfig,
    ],
    ...rest,
  };

  // the seperation line between read / write
  const seperationLine = {
    mark: 'rule',
    encoding: {
      y: {
        datum: 0,
      },
      color: { value: theme.border, opacity: 1 },
    },
  };

  if (yAxisType === 'readwrite' || yAxisType === 'inout') {
    spec.layer.push(seperationLine);
  }

  return (
    <LineTemporalChartWrapper>
      {unitRange ? (
        <EmphaseText>
          {title} ({getUnitLabel(unitRange, maxValue).unitLabel})
        </EmphaseText>
      ) : (
        <EmphaseText>{title}</EmphaseText>
      )}
      <VegaChart id={id} spec={spec} theme={'custom'}></VegaChart>
      {/* if it's for read/write and in/out graph, we only display the legends for the instances. */}
      <Legends>
        {getLegendLabelfromSeries(series).map((legend, index) => {
          return (
            <>
              <LegendStroke lineColor={colorRange[index]}></LegendStroke>
              <BasicText>{legend}</BasicText>
            </>
          );
        })}
      </Legends>
    </LineTemporalChartWrapper>
  );
}

export default LineTemporalChart;
