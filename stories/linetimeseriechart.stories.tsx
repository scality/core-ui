import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  LineTimeSerieChart,
  Serie,
} from '../src/lib/components/linetimeseriechart/linetimeseriechart.component';
import { ChartLegendWrapper } from '../src/lib/components/chartlegend/ChartLegendWrapper';
import { lineTimeSeriesColorRange } from '../src/lib/style/theme';
import { ChartLegend } from '../src/lib/components/chartlegend/ChartLegend';
import {
  SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
  SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS,
} from '../src/lib/components/constants';
import { Button } from '../src/lib/components/buttonv2/Buttonv2.component';

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
    timeFormat: {
      control: 'select',
      options: ['date-time', 'date'],
    },
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
    timeFormat: 'date',
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
    timeFormat: 'date-time',
    renderTooltip: (props) => {
      console.log('DEBUG props', props);
      return <div>Custom Tooltip</div>;
    },
  },
};
