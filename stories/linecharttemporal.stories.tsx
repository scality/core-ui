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
  title: 'Components/Data Display/Charts/v2/LineTemporalChart',
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
