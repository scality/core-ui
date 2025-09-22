import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Alert,
  GlobalHealthBar,
  GlobalHealthProps,
} from '../../src/lib/components/globalhealthbar/GlobalHealthBarRecharts.component';

import {
  DATE_FORMATER,
  TIME_SECOND_FORMATER,
} from '../../src/lib/components/date/FormattedDateTime';
import {
  MetricsTimeSpanProvider,
  useMetricsTimeSpan,
} from '../../src/lib/next';
import { Dropdown, Icon, Stack } from '../../src/lib';
import {
  LAST_ONE_HOUR,
  LAST_SEVEN_DAYS,
  LAST_TWENTY_FOUR_HOURS,
  SAMPLE_DURATION_LAST_ONE_HOUR,
  SAMPLE_DURATION_LAST_SEVEN_DAYS,
  SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS,
} from '../../src/lib/components/constants';

type Story = StoryObj<GlobalHealthProps>;

const meta: Meta<GlobalHealthProps> = {
  title: 'Components/GlobalHealthBarRecharts',
  component: GlobalHealthBar,
};
export default meta;

const start = '2021-01-30T23:00:00Z'; // UTC time
const end = '2021-02-06T23:00:00Z';
const start2 = '2021-01-29T14:00:00Z';
const end2 = '2021-02-05T14:00:00Z';
const startLast24h = '2021-02-01T00:00:00Z';
const endLast24h = '2021-02-02T00:00:00Z';
const startLastHour = '2021-02-01T00:00:00Z';
const endLastHour = '2021-02-01T01:00:00Z';

const alerts = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-02-01T11:00:00Z',
    endsAt: '2021-02-02T01:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '2',
    severity: 'warning',
    startsAt: '2021-02-01T23:00:00Z',
    endsAt: '2021-02-02T22:00:00Z',
    description:
      'Global health warning Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
  {
    severity: 'critical',
    startsAt: '2021-02-03T00:00:00Z',
    endsAt: '2021-02-04T00:00:00Z',
    description:
      'Global health critical Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
  {
    id: '4',
    severity: 'warning',
    startsAt: '2021-02-04T10:00:00Z',
    endsAt: '2021-02-06T00:00:00Z',
    description:
      'Global health warning Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
  {
    id: '5',
    severity: 'warning',
    startsAt: '2021-02-06T12:00:00Z',
    endsAt: '2021-02-07T00:00:00Z',
    description:
      'Global health warning Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
  {
    id: '6',
    severity: 'warning',
    startsAt: '2021-01-30T22:00:00Z',
    endsAt: '2021-01-30T23:00:00Z',
    description:
      'Global health warning Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
  {
    id: '7',
    severity: 'warning',
    startsAt: '2021-02-01T00:47:30Z',
    endsAt: '2021-02-01T01:30:00Z',
    description:
      'Global health warning Long descritpion so it takes more space. Add more text to see how it wraps.',
  },
];

export const Default: Story = {
  args: {
    start: new Date(start),
    end: new Date(end),
    alerts: alerts as Alert[],
  },
};

export const WithSelectedDate24h: Story = {
  render: () => {
    return (
      <div style={{ width: '350px', height: '1000px', overflow: 'hidden' }}>
        <div style={{ width: '500px', height: '400px' }} />
        <GlobalHealthBar
          start={new Date(startLast24h)}
          end={new Date(endLast24h)}
          alerts={alerts as Alert[]}
          id="1"
        />
      </div>
    );
  },
};
export const WithSelectedDateWeek: Story = {
  render: () => {
    return (
      <div style={{ width: '400px', height: '1000px', overflow: 'hidden' }}>
        <div style={{ width: '400px', height: '400px' }} />
        <GlobalHealthBar
          start={new Date(start2)}
          end={new Date(end2)}
          alerts={alerts as Alert[]}
          id="1"
        />
      </div>
    );
  },
};

export const Hour: Story = {
  render: () => {
    return (
      <div style={{ width: '250px', height: '1000px', overflow: 'hidden' }}>
        <div style={{ width: '400px', height: '400px' }} />
        <GlobalHealthBar
          start={new Date(startLastHour)}
          end={new Date(endLastHour)}
          alerts={alerts as Alert[]}
          id="1"
        />
      </div>
    );
  },
};
