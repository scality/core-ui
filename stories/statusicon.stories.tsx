import React from 'react';
import {
  StatusCluster,
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
          <StatusIcon status={StatusCluster.HEALTHY} />{' '}
        </Stack>
        <Stack>
          <Text>Warning status </Text>
          <StatusIcon status={StatusCluster.WARNING} />
        </Stack>
        <Stack>
          <Text>Critical status </Text>
          <StatusIcon status={StatusCluster.CRITICAL} />
        </Stack>
        <Stack>
          <Text>Unknown status </Text>
          <StatusIcon status={StatusCluster.UNKNOWN} />
        </Stack>
      </Wrapper>
    );
  },
};
