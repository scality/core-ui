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
  TIME_FORMATER,
  TIME_SECOND_FORMATER,
} from '../../src/lib/components/date/FormattedDateTime';

type Story = StoryObj<GlobalHealthProps>;

const meta: Meta<GlobalHealthProps> = {
  title: 'Components/GlobalHealthBarRecharts',
  component: GlobalHealthBar,
};
export default meta;

const start = '2021-01-31T23:00:00Z'; // UTC time
const start2 = '2021-01-31T23:00:00';
const end2 = '2021-02-06T23:00:00';
const end = '2021-02-06T23:00:00Z';
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
    endsAt: '2021-02-07T00:00:00Z',
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

const InputDate = () => {
  const history = useHistoryAlert();
  if (history.selectedDate !== null) {
    const handleChange = (e) => {
      history.setSelectedDate(new Date(e.target.value).valueOf());
    };

    return (
      <input
        min={start2}
        max={end2}
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

export const WithSelectedDate: Story = {
  render: () => {
    return (
      <HistoryAlertProvider>
        <GlobalHealthBar start={start} end={end} alerts={alerts} id="1" />
        <InputDate />
      </HistoryAlertProvider>
    );
  },
};
