//@flow
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import LineTemporalChart, {
  YAXIS_TITLE_READ_WRITE,
  UNIT_RANGE_BS,
} from '../src/lib/components/linetemporalchart/LineTemporalChart.component';
import { MetricsTimeSpanProvider } from '../src/lib/components/linetemporalchart/MetricTimespanProvider.js';
import { Wrapper } from './common';
import {
  dataLineChartV2,
  dataLineChartV2_readwrite,
} from './data/linechart.js';
export default {
  title: 'Components/v2/LineTemporalChart',
  component: LineTemporalChart,
};

export const Default = () => (
  <MetricsTimeSpanProvider>
    <Wrapper>
      <BrowserRouter>
        <SyncedCursorCharts>
          <div style={{ width: '600px' }}>
            <LineTemporalChart
              title={'ControalPlane Bandwidth'}
              series={dataLineChartV2}
              unitRange={UNIT_RANGE_BS}
              height={300}
              yAxisType={'default'}
              startingTimeStamp={1629306229}
            />
          </div>
          <LineTemporalChart
            title={'IOPS'}
            series={dataLineChartV2_readwrite}
            height={300}
            yAxisType={'symmetrical'}
            yAxisTitle={YAXIS_TITLE_READ_WRITE}
            startingTimeStamp={1629306229}
          />
          <LineTemporalChart
            title={'CPU Usage'}
            series={dataLineChartV2}
            height={300}
            yAxisType={'percentage'}
            startingTimeStamp={1629306229}
          />
        </SyncedCursorCharts>
      </BrowserRouter>
    </Wrapper>
  </MetricsTimeSpanProvider>
);
