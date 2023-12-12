import { VegaChart } from '../vegachart/VegaChart.component';
import { yellowOrange, green } from '../../style/theme';
type Props = {
  id: string;
  title?: string;
  width?: number;
  height?: number;
  data: Array<Record<string, any>>;
  xAxis: Record<string, any>;
  yAxis: Record<string, any>;
  row: Record<string, any>;
  lineConfig?: Record<string, any>;
  sparkLineColor?: string;
  upTrendColor?: string;
  bottomTrendColor?: string;
};

function SparkLine({
  id,
  title,
  width = 300,
  height = 80,
  data,
  xAxis,
  yAxis,
  row,
  lineConfig,
  sparkLineColor,
  upTrendColor = yellowOrange,
  bottomTrendColor = green,
}: Props) {
  const spec = {
    title: {
      text: title,
    },
    data: {
      values: data,
    },
    facet: {
      row,
    },
    spec: {
      width,
      height,
      layer: [
        // display the sparkline chart
        {
          mark: {
            type: 'line',
            ...lineConfig,
          },
          encoding: {
            x: xAxis,
            y: yAxis,
            color: {
              value: sparkLineColor,
            },
          },
        }, // display the label to specify the max/min data
        {
          mark: {
            type: 'text',
            style: 'labelMin',
            align: 'bottom',
            dy: height / 2,
            dx: width / 2 + 10,
          },
          encoding: {
            text: {
              aggregate: 'min',
              field: 'y',
              type: 'quantitative',
            },
          },
        },
        {
          mark: {
            type: 'text',
            style: 'labelMax',
            align: 'top',
            dy: -(height / 2),
            dx: width / 2 + 10,
          },
          encoding: {
            text: {
              aggregate: 'max',
              field: 'y',
              type: 'quantitative',
            },
          },
        }, // display the up and bottom trend line
        {
          mark: {
            type: 'rule',
            style: 'ruleMaxEnd',
            color: upTrendColor,
          },
          encoding: {
            y: {
              aggregate: 'max',
              field: 'y',
              type: 'quantitative',
            },
            x: {
              value: width - 15,
            },
            x2: {
              value: width,
            },
          },
        },
        {
          mark: {
            type: 'rule',
            style: 'ruleMaxStart',
            color: upTrendColor,
            opacity: 0.1,
          },
          encoding: {
            y: {
              aggregate: 'max',
              field: 'y',
              type: 'quantitative',
            },
            x: {
              value: 0,
            },
            x2: {
              value: width - 15,
            },
          },
        },
        {
          mark: {
            type: 'rule',
            style: 'ruleMinEnd',
            color: bottomTrendColor,
          },
          encoding: {
            y: {
              value: height,
            },
            x: {
              value: width - 15,
            },
            x2: {
              value: width,
            },
          },
        },
        {
          mark: {
            type: 'rule',
            style: 'ruleMinStart',
            color: bottomTrendColor,
            opacity: 0.1,
          },
          encoding: {
            y: {
              value: height,
            },
            x: {
              value: 0,
            },
            x2: {
              value: width - 15,
            },
          },
        },
      ],
    },
  };
  return <VegaChart className="sc-sparkline" id={id} spec={spec}></VegaChart>;
}

export const Sparkline = SparkLine;
