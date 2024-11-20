import React from 'react';
import {
  Status,
  StatusIcon,
} from '../src/lib/components/statusicon/StatusIcon.component';
import { Wrapper } from './common';
import { Stack, Text } from '../src/lib';

export default {
  title: 'Components/statusIcon',
  component: StatusIcon,
};

export const Playground = {
  args: {
    status: 'healthy',
  },
};
export const Default = {
  render: ({}) => {
    return (
      <Wrapper>
        <Stack>
          <Text>Healthy status </Text>
          <StatusIcon status={Status.HEALTHY} />{' '}
        </Stack>
        <Stack>
          <Text>Warning status </Text>
          <StatusIcon status={Status.WARNING} />
        </Stack>
        <Stack>
          <Text>Critical status </Text>
          <StatusIcon status={Status.CRITICAL} />
        </Stack>
        <Stack>
          <Text>Loading status </Text>
          <StatusIcon status={Status.LOADING} />
        </Stack>
        <Stack>
          <Text>Unknown status </Text>
          <StatusIcon status={Status.UNKNOWN} />
        </Stack>
      </Wrapper>
    );
  },
};
