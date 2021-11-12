//@flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import LineTemporalChart, {
  YAXIS_TITLE_READ_WRITE,
} from '../src/lib/components/linetemporalchart/LineTemporalChart.component';
import { MetricsTimeSpanProvider } from '../src/lib/components/linetemporalchart/MetricTimespanProvider.js';
import { Wrapper } from './common';
import {
  dataLineChartV2,
  dataLineChartV2_readwrite,
} from './data/linechart.js';
import { defaultRenderTooltipSerie } from '../src/lib/components/linetemporalchart/tooltip';
export default {
  title: 'Components/v2/LineTemporalChart',
  component: LineTemporalChart,
};

export const Default = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <MetricsTimeSpanProvider>
          <SyncedCursorCharts>
            <LineTemporalChart
              title={'CPU Usage'}
              series={dataLineChartV2}
              height={300}
              yAxisType={'default'}
              startingTimeStamp={1629306229}
              renderTooltipSerie={(serie, tooltipData) => {
                if (serie.key === 'bootstrap') {
                  return defaultRenderTooltipSerie(serie) + '<tr><td colspan="3">This is the main node</td></tr>';  
                }
                return defaultRenderTooltipSerie(serie);
              }}
            />
            <LineTemporalChart
              title={'IOPS'}
              series={dataLineChartV2_readwrite}
              height={300}
              yAxisType={'symmetrical'}
              yAxisTitle={YAXIS_TITLE_READ_WRITE}
              startingTimeStamp={1629306229}
            />
          </SyncedCursorCharts>
        </MetricsTimeSpanProvider>
      </BrowserRouter>
    </Wrapper>
  );
};
