import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  LineTimeSerieChart,
  Serie,
  ChartLegendWrapper,
  ChartLegend,
  useChartId,
  useChartLegend,
} from '../src/lib/components/charts';
import { lineTimeSeriesColorRange } from '../src/lib/style/theme';
import { useEffect } from 'react';
import {
  SAMPLE_DURATION_LAST_ONE_HOUR,
  SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  SAMPLE_FREQUENCY_LAST_ONE_HOUR,
  SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
} from '../src/lib/components/constants';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';
import { useTheme } from 'styled-components';

const ChartWithProviders = (props) => {
  return (
    <ChartLegendWrapper
      colorSet={{
        'ip-10-160-122-207.eu-north-1.compute.internal':
          lineTimeSeriesColorRange[0],
      }}
    >
      <LineTimeSerieChart {...props} />
      <ChartLegend shape="line" />
    </ChartLegendWrapper>
  );
};

const ChartWithProviders2 = (props) => {
  return (
    <ChartLegendWrapper
      colorSet={{
        'ip-10-160-122-207.eu-north-1.compute.internal':
          lineTimeSeriesColorRange[0],
        'ip-10-160-122-207.eu-north-2.compute.internal':
          lineTimeSeriesColorRange[1],
      }}
    >
      <LineTimeSerieChart {...props} />
      <ChartLegend shape="line" direction="vertical" />
    </ChartLegendWrapper>
  );
};
const meta: Meta<typeof LineTimeSerieChart> = {
  title: 'Components/Data Display/Charts/LineTimeSerieChart',
  component: ChartWithProviders,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    series: { control: 'object' },
    title: { control: 'text' },
    height: { control: 'number' },
    startingTimeStamp: { control: 'number' },
    unitRange: { control: 'object' },
    isLoading: { control: 'boolean' },
    yAxisType: {
      control: 'select',
      options: ['default', 'percentage', 'symmetrical'],
    },
    yAxisTitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChartWithProviders>;

const prometheusData = [
  [1740405600, '47.554166666666674'],
  [1740406320, '53.00833333333337'],
  [1740407760, '40.18750000000011'],
  [1740408480, '59.187499999999886'],
  [1740409200, '62.49583333333344'],
  [1740409920, '57.449999999999854'],
  [1740410640, '45.187500000000114'],
  [1740411360, '58.620833333332975'],
  [1740412080, '53.0786411974533'],
  [1740412800, '64.90833333333342'],
  [1740413520, '81.23333333333335'],
  [1740414240, '64.81614215228686'],
  [1740415680, '67.17291666666674'],
  [1740416400, '55.233333333333405'],
  [1740417120, '47.91666666666667'],
  [1740417840, '72.1083333333335'],
  [1740418560, '61.90904847636171'],
  [1740419280, '51.06666666666646'],
  [1740420000, '39.50416666666664'],
  [1740420720, '46.91666666666682'],
  [1740421440, '35.0541666666669'],
  [1740422160, '46.666666666666856'],
  [1740422880, '43.57083333333397'],
  [1740423600, '36.795833333333114'],
  [1740467520, '42.81249999999962'],
  [1740468240, '53.44272951530158'],
  [1740468960, '55.69583333333337'],
  [1740469680, '46.09583333333338'],
  [1740470400, '43.020833333333705'],
  [1740471120, '55.395833333333634'],
  [1740471840, '46.56249999999999'],
  [1740472560, '47.16249999999983'],
  [1740473280, '44.69166666666676'],
  [1740474000, '55.29583333333411'],
  [1740474720, '42.25833333333412'],
  [1740475440, '61.570833333332764'],
  [1740476160, '42.86666666666633'],
  [1740476880, '38.03750000000036'],
  [1740477600, '41.32916666666612'],
  [1740478320, '52.22499999999779'],
  [1740479040, '42.13333333333368'],
  [1740479760, '34.791666666665904'],
  [1740480480, '36.58333333333227'],
  [1740481200, '37.20833333333226'],
  [1740481920, '49.19583333333246'],
  [1740482640, '41.016666666666126'],
  [1740483360, '37.54166666666834'],
  [1740484080, '35.38750000000013'],
  [1740484800, '39.02500000000069'],
  [1740485520, '47.14054738807047'],
  [1740486240, '46.79166666666787'],
  [1740486960, '42.950363357557244'],
  [1740487680, '35.22916666666637'],
  [1740488400, '34.94583333333519'],
  [1740489120, '41.044577067983646'],
  [1740489840, '58.17083333333282'],
  [1740490560, '40.00000000000304'],
  [1740491280, '45.57500000000194'],
  [1740492000, '45.741666666666184'],
];

const prometheusData2 = [
  [1740405600, '45.23'],
  [1740406320, '120.45'],
  [1740407760, '35.88'],
  [1740408480, '42.98'],
  [1740409200, '88.29'],
  [1740409920, '25.84'],
  [1740410640, '95.38'],
  [1740411360, '30.22'],
  [1740412080, '78.17'],
  [1740412800, '110.40'],
  [1740413520, '45.83'],
  [1740414240, '92.21'],
  [1740415680, '28.57'],
  [1740416400, '75.43'],
  [1740417120, '115.31'],
  [1740417840, '38.50'],
  [1740418560, '82.40'],
  [1740419280, '27.86'],
  [1740420000, '98.90'],
  [1740420720, '31.21'],
  [1740421440, '85.25'],
  [1740422160, '105.86'],
  [1740422880, '42.97'],
  [1740423600, '71.19'],
  [1740467520, '95.41'],
  [1740468240, '36.84'],
  [1740468960, '88.89'],
  [1740469680, '29.39'],
  [1740470400, '96.42'],
  [1740471120, '33.79'],
  [1740471840, '108.96'],
  [1740472560, '45.56'],
  [1740473280, '77.89'],
  [1740474000, '102.49'],
  [1740474720, '35.65'],
  [1740475440, '88.97'],
  [1740476160, '25.26'],
  [1740476880, '91.43'],
  [1740477600, '104.72'],
  [1740478320, '39.62'],
  [1740479040, '85.53'],
  [1740479760, '28.19'],
  [1740480480, '99.98'],
  [1740481200, '41.60'],
  [1740481920, '76.59'],
  [1740482640, '113.41'],
  [1740483360, '30.94'],
  [1740484080, '88.78'],
  [1740484800, '32.42'],
  [1740485520, '95.54'],
  [1740486240, '29.19'],
  [1740486960, '86.35'],
  [1740487680, '118.62'],
  [1740488400, '37.34'],
  [1740489120, '84.44'],
  [1740489840, '34.57'],
  [1740490560, '93.40'],
  [1740491280, '28.97'],
  [1740492000, '107.14'],
];

const prometheusData3 = [
  [1740405600, '65.32'],
  [1740406320, '145.78'],
  [1740407760, '42.91'],
  [1740408480, '88.45'],
  [1740409200, '132.67'],
  [1740409920, '35.89'],
  [1740410640, '128.45'],
  [1740411360, '48.23'],
  [1740412080, '95.34'],
  [1740412800, '155.67'],
  [1740413520, '52.45'],
  [1740414240, '115.89'],
  [1740415680, '38.92'],
  [1740416400, '92.45'],
  [1740417120, '142.34'],
  [1740417840, '45.67'],
  [1740418560, '108.90'],
  [1740419280, '32.45'],
  [1740420000, '125.67'],
  [1740420720, '41.23'],
  [1740421440, '98.45'],
  [1740422160, '138.90'],
  [1740422880, '55.67'],
  [1740423600, '85.34'],
  [1740467520, '122.45'],
  [1740468240, '44.56'],
  [1740468960, '105.78'],
  [1740469680, '36.89'],
  [1740470400, '118.90'],
  [1740471120, '48.23'],
  [1740471840, '148.67'],
  [1740472560, '58.90'],
  [1740473280, '92.45'],
  [1740474000, '135.67'],
  [1740474720, '42.34'],
  [1740475440, '108.90'],
  [1740476160, '38.45'],
  [1740476880, '115.67'],
  [1740477600, '142.34'],
  [1740478320, '52.45'],
  [1740479040, '102.34'],
  [1740479760, '35.67'],
  [1740480480, '128.90'],
  [1740481200, '45.67'],
  [1740481920, '95.34'],
  [1740482640, '152.45'],
  [1740483360, '42.34'],
  [1740484080, '112.45'],
  [1740484800, '38.90'],
  [1740485520, '122.34'],
  [1740486240, '35.67'],
  [1740486960, '105.78'],
  [1740487680, '158.90'],
  [1740488400, '48.23'],
  [1740489120, '98.45'],
  [1740489840, '42.34'],
  [1740490560, '118.90'],
  [1740491280, '35.67'],
  [1740492000, '145.78'],
];

const prometheusData4 = [
  [1740405600, '85.45'],
  [1740406320, '178.92'],
  [1740407760, '32.15'],
  [1740408480, '142.78'],
  [1740409200, '195.34'],
  [1740409920, '28.67'],
  [1740410640, '165.89'],
  [1740411360, '45.23'],
  [1740412080, '138.56'],
  [1740412800, '188.90'],
  [1740413520, '35.67'],
  [1740414240, '155.45'],
  [1740415680, '25.89'],
  [1740416400, '128.90'],
  [1740417120, '182.34'],
  [1740417840, '42.56'],
  [1740418560, '145.78'],
  [1740419280, '22.34'],
  [1740420000, '168.90'],
  [1740420720, '38.45'],
  [1740421440, '135.67'],
  [1740422160, '192.45'],
  [1740422880, '48.23'],
  [1740423600, '158.90'],
  [1740467520, '28.45'],
  [1740468240, '175.67'],
  [1740468960, '42.34'],
  [1740469680, '148.90'],
  [1740470400, '185.67'],
  [1740471120, '32.45'],
  [1740471840, '172.34'],
  [1740472560, '45.67'],
  [1740473280, '152.89'],
  [1740474000, '198.45'],
  [1740474720, '25.67'],
  [1740475440, '162.34'],
  [1740476160, '35.89'],
  [1740476880, '145.67'],
  [1740477600, '188.90'],
  [1740478320, '42.34'],
  [1740479040, '158.90'],
  [1740479760, '28.45'],
  [1740480480, '175.67'],
  [1740481200, '38.90'],
  [1740481920, '142.34'],
  [1740482640, '192.45'],
  [1740483360, '32.67'],
  [1740484080, '165.89'],
  [1740484800, '45.23'],
  [1740485520, '155.67'],
  [1740486240, '25.89'],
  [1740486960, '168.90'],
  [1740487680, '195.34'],
  [1740488400, '35.67'],
  [1740489120, '148.90'],
  [1740489840, '42.34'],
  [1740490560, '172.45'],
  [1740491280, '28.67'],
  [1740492000, '185.90'],
];

const prometheusData5 = [
  [1740405600, '12850.45'],
  [1740406320, '21780.92'],
  [1740407760, '8320.15'],
  [1740408480, '16420.78'],
  [1740409200, '21950.34'],
  [1740409920, '9280.67'],
  [1740410640, '18605.89'],
  [1740411360, '12450.23'],
  [1740412080, '21308.56'],
  [1740412800, '18808.90'],
  [1740413520, '15305.67'],
  [1740414240, '24550.45'],
  [1740415680, '10205.89'],
  [1740416400, '19208.90'],
  [1740417120, '24802.34'],
  [1740417840, '13402.56'],
  [1740418560, '21450.78'],
  [1740419280, '18220.34'],
  [1740420000, '26608.90'],
  [1740420720, '19380.45'],
  [1740421440, '23350.67'],
  [1740422160, '19920.45'],
  [1740422880, '15480.23'],
  [1740423600, '28580.90'],
  [1740467520, '17280.45'],
  [1740468240, '24750.67'],
  [1740468960, '18420.34'],
  [1740469680, '23480.90'],
  [1740470400, '19850.67'],
  [1740471120, '27320.45'],
  [1740471840, '19720.34'],
  [1740472560, '24405.67'],
  [1740473280, '18502.89'],
  [1740474000, '27908.45'],
  [1740474720, '16205.67'],
  [1740475440, '23602.34'],
  [1740476160, '19305.89'],
  [1740476880, '24450.67'],
  [1740477600, '18858.90'],
  [1740478320, '26492.34'],
  [1740479040, '19588.90'],
  [1740479760, '28288.45'],
  [1740480480, '19765.67'],
  [1740481200, '23398.90'],
  [1740481920, '19492.34'],
  [1740482640, '25929.45'],
  [1740483360, '18329.67'],
  [1740484080, '24659.89'],
  [1740484800, '19459.23'],
  [1740485520, '27559.67'],
  [1740486240, '18259.89'],
  [1740486960, '25689.90'],
  [1740487680, '19959.34'],
  [1740488400, '28359.67'],
  [1740489120, '19489.90'],
  [1740489840, '26429.34'],
  [1740490560, '19729.45'],
  [1740491280, '28289.67'],
  [1740492000, '19859.90'],
];

// Data with irregular intervals but gaps under 2 intervals (less than 24 minutes)
// Sample frequency is 720 seconds (12 minutes), so 2 intervals = 1440 seconds (24 minutes)
const irregularIntervalData = [
  [1740405600, '47.55'], // Base timestamp
  [1740406200, '53.01'], // +600 seconds (10 minutes) - under 2 intervals
  [1740407100, '40.19'], // +900 seconds (15 minutes) - under 2 intervals
  [1740408000, '59.19'], // +900 seconds (15 minutes) - under 2 intervals
  [1740409100, '62.50'], // +1100 seconds (18.3 minutes) - under 2 intervals
  [1740410300, '57.45'], // +1200 seconds (20 minutes) - under 2 intervals
  [1740411000, '45.19'], // +700 seconds (11.7 minutes) - under 2 intervals
  [1740412200, '58.62'], // +1200 seconds (20 minutes) - under 2 intervals
  [1740413000, '53.08'], // +800 seconds (13.3 minutes) - under 2 intervals
  [1740414300, '64.91'], // +1300 seconds (21.7 minutes) - under 2 intervals
  [1740415100, '81.23'], // +800 seconds (13.3 minutes) - under 2 intervals
  [1740416400, '64.82'], // +1300 seconds (21.7 minutes) - under 2 intervals
  [1740417200, '67.17'], // +800 seconds (13.3 minutes) - under 2 intervals
  [1740418500, '55.23'], // +1300 seconds (21.7 minutes) - under 2 intervals
  [1740419400, '47.92'], // +900 seconds (15 minutes) - under 2 intervals
  [1740420600, '72.11'], // +1200 seconds (20 minutes) - under 2 intervals
  [1740421500, '61.91'], // +900 seconds (15 minutes) - under 2 intervals
  [1740422700, '51.07'], // +1200 seconds (20 minutes) - under 2 intervals
  [1740423800, '39.50'], // +1100 seconds (18.3 minutes) - under 2 intervals
  [1740424900, '46.92'], // +1100 seconds (18.3 minutes) - under 2 intervals
];

// Data spanning several months - multi-month dataset
const longTermPrometheusData: [number, string][] = [
  // January 2025
  [1735689600, '42.15'], // Jan 1, 2025
  [1735776000, '38.92'], // Jan 2, 2025
  [1735862400, '55.33'], // Jan 3, 2025
  [1735948800, '67.88'], // Jan 4, 2025
  [1736035200, '44.21'], // Jan 5, 2025
  [1736121600, '72.15'], // Jan 6, 2025
  [1736208000, '39.67'], // Jan 7, 2025
  [1736294400, '58.44'], // Jan 8, 2025
  [1736380800, '63.92'], // Jan 9, 2025
  [1736467200, '41.33'], // Jan 10, 2025
  [1736553600, '76.88'], // Jan 11, 2025
  [1736640000, '52.15'], // Jan 12, 2025
  [1736726400, '48.67'], // Jan 13, 2025
  [1736812800, '69.33'], // Jan 14, 2025
  [1736899200, '35.88'], // Jan 15, 2025
  // February 2025
  [1738368000, '81.15'], // Feb 1, 2025
  [1738454400, '47.67'], // Feb 2, 2025
  [1738540800, '54.33'], // Feb 3, 2025
  [1738627200, '62.88'], // Feb 4, 2025
  [1738713600, '38.15'], // Feb 5, 2025
  [1738800000, '73.67'], // Feb 6, 2025
  [1738886400, '45.33'], // Feb 7, 2025
  [1738972800, '59.88'], // Feb 8, 2025
  [1739059200, '51.15'], // Feb 9, 2025
  [1739145600, '66.67'], // Feb 10, 2025
  [1739232000, '43.33'], // Feb 11, 2025
  [1739318400, '78.88'], // Feb 12, 2025
  [1739404800, '36.15'], // Feb 13, 2025
  [1739491200, '64.67'], // Feb 14, 2025
  [1739577600, '49.33'], // Feb 15, 2025
  // March 2025
  [1740787200, '71.88'], // Mar 1, 2025
  [1740873600, '42.15'], // Mar 2, 2025
  [1740960000, '57.67'], // Mar 3, 2025
  [1741046400, '68.33'], // Mar 4, 2025
  [1741132800, '34.88'], // Mar 5, 2025
  [1741219200, '75.15'], // Mar 6, 2025
  [1741305600, '48.67'], // Mar 7, 2025
  [1741392000, '53.33'], // Mar 8, 2025
  [1741478400, '61.88'], // Mar 9, 2025
  [1741564800, '37.15'], // Mar 10, 2025
  [1741651200, '74.67'], // Mar 11, 2025
  [1741737600, '44.33'], // Mar 12, 2025
  [1741824000, '58.88'], // Mar 13, 2025
  [1741910400, '52.15'], // Mar 14, 2025
  [1741996800, '67.67'], // Mar 15, 2025
  // April 2025
  [1743465600, '41.33'], // Apr 1, 2025
  [1743552000, '76.88'], // Apr 2, 2025
  [1743638400, '35.15'], // Apr 3, 2025
  [1743724800, '63.67'], // Apr 4, 2025
  [1743811200, '50.33'], // Apr 5, 2025
  [1743897600, '72.88'], // Apr 6, 2025
  [1743984000, '39.15'], // Apr 7, 2025
  [1744070400, '56.67'], // Apr 8, 2025
  [1744156800, '65.33'], // Apr 9, 2025
  [1744243200, '33.88'], // Apr 10, 2025
  [1744329600, '77.15'], // Apr 11, 2025
  [1744416000, '46.67'], // Apr 12, 2025
  [1744502400, '54.33'], // Apr 13, 2025
  [1744588800, '60.88'], // Apr 14, 2025
  [1744675200, '49.22'], // Apr 15, 2025
];

export const PercentageChartExample: Story = {
  args: {
    series: [
      {
        data: prometheusData,
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        metricPrefix: 'instance:10.160.122.207:9100',
        getTooltipLabel: (prefix, resource) => `${resource}`,
      },
    ],
    title: 'CPU Usage',
    height: 200,
    startingTimeStamp: prometheusData[0][0],
    isLoading: false,
    isLegendHidden: false,
    helpText: 'This is the help text',
    yAxisType: 'percentage',
    yAxisTitle: '',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    xAxisFormat: 'date-time',
  },
};
const UNIT_RANGE_BS = [
  {
    threshold: 1,
    label: 'B/s',
  },
  {
    threshold: 1024,
    label: 'KiB/s',
  },
  {
    threshold: 1024 * 1024,
    label: 'MiB/s',
  },
  {
    threshold: 1024 * 1024 * 1024,
    label: 'GiB/s',
  },
  {
    threshold: 1024 * 1024 * 1024 * 1024,
    label: 'TiB/s',
  },
];
export const SymmetricalAxisExample: Story = {
  render: (args) => <ChartWithProviders2 {...args} />,
  args: {
    series: {
      above: [
        {
          data: prometheusData,
          resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
          metricPrefix: 'in',
          getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
        },
        {
          data: prometheusData2,
          resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
          metricPrefix: 'in',
          getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
        },
      ],
      below: [
        {
          data: prometheusData3,
          resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
          metricPrefix: 'out',
          getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
        },
        {
          data: prometheusData4,
          resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
          metricPrefix: 'out',
          getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
        },
      ],
    },
    title: 'ControlPlane Bandwidth',
    height: 200,
    startingTimeStamp: prometheusData[0][0],
    unitRange: UNIT_RANGE_BS,
    isLoading: false,
    isLegendHidden: false,
    yAxisType: 'symmetrical',
    yAxisTitle: 'in(+)/out(-)',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  },
};
export const AutoUnitChartExample: Story = {
  args: {
    series: [
      {
        data: prometheusData5,
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        metricPrefix: 'instance:10.160.122.207:9100',
        getTooltipLabel: (prefix, resource) => `${resource}`,
      },
    ],
    title: 'Disk Throughput',
    startingTimeStamp: prometheusData5[0][0],
    height: 200,
    unitRange: UNIT_RANGE_BS,
    yAxisType: 'default',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  },
};

export const IrregularIntervalsExample: Story = {
  args: {
    series: [
      {
        data: irregularIntervalData,
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        metricPrefix: 'instance:10.160.122.207:9100',
        getTooltipLabel: (prefix, resource) => `${resource}`,
      },
    ],
    title: 'Irregular intervals data',
    height: 200,
    startingTimeStamp: irregularIntervalData[0][0],
    isLoading: false,
    isLegendHidden: false,
    helpText:
      'Data points with irregular timestamps, but all gaps are less than 2 intervals (24 minutes). No missing data points are added.',
    yAxisType: 'percentage',
    yAxisTitle: '',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  },
};

export const DateFormatExample: Story = {
  args: {
    series: [
      {
        data: longTermPrometheusData,
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        metricPrefix: 'instance:10.160.122.207:9100',
        getTooltipLabel: (prefix, resource) => `${resource}`,
      },
    ],
    title: 'Long term data',
    height: 200,
    startingTimeStamp: longTermPrometheusData[0][0],
    isLoading: false,
    isLegendHidden: false,
    helpText: 'This is the help text',
    interval: 60 * 60 * 24, // 1 day
    duration:
      longTermPrometheusData[longTermPrometheusData.length - 1][0] -
      longTermPrometheusData[0][0],
  },
};

export const SyncIdExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{
          'ip-10-160-122-207.eu-north-1.compute.internal':
            lineTimeSeriesColorRange[0],
          'ip-10-160-122-207.eu-north-2.compute.internal':
            lineTimeSeriesColorRange[1],
        }}
      >
        <LineTimeSerieChart
          syncId="sync-id"
          series={{
            above: [
              {
                data: prometheusData as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
                metricPrefix: 'in',
                getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
              },
              {
                data: prometheusData2 as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
                metricPrefix: 'in',
                getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
              },
            ],
            below: [
              {
                data: prometheusData3 as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
                metricPrefix: 'out',
                getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
              },
              {
                data: prometheusData4 as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
                metricPrefix: 'out',
                getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
              },
            ],
          }}
          title="ControlPlane Bandwidth"
          height={200}
          startingTimeStamp={Number(prometheusData[0][0])}
          unitRange={UNIT_RANGE_BS}
          isLoading={false}
          yAxisType={'symmetrical'}
          yAxisTitle={'in(+)/out(-)'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />

        <LineTimeSerieChart
          syncId="sync-id"
          series={{
            above: [
              {
                data: prometheusData2 as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
                metricPrefix: 'in',
                getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
              },
            ],
            below: [],
          }}
          title="ControlPlane Bandwidth 2"
          height={200}
          startingTimeStamp={Number(prometheusData2[0][0])}
          unitRange={UNIT_RANGE_BS}
          isLoading={false}
          yAxisType={'symmetrical'}
          yAxisTitle={'in(+)/out(-)'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />

        <LineTimeSerieChart
          syncId="sync-id"
          series={[
            {
              data: prometheusData as [number, string | number | null][],
              resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
              metricPrefix: 'cpu',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="CPU Usage"
          height={200}
          startingTimeStamp={Number(prometheusData[0][0])}
          isLoading={false}
          yAxisType={'percentage'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />

        <LineTimeSerieChart
          syncId="sync-id"
          series={[
            {
              data: prometheusData3 as [number, string | number | null][],
              resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
              metricPrefix: 'memory',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
            {
              data: prometheusData4 as [number, string | number | null][],
              resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
              metricPrefix: 'memory',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="Memory Usage"
          height={200}
          startingTimeStamp={Number(prometheusData3[0][0])}
          isLoading={false}
          yAxisType={'percentage'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />

        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};
export const CustomTooltipExample: Story = {
  args: {
    series: [
      {
        data: prometheusData,
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        metricPrefix: 'instance:10.160.122.207:9100',
        getTooltipLabel: (prefix, resource) => `${resource}`,
      },
    ],
    title: 'CPU Usage',
    height: 200,
    startingTimeStamp: prometheusData[0][0],
    isLoading: false,
    isLegendHidden: false,
    helpText: 'This is the help text',
    yAxisType: 'percentage',
    yAxisTitle: '',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    renderTooltip: (props) => {
      return <div>Custom Tooltip</div>;
    },
  },
};

// ─── showHorizontalGridLines ────────────────────────────────────────────────────────────

export const WithGridLines: Story = {
  args: {
    series: [
      {
        data: prometheusData as [number, string | number | null][],
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        getTooltipLabel: (_prefix, resource) => `${resource}`,
      },
    ],
    title: 'CPU Usage',
    height: 200,
    startingTimeStamp: prometheusData[0][0] as number,
    yAxisType: 'percentage',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    displayOptions: { showHorizontalGridLines: true },
  },
};

// ─── withGradient ─────────────────────────────────────────────────────────────

export const WithGradient: Story = {
  args: {
    series: [
      {
        data: prometheusData as [number, string | number | null][],
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        getTooltipLabel: (_prefix, resource) => `${resource}`,
        withGradient: true,
      },
    ],
    title: 'CPU Usage',
    height: 200,
    startingTimeStamp: prometheusData[0][0] as number,
    yAxisType: 'percentage',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  },
};

// ─── Combined: grid lines + gradient (two series, design-style) ───────────────

export const WithGridLinesAndGradient: Story = {
  render: () => (
    <ChartLegendWrapper
      colorSet={{
        'net-capacity': lineTimeSeriesColorRange[0],
        'total-capacity': lineTimeSeriesColorRange[2],
      }}
    >
      <LineTimeSerieChart
        series={[
          {
            data: prometheusData as [number, string | number | null][],
            resource: 'net-capacity',
            getTooltipLabel: () => 'Net capacity',
            withGradient: true,
          },
          {
            data: prometheusData2 as [number, string | number | null][],
            resource: 'total-capacity',
            getTooltipLabel: () => 'Total capacity',
            isLineDashed: true,
          },
        ]}
        title="Net Capacity"
        height={200}
        startingTimeStamp={prometheusData[0][0] as number}
        yAxisType="default"
        interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
        duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        displayOptions={{ showHorizontalGridLines: true }}
      />
      <ChartLegend shape="line" />
    </ChartLegendWrapper>
  ),
};

// Dynamic colorSet example components
const DynamicChart1 = (props) => {
  const chartId = useChartId();
  const { register } = useChartLegend();

  useEffect(() => {
    register(chartId, [
      'ip-10-160-122-207.eu-north-1.compute.internal',
      'ip-10-160-122-207.eu-north-2.compute.internal',
    ]);
  }, [chartId, register]);

  return <LineTimeSerieChart {...props} />;
};

const DynamicChart2 = (props) => {
  const chartId = useChartId();
  const { register } = useChartLegend();

  useEffect(() => {
    register(chartId, ['ip-10-160-122-207.eu-north-1.compute.internal']);
  }, [chartId, register]);

  return <LineTimeSerieChart {...props} />;
};

const generateColors = (seriesNames: string[]) => {
  const colors: Record<string, string> = {};
  seriesNames.forEach((name, index) => {
    colors[name] =
      lineTimeSeriesColorRange[index % lineTimeSeriesColorRange.length];
  });
  return colors;
};

export const DynamicColorSetExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper colorSet={generateColors}>
        <div style={{ marginBottom: '20px' }}>
          <h3>Chart 1 - Multiple Series</h3>
          <DynamicChart1
            series={{
              above: [
                {
                  data: prometheusData as [number, string | number | null][],
                  resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
                  metricPrefix: 'in',
                  getTooltipLabel: (prefix, resource) =>
                    `${resource}-${prefix}`,
                },
                {
                  data: prometheusData2 as [number, string | number | null][],
                  resource: 'ip-10-160-122-207.eu-north-2.compute.internal',
                  metricPrefix: 'in',
                  getTooltipLabel: (prefix, resource) =>
                    `${resource}-${prefix}`,
                },
              ],
              below: [],
            }}
            title="Dynamic Chart 1"
            height={200}
            startingTimeStamp={Number(prometheusData[0][0])}
            isLoading={false}
            yAxisType={'symmetrical'}
            interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
            duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Chart 2 - Single Series (Overlapping with Chart 1)</h3>
          <DynamicChart2
            series={[
              {
                data: prometheusData3 as [number, string | number | null][],
                resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
                metricPrefix: 'instance:10.160.122.207:9100',
                getTooltipLabel: (prefix, resource) => `${resource}`,
              },
            ]}
            title="Dynamic Chart 2"
            height={200}
            unitRange={UNIT_RANGE_BS}
            startingTimeStamp={Number(prometheusData3[0][0])}
            isLoading={false}
            yAxisType={'percentage'}
            interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
            duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
          />
        </div>

        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};

export const EmptyDataExample: Story = {
  render: () => {
    const theme = useTheme();
    const now = Date.now() / 1000;

    return (
      <ChartLegendWrapper
        // @ts-ignore
        colorSet={{
          Success: theme.statusHealthy,
          Failed: theme.statusCritical,
        }}
        sortOrder="status"
      >
        <LineTimeSerieChart
          series={[]}
          title="Empty Data - Last Hour"
          height={150}
          duration={60 * 60} // 1 hour
          interval={60} // 1 minute
          startingTimeStamp={now - 60 * 60}
          isLoading={false}
          yAxisType="default"
        />
        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};

// Generate 1-hour data with 30s intervals, all zeros
const generateAllZeroValuesData = (): [number, string][] => {
  const baseTimestamp = 1740405600;
  const points: [number, string][] = [];
  for (let i = 0; i <= 120; i++) {
    const timestamp = baseTimestamp + i * 30;
    points.push([timestamp, '0']);
  }
  return points;
};

const allZeroValuesData = generateAllZeroValuesData();

export const AllZeroValuesExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{ 'server-1': lineTimeSeriesColorRange[0] }}
      >
        <LineTimeSerieChart
          yAxisType="default"
          startingTimeStamp={allZeroValuesData[0][0]}
          interval={SAMPLE_FREQUENCY_LAST_ONE_HOUR}
          duration={SAMPLE_DURATION_LAST_ONE_HOUR}
          series={[
            {
              data: allZeroValuesData,
              resource: 'server-1',
              metricPrefix: 'bandwidth',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="All Zero Values"
          height={200}
        />
      </ChartLegendWrapper>
    );
  },
};

// Data with small values (below 1)
const smallValuesData: [number, string][] = [
  [1740405600, '0.047'],
  [1740406320, '0.053'],
  [1740407760, '0.040'],
  [1740408480, '0.059'],
  [1740409200, '0.062'],
  [1740409920, '0.057'],
  [1740410640, '0.045'],
  [1740411360, '0.058'],
  [1740412080, '0.053'],
  [1740412800, '0.064'],
  [1740413520, '0.081'],
  [1740414240, '0.064'],
  [1740415680, '0.097'],
  [1740416400, '0.055'],
  [1740417120, '0.047'],
  [1740417840, '0.072'],
  [1740418560, '0.061'],
  [1740419280, '0.051'],
  [1740420000, '0.039'],
  [1740420720, '0.046'],
  [1740421440, '0.035'],
  [1740422160, '0.046'],
  [1740422880, '0.043'],
  [1740423600, '0.036'],
  [1740467520, '0.042'],
  [1740468240, '0.053'],
  [1740468960, '0.055'],
  [1740469680, '0.046'],
  [1740470400, '0.043'],
  [1740471120, '0.055'],
  [1740471840, '0.046'],
  [1740472560, '0.047'],
  [1740473280, '0.044'],
  [1740474000, '0.055'],
  [1740474720, '0.042'],
  [1740475440, '0.061'],
  [1740476160, '0.042'],
  [1740476880, '0.038'],
  [1740477600, '0.041'],
  [1740478320, '0.052'],
  [1740479040, '0.042'],
  [1740479760, '0.034'],
  [1740480480, '0.036'],
  [1740481200, '0.037'],
  [1740481920, '0.049'],
  [1740482640, '0.041'],
  [1740483360, '0.037'],
  [1740484080, '0.035'],
  [1740484800, '0.039'],
  [1740485520, '0.047'],
  [1740486240, '0.046'],
  [1740486960, '0.042'],
  [1740487680, '0.035'],
  [1740488400, '0.034'],
  [1740489120, '0.041'],
  [1740489840, '0.058'],
  [1740490560, '0.040'],
  [1740491280, '0.045'],
  [1740492000, '0.045'],
];

const verySmallValuesData: [number, string][] = [
  [1740405600, '0.00000475'],
  [1740406320, '0.00000530'],
  [1740407760, '0.00000401'],
  [1740408480, '0.00000591'],
  [1740409200, '0.00000624'],
  [1740409920, '0.00000574'],
  [1740410640, '0.00000451'],
  [1740411360, '0.00000586'],
  [1740412080, '0.00000530'],
  [1740412800, '0.00000649'],
  [1740413520, '0.00000812'],
  [1740414240, '0.00000648'],
  [1740415680, '0.00000671'],
  [1740416400, '0.00000552'],
  [1740417120, '0.00000479'],
  [1740417840, '0.00000721'],
  [1740418560, '0.00000619'],
  [1740419280, '0.00000510'],
  [1740420000, '0.00000395'],
  [1740420720, '0.00000469'],
  [1740421440, '0.00000350'],
  [1740422160, '0.00000466'],
  [1740422880, '0.00000435'],
  [1740423600, '0.00000367'],
];

export const SmallValuesExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{
          'server-1': lineTimeSeriesColorRange[0],
          'server-2': lineTimeSeriesColorRange[1],
        }}
      >
        <LineTimeSerieChart
          series={[
            {
              data: smallValuesData,
              resource: 'server-1',
              metricPrefix: 'rate',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="Small Values (0.003 - 0.008 range)"
          height={200}
          startingTimeStamp={smallValuesData[0][0]}
          isLoading={false}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />

        <LineTimeSerieChart
          series={[
            {
              data: verySmallValuesData,
              resource: 'server-2',
              metricPrefix: 'rate',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="Very Small Values (0.000003 - 0.000008 range)"
          height={200}
          startingTimeStamp={verySmallValuesData[0][0]}
          isLoading={false}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
        />
        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};
// Generate 1-hour data with 30s intervals (120 points)
const generateBigValuesData = (): [number, string][] => {
  const baseTimestamp = 1740405600;
  const points: [number, string][] = [];
  for (let i = 0; i <= 120; i++) {
    const timestamp = baseTimestamp + i * 30;
    // Exponential growth from 1000 to ~100M
    const value = Math.floor(1000 * Math.pow(1.1, i));
    points.push([timestamp, value.toString()]);
  }
  return points;
};

const generateBigValuesData2 = (): [number, string][] => {
  const baseTimestamp = 1740405600;
  const points: [number, string][] = [];
  for (let i = 0; i <= 120; i++) {
    const timestamp = baseTimestamp + i * 30;
    // Fluctuating between 10000 and 15000 with random variation
    const value = 12500 + Math.sin(i * 0.2) * 2500 + Math.random() * 500;
    points.push([timestamp, value.toFixed(2)]);
  }
  return points;
};

const bigValuesData = generateBigValuesData();
const bigValuesData2 = generateBigValuesData2();
export const ModernPreset: Story = {
  args: {
    series: [
      {
        data: prometheusData as [number, string | number | null][],
        resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
        getTooltipLabel: (_prefix, resource) => `${resource}`,
        withGradient: true,
      },
    ],
    title: 'CPU Usage',
    height: 200,
    startingTimeStamp: prometheusData[0][0] as number,
    yAxisType: 'percentage',
    interval: SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
    duration: SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
    displayPreset: 'modern',
  },
};

// ─── ARTESCA-17366: tooltip unit independent from axis unit ───────────────────
// Operations per second. The dataset maximum is in the thousands, so the axis
// (and chart title) settle on "kop/s". A handful of points are only a few op/s.
// Before the fix those points rendered as "0.00 kop/s" in the tooltip (the axis
// unit forced on every value). Now the tooltip re-derives the unit per value, so
// a 3 op/s point reads "3.00 op/s" while the axis stays in kop/s.
const UNIT_RANGE_OPS = [
  { threshold: 1, label: 'op/s' },
  { threshold: 1000, label: 'kop/s' },
  { threshold: 1000000, label: 'Mop/s' },
];

const mixedMagnitudeOpsData: [number, string][] = [
  [1740405600, '4200'],
  [1740406320, '3850'],
  [1740407760, '4100'],
  [1740408480, '3'], // tiny spike-down → "3.00 op/s", not "0.00 kop/s"
  [1740409200, '4500'],
  [1740409920, '3920'],
  [1740410640, '7'], // tiny → "7.00 op/s"
  [1740411360, '4310'],
  [1740412080, '3780'],
  [1740412800, '4640'],
  [1740413520, '5120'],
  [1740414240, '120'], // small → "120.00 op/s"
  [1740415680, '4170'],
  [1740416400, '3550'],
  [1740417120, '4790'],
  [1740417840, '3210'],
  [1740418560, '4410'],
  [1740419280, '0.5'], // sub-unit → "0.50 op/s"
  [1740420000, '3950'],
  [1740420720, '4680'],
  [1740421440, '3504'],
  [1740422160, '4660'],
  [1740422880, '4357'],
  [1740423600, '3680'],
];

export const TooltipUnitRangeExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{ operations: lineTimeSeriesColorRange[0] }}
      >
        <LineTimeSerieChart
          series={[
            {
              data: mixedMagnitudeOpsData,
              resource: 'operations',
              metricPrefix: 'rate',
              getTooltipLabel: (_prefix, resource) => `${resource}`,
            },
          ]}
          title="Operation"
          height={200}
          startingTimeStamp={mixedMagnitudeOpsData[0][0]}
          unitRange={UNIT_RANGE_OPS}
          isLoading={false}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
          helpText="Axis is in kop/s; hover the low points (3, 7, 120, 0.5) — the tooltip re-applies the unit range so they read in op/s instead of 0.00 kop/s."
        />
        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};

// Three series sharing the same timestamps but living in different magnitudes:
// - "deletes" peaks in the millions  → axis settles on Mop/s
// - "reads"  is in the thousands     → tooltip re-derives kop/s
// - "writes" is a handful of op/s    → tooltip re-derives op/s
// Hovering any point shows all three values, each with its own proper unit,
// instead of the small ones collapsing to "0.00 Mop/s".
const opsTimestamps = mixedMagnitudeOpsData.map(([t]) => t);

const readsData: [number, string][] = opsTimestamps.map((t, i) => [
  t,
  (3500 + ((i * 137) % 1800)).toString(),
]);

const writesData: [number, string][] = opsTimestamps.map((t, i) => [
  t,
  (2 + ((i * 7) % 40)).toString(),
]);

const deletesData: [number, string][] = opsTimestamps.map((t, i) => [
  t,
  (1_200_000 + ((i * 91_000) % 900_000)).toString(),
]);

export const TooltipUnitRangeMultiSeriesExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{
          reads: lineTimeSeriesColorRange[0],
          writes: lineTimeSeriesColorRange[1],
          deletes: lineTimeSeriesColorRange[2],
        }}
      >
        <LineTimeSerieChart
          series={[
            {
              data: deletesData,
              resource: 'deletes',
              metricPrefix: 'rate',
              getTooltipLabel: (_prefix, resource) => `${resource}`,
            },
            {
              data: readsData,
              resource: 'reads',
              metricPrefix: 'rate',
              getTooltipLabel: (_prefix, resource) => `${resource}`,
            },
            {
              data: writesData,
              resource: 'writes',
              metricPrefix: 'rate',
              getTooltipLabel: (_prefix, resource) => `${resource}`,
            },
          ]}
          title="Operation"
          height={200}
          startingTimeStamp={opsTimestamps[0]}
          unitRange={UNIT_RANGE_OPS}
          isLoading={false}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS}
          duration={SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS}
          helpText="Axis is in Mop/s (largest series). Hover any point: deletes read in Mop/s, reads in kop/s and writes in op/s — each value gets its own unit, independent of the axis."
        />
        <ChartLegend shape="line" direction="vertical" />
      </ChartLegendWrapper>
    );
  },
};

export const BigValuesExample: Story = {
  render: () => {
    return (
      <ChartLegendWrapper
        colorSet={{
          'server-1': lineTimeSeriesColorRange[0],
          'server-2': lineTimeSeriesColorRange[1],
        }}
      >
        <LineTimeSerieChart
          series={[
            {
              data: bigValuesData2,
              resource: 'server-2',
              metricPrefix: 'bandwidth',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="Big Values"
          height={200}
          yAxisTitle="Big Number Example "
          startingTimeStamp={bigValuesData2[0][0]}
          isLoading={false}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_ONE_HOUR}
          duration={SAMPLE_DURATION_LAST_ONE_HOUR}
        />
        <LineTimeSerieChart
          series={[
            {
              data: bigValuesData2,
              resource: 'server-2',
              metricPrefix: 'bandwidth',
              getTooltipLabel: (prefix, resource) => `${resource}-${prefix}`,
            },
          ]}
          title="Big Values"
          height={200}
          yAxisTitle="Big Number Example "
          startingTimeStamp={bigValuesData2[0][0]}
          isLoading={false}
          unitRange={UNIT_RANGE_BS}
          yAxisType={'default'}
          interval={SAMPLE_FREQUENCY_LAST_ONE_HOUR}
          duration={SAMPLE_DURATION_LAST_ONE_HOUR}
        />
      </ChartLegendWrapper>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*                            logarithmic Y axis                              */
/* -------------------------------------------------------------------------- */

const LOG_START = 1740405600;

/**
 * A latency-shaped series: a quiet baseline around 2 ms with occasional spikes into the seconds.
 * Deterministic, so the two scales below are always compared on the same data.
 */
const spikyData = Array.from({ length: 120 }, (_, index) => {
  const isSpike = index % 17 === 0;
  const isBigSpike = index % 41 === 0;
  const value = isBigSpike ? 4200 : isSpike ? 180 : 1.5 + (index % 7) * 0.4;
  return [LOG_START + index * SAMPLE_FREQUENCY_LAST_ONE_HOUR, value] as [
    number,
    number,
  ];
});

/** The same series with a stretch of zeros — the values a log axis has no place for. */
const spikyDataWithZeros = spikyData.map(
  ([timestamp, value], index) =>
    [timestamp, index >= 60 && index < 72 ? 0 : value] as [number, number],
);

const logSerie = (data: [number, number][]): Serie[] => [
  {
    data,
    resource: 'ip-10-160-122-207.eu-north-1.compute.internal',
    getTooltipLabel: (prefix, resource) => `${resource}`,
  },
];

const logChartArgs = (data: [number, number][]) => ({
  series: logSerie(data),
  height: 200,
  startingTimeStamp: LOG_START,
  interval: SAMPLE_FREQUENCY_LAST_ONE_HOUR,
  duration: SAMPLE_DURATION_LAST_ONE_HOUR,
  yAxisTitle: 'ms',
});

/**
 * The same series on both scales.
 *
 * A metric that idles at 2 ms and spikes to 4 s is the case a linear axis cannot serve: the axis is
 * sized by the spike, so the baseline — where the metric spends nearly all its time — is pressed
 * flat against zero and its variation is invisible. A log axis gives every decade the same height,
 * so the quiet periods and the spikes are both readable.
 *
 * The scale is a display choice only: no value is rescaled, and the tooltip still reads the
 * milliseconds the series carries.
 *
 * What you give up: distances no longer read as differences. Two points twice as far apart
 * vertically are ten times apart in value, not twice. Use it to see shape across magnitudes, not
 * to compare magnitudes by eye.
 */
export const LogarithmicScaleExample: Story = {
  render: () => (
    <div>
      <ChartWithProviders
        {...logChartArgs(spikyData)}
        title="Request latency — linear"
      />
      <ChartWithProviders
        {...logChartArgs(spikyData)}
        title="Request latency — logarithmic"
        yAxisScale="log"
      />
    </div>
  ),
};

/**
 * Zero has no logarithm, so the axis reserves one slot below its first decade and labels it `0`.
 * The zero samples are drawn there. Note that the step from `0` to the first decade is that single
 * reserved slot and not one more tenfold step — it is the one place on the axis where the spacing
 * does not mean a factor of ten.
 *
 * This is what keeps "the metric read zero for twelve minutes" from looking like "we have no data
 * for twelve minutes". Dropping the zeros would leave the same gap a missing sample leaves, and
 * those are not the same fact; clamping them to the first decade would draw them as the smallest
 * measured value, a number the reader would believe. The tooltip reports 0 either way.
 *
 * A negative sample has neither a logarithm nor a slot, so it is still dropped: a series that goes
 * negative does not belong on a log axis at all.
 */
export const LogarithmicScaleWithZeros: Story = {
  render: () => (
    <div>
      <ChartWithProviders
        {...logChartArgs(spikyDataWithZeros)}
        title="With a stretch of zeros — linear"
      />
      <ChartWithProviders
        {...logChartArgs(spikyDataWithZeros)}
        title="With a stretch of zeros — logarithmic, the zeros sit at the reserved 0"
        yAxisScale="log"
      />
    </div>
  ),
};

/**
 * The axis follows the data's own decades — it is not anchored to 1.
 *
 * Here everything sits between 0.001 and 0.1 with occasional spikes to 32 and 50, and the axis
 * comes out 0.001..100: six decades, one tick each, decimals on the low ones and none on the high
 * ones. Nothing had to be configured for that; `getLogAxis` reads the smallest positive value and
 * the largest, and rounds each outwards to a decade.
 *
 * On the linear chart above, the entire baseline is a flat line on zero — the axis is sized by the
 * 50 spike, and 0.002 against 50 is 1/25000 of the plot height.
 */
export const LogarithmicScaleBelowOne: Story = {
  render: () => {
    // Baseline in the milli range, two spikes four decades above it. Deterministic.
    const data = Array.from({ length: 120 }, (_, index) => {
      const value =
        index === 30 ? 32 : index === 78 ? 50 : 0.002 + (index % 9) * 0.011;
      return [LOG_START + index * SAMPLE_FREQUENCY_LAST_ONE_HOUR, value] as [
        number,
        number,
      ];
    });

    return (
      <div>
        <ChartWithProviders
          {...logChartArgs(data)}
          title="Error rate — linear, the baseline is unreadable"
          yAxisTitle="/s"
        />
        <ChartWithProviders
          {...logChartArgs(data)}
          title="Error rate — logarithmic, 0.001 to 100"
          yAxisTitle="/s"
          yAxisScale="log"
        />
      </div>
    );
  },
};
