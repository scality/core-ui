import React, { useCallback, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import LineTemporalChart, {
  YAXIS_TITLE_READ_WRITE,
} from '../src/lib/components/linetemporalchart/LineTemporalChart.component';
import { MetricsTimeSpanProvider } from '../src/lib/components/linetemporalchart/MetricTimespanProvider';
import { Wrapper } from './common';
import { dataLineChartV2, dataLineChartV2_readwrite } from './data/linechart';
import { defaultRenderTooltipSerie } from '../src/lib/components/linetemporalchart/tooltip';
export default {
  title: 'Components/v2/LineTemporalChart',
  component: LineTemporalChart,
};
export const Default = () => {
  const [tooltipText, setTooltipText] = useState('initial text');
  useEffect(() => {
    setInterval(() => {
      setTooltipText('New text ' + new Date().toISOString());
    }, 500);
  }, []);
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
              helpText={
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
              }
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