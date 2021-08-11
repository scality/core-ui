//@flow
import React from 'react';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import LineTemporalChart from '../src/lib/components/linetemporalchart/LineTemporalChart.component';
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
  <Wrapper>
    <SyncedCursorCharts>
      <div style={{ width: '500px' }}>
        <LineTemporalChart
          id={'sync_chart_1_id'}
          title={'ControalPlane Bandwidth'}
          series={dataLineChartV2}
          unitRange={[
            { threshold: 1, label: 'B/s' },
            { threshold: 1024, label: 'KiB/s' },
            { threshold: 1024 * 1024, label: 'MiB/s' },
            { threshold: 1024 * 1024 * 1024, label: 'GiB/s' },
          ]}
          height={300}
          yAxisType={'default'}
        />
      </div>
      <LineTemporalChart
        id={'sync_chart_2_id'}
        title={'IOPS'}
        series={dataLineChartV2_readwrite}
        height={300}
        yAxisType={'readwrite'}
      />
      <LineTemporalChart
        id={'sync_chart_percentage'}
        title={'CPU Usage (%)'}
        series={dataLineChartV2}
        height={300}
        yAxisType={'percentage'}
      />
    </SyncedCursorCharts>
  </Wrapper>
);
