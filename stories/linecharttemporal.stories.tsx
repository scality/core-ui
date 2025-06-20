import React, { useCallback, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import {
  LineTemporalChart,
  YAXIS_TITLE_READ_WRITE,
} from '../src/lib/components/linetemporalchart/LineTemporalChart.component';
import { MetricsTimeSpanProvider } from '../src/lib/components/linetemporalchart/MetricTimespanProvider';
import { Wrapper } from './common';
import { dataLineChartV2, dataLineChartV2_readwrite } from './data/linechart';
import { defaultRenderTooltipSerie } from '../src/lib/components/linetemporalchart/tooltip';
export default {
  title: 'Components/Data Display/Charts/LineTemporalChart',
  component: LineTemporalChart,
  decorators: [
    (story) => (
      <Wrapper>
        <BrowserRouter>
          <MetricsTimeSpanProvider>
            <SyncedCursorCharts>{story()}</SyncedCursorCharts>
          </MetricsTimeSpanProvider>
        </BrowserRouter>
      </Wrapper>
    ),
  ],
  args: {
    heigth: 300,
    startingTimeStamp: 1629306229,
  },
};

export const CPUUsage = {
  render: (args) => {
    const [tooltipText, setTooltipText] = useState('initial text');
    useEffect(() => {
      setInterval(() => {
        setTooltipText('New text ' + new Date().toISOString());
      }, 500);
    }, []);
    return (
      <LineTemporalChart
        renderTooltipSerie={useCallback(
          (serie, tooltipData) => {
            if (serie.key === 'bootstrap') {
              return (
                defaultRenderTooltipSerie(serie) +
                `<tr><td colspan="3">${tooltipText}</td></tr>`
              );
            }
            return defaultRenderTooltipSerie(serie);
          },
          [tooltipText],
        )}
        {...args}
      />
    );
  },
  args: {
    title: 'CPU Usage',
    yAxisType: 'default',
    series: dataLineChartV2,
    helpText: (
      <>
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
      </>
    ),
  },
};

export const IOPS = {
  args: {
    title: 'IOPS',
    series: dataLineChartV2_readwrite,
    yAxisTitle: YAXIS_TITLE_READ_WRITE,
    yAxisType: 'symmetrical',
  },
};

export const MyTest = {
  render: (args) => {
    const scm = {
      title: 'Bandwidth',
      series: [
        {
          resource: 'outband',
          data: [
            [1750343760, '0'],
            [1750347360, '0'],
            [1750350960, '0'],
            [1750354560, '0'],
            [1750401360, '0'],
            [1750404960, '0'],
            [1750408560, '0'],
            [1750412160, '0'],
            [1750415760, '0'],
            [1750419360, '0'],
            [1750422960, '0'],
            [1750426560, '0'],
            [1750430160, '0'],
          ],
          // getTooltipLabel: () => 'out',
          // getLegendLabel: () => 'out',
          getLegendLabel: (metricPrefix, resource) => {
            return resource;
          },
          getTooltipLabel: (metricPrefix, resource) => {
            return resource;
          },
        },
        {
          resource: 'in_band',
          data: [
            [1750343760, '0'],
            [1750347360, '0'],
            [1750350960, '0'],
            [1750354560, '0'],
            [1750401360, '0'],
            [1750404960, '0'],
            [1750408560, '0'],
            [1750412160, '0'],
            [1750415760, '0'],
            [1750419360, '0'],
            [1750422960, '149127'],
            [1750426560, '0'],
            [1750430160, '0'],
          ],
          // getTooltipLabel: () => 'in',
          // getLegendLabel: () => 'in',
          getLegendLabel: (metricPrefix, resource) => {
            return resource;
          },
          getTooltipLabel: (metricPrefix, resource) => {
            return resource;
          },
        },
      ],
      startingTimestamp: 1750343760,
      height: 100,
      startingTimeStamp: 1750343760,
      isLoading: false,
      unitRange: [
        {
          threshold: 0,
          label: 'B/s',
        },
        {
          threshold: 1024,
          label: 'KiB/s',
        },
        {
          threshold: 1048576,
          label: 'MiB/s',
        },
        {
          threshold: 1073741824,
          label: 'GiB/s',
        },
        {
          threshold: 1099511627776,
          label: 'TiB/s',
        },
      ],
    };
    return (
      <LineTemporalChart
        {...args}
        title={scm.title}
        series={scm.series}
        height={scm.height}
        startingTimeStamp={scm.startingTimestamp}
        isLoading={scm.isLoading}
        unitRange={scm.unitRange}
      />
    );
  },
  args: {
    title: 'CPU Usage',
    yAxisType: 'default',
    series: dataLineChartV2,
    helpText: (
      <>
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
        This charts represents lorem ipsum
        <br />
      </>
    ),
  },
};
