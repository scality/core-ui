//@flow
import React from 'react';
import GlobalHealthBar from '../src/lib/components/globalhealthbar/GlobalHealthBar.component';
import { Wrapper, Title } from './common';

const id = 'vis_globalhealth';
const idEmpty = 'vis_globalhealth_empty';
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

export default {
  title: 'Components/Chart/GlobalHealthBar',
  component: GlobalHealthBar,
};

const start = '2021-02-01T00:00:00Z';
const end = '2021-02-07T00:00:00Z';

export const Default = () => {
  return (
    <Wrapper>
      <Title>Global Health Component Demo</Title>
      <div style={{ paddingTop: '50px' }}>
        <GlobalHealthBar id={id} alerts={alerts} start={start} end={end} />
      </div>
      <Title>Global Health Component Demo - no alert</Title>
      <div style={{ paddingTop: '30px' }}>
        <GlobalHealthBar
          id={idEmpty}
          alerts={emptyAlert}
          start={start}
          end={end}
        />
      </div>
    </Wrapper>
  );
};
