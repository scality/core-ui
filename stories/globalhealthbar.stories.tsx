import React from 'react';
import { GlobalHealthBar } from '../src/lib/components/globalhealthbar/GlobalHealthBar.component';
import { SyncedCursorCharts } from '../src/lib/components/vegachartv2/SyncedCursorCharts';
import { Wrapper, Title } from './common';
const alerts = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-02-01T07:00:00Z',
    endsAt: '2021-02-01T21:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '2',
    severity: 'warning',
    startsAt: '2021-02-01T23:00:00Z',
    endsAt: '2021-02-02T23:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '3',
    severity: 'critical',
    startsAt: '2021-02-03T00:00:00Z',
    endsAt: '2021-02-04T00:00:00Z',
    description: 'Global health critical',
  },
  {
    id: '4',
    severity: 'warning',
    startsAt: '2021-02-04T10:00:00Z',
    endsAt: '2021-02-06T00:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '5',
    severity: 'warning',
    startsAt: '2021-02-06T12:00:00Z',
    endsAt: '2021-02-06T20:00:00Z',
    description: 'Global health warning',
  },
];
const alertsLast24h = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-02-01T07:00:00Z',
    endsAt: '2021-02-01T08:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '5',
    severity: 'warning',
    startsAt: '2021-02-01T10:00:00Z',
    endsAt: '2021-02-01T20:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '6',
    severity: 'unavailable',
    startsAt: '2021-02-01T02:00:00Z',
    endsAt: '2021-02-01T03:00:00Z',
    description: 'unavailable',
  },
];
const emptyAlert = [];
const alertRetrieveBefore = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-01-31T23:00:00Z',
    endsAt: '2021-02-03T21:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '2',
    severity: 'critical',
    startsAt: '2021-02-05T23:00:00Z',
    endsAt: '2021-02-06T21:00:00Z',
    description: 'Global health warning',
  },
];
const alertTriggerNotFirstDay = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-02-24T21:00:00Z',
    endsAt: '2021-02-25T21:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '2',
    severity: 'critical',
    startsAt: '2021-02-26T23:00:00Z',
    endsAt: '2021-02-27T21:00:00Z',
    description: 'Global health warning',
  },
];

const start = '2021-01-31T23:00:00Z'; // UTC time
const end = '2021-02-06T23:00:00Z';
const startLast24h = '2021-02-01T00:00:00Z';
const endLast24h = '2021-02-02T00:00:00Z';
const startNotFirstDay = '2021-02-23T23:00:00Z';
const endNotFirstDay = '2021-03-01T23:00:00Z';

export default {
  title: 'Components/Chart/GlobalHealthBar',
  component: GlobalHealthBar,
  decorators:[(story) => (
    <Wrapper style={{minHeight:"50vh",display:'flex', alignItems:'center'}}>
      <div style={{width:'500px'}}>
        <SyncedCursorCharts>
        {story()}
      </SyncedCursorCharts>
      </div>
    </Wrapper>) ],
  args:{
    start,
    end
  },
  argTypes:{
    start:{
      control:'date'
    },
    end:{
      control:'date'
    }
  }
};

export const GlobalHealthComponentDemo = {
  args:{
    id:'vis_globalhealth',
    alerts
  }
}

export const GlobalHealthLast24Hours = {
  args:{
    id:'vis_globalhealth_24h',
    alerts:alertsLast24h,
    start:startLast24h,
    end:endLast24h,
  }
}
export const GlobalHealthEmpty = {
  args:{
    id:'vis_globalhealth_empty',
    alerts:emptyAlert,
  }
}

export const AlertTriggeredEarlierThanTheStartingTime = {
  args:{
    id:'vis_globalhealth_alert_retrieve_before',
    alerts:alertRetrieveBefore
  }
}

export const FirstLabel = {
  name:"First Label always includes the month label",
  args:{
    id:'vis_globalhealth_display_month_1st_label',
    alerts:alertTriggerNotFirstDay,
    start:startNotFirstDay,
    end:endNotFirstDay
  }
}
