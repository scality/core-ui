//@flow
import React from 'react';
import GlobalHealthBar from '../src/lib/components/globalhealthbar/GlobalHealthBar.component';
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

export default {
  title: 'Components/Chart/GlobalHealthBar',
  component: GlobalHealthBar,
};

const start = '2021-01-31T23:00:00Z'; // UTC time
const end = '2021-02-06T23:00:00Z';

const startNotFirstDay = '2021-02-23T23:00:00Z';
const endNotFirstDay = '2021-03-01T23:00:00Z';

export const Default = () => {
  return (
    <Wrapper>
      <Title>Global Health Component Demo</Title>
      <div style={{ paddingTop: '50px' }}>
        <GlobalHealthBar
          id={'vis_globalhealth'}
          alerts={alerts}
          start={start}
          end={end}
        />
      </div>
      <Title>No alert</Title>
      <div style={{ paddingTop: '30px' }}>
        <GlobalHealthBar
          id={'vis_globalhealth_empty'}
          alerts={emptyAlert}
          start={start}
          end={end}
        />
      </div>
      <Title>Alert triggered earlier than the starting time</Title>
      <div style={{ paddingTop: '30px' }}>
        <GlobalHealthBar
          id={'vis_globalhealth_alert_retrieve_before'}
          alerts={alertRetrieveBefore}
          start={start}
          end={end}
        />
      </div>
      <Title>First Label always includes the month label</Title>
      <div style={{ paddingTop: '30px' }}>
        <GlobalHealthBar
          id={'vis_globalhealth_display_month_1st_label'}
          alerts={alertTriggerNotFirstDay}
          start={startNotFirstDay}
          end={endNotFirstDay}
        />
      </div>
    </Wrapper>
  );
};
