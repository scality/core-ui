import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  GlobalHealthBar,
  GlobalHealthProps,
} from '../../src/lib/components/globalhealthbar/GlobalHealthBarRecharts.component';
import {
  HistoryAlertProvider,
  useHistoryAlert,
} from '../../src/lib/components/globalhealthbar/HistoryProvider';
import {
  DATE_FORMATER,
  TIME_SECOND_FORMATER,
} from '../../src/lib/components/date/FormattedDateTime';

type Story = StoryObj<GlobalHealthProps>;

const meta: Meta<GlobalHealthProps> = {
  title: 'Components/GlobalHealthBarRecharts',
  component: GlobalHealthBar,
};
export default meta;

const start = '2021-01-31T23:00:00Z'; // UTC time
const start2 = '2021-01-30T23:00:00';
const startLast24h = '2021-02-01T00:00:00';
const endLast24h = '2021-02-02T00:00:00';
const startLastHour = '2021-02-01T00:00:00';
const endLastHour = '2021-02-01T01:00:00';
const end2 = '2021-02-06T23:00:00';
const end = '2021-02-06T23:00:00Z';
const alerts = [
  {
    id: '1',
    severity: 'warning',
    startsAt: '2021-02-01T07:00:00Z',
    endsAt: '2021-02-02T01:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '2',
    severity: 'warning',
    startsAt: '2021-02-01T23:00:00Z',
    endsAt: '2021-02-02T22:00:00Z',
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
    endsAt: '2021-02-07T00:00:00Z',
    description: 'Global health warning',
  },
  {
    id: '6',
    severity: 'warning',
    startsAt: '2021-01-30T22:30:00Z',
    endsAt: '2021-01-31T23:59:00Z',
    description: 'Global health warning',
  },
];

export const Default: Story = {
  args: {
    start,
    end,
    alerts,
  },
};

const InputDate = ({ start, end }) => {
  const history = useHistoryAlert();
  if (history.selectedDate !== null) {
    const handleChange = (e) => {
      history.setSelectedDate(new Date(e.target.value).valueOf());
    };

    return (
      <input
        min={start}
        max={end}
        type="datetime-local"
        value={
          DATE_FORMATER.format(history.selectedDate) +
          'T' +
          TIME_SECOND_FORMATER.format(history.selectedDate)
        }
        onChange={handleChange}
      />
    );
  }

  return <></>;
};

export const WithSelectedDate24h: Story = {
  render: () => {
    return (
      <>
        <HistoryAlertProvider>
          <GlobalHealthBar
            start={startLast24h}
            end={endLast24h}
            alerts={alerts}
            id="1"
          />
          <InputDate start={startLast24h} end={endLast24h} />
        </HistoryAlertProvider>
        <GlobalHealthBar
          start={startLast24h}
          end={endLast24h}
          alerts={alerts}
          id="2"
        />
      </>
    );
  },
};
export const WithSelectedDateWeek: Story = {
  render: () => {
    return (
      <>
        <HistoryAlertProvider>
          <GlobalHealthBar start={start2} end={end2} alerts={alerts} id="1" />
          <InputDate start={start2} end={end2} />
        </HistoryAlertProvider>
        <GlobalHealthBar start={start2} end={end2} alerts={alerts} id="2" />
      </>
    );
  },
};

export const WithSelectedDateHour: Story = {
  render: () => {
    return (
      <>
        <HistoryAlertProvider>
          <GlobalHealthBar
            start={startLastHour}
            end={endLastHour}
            alerts={alerts}
            id="1"
          />
          <InputDate start={startLastHour} end={endLastHour} />
        </HistoryAlertProvider>
        <GlobalHealthBar
          start={startLastHour}
          end={endLastHour}
          alerts={alerts}
          id="2"
        />
      </>
    );
  },
};
