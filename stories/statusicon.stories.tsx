import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  StatusCluster,
  StatusIcon,
} from '../src/lib/components/statusicon/StatusIcon.component';
import { Wrapper } from './common';
import styled from 'styled-components';
import { Stack, Text } from '../src/lib';

const TextWrapper = styled(Wrapper)`
  min-height: 0;
`;

type Story = StoryObj<typeof StatusIcon>;

export default {
  title: 'Components/statusIcon',
  component: StatusIcon,
  argTypes: {
    status: {
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
};

export const Playground = {
  render: ({}: any) => {
    return (
      <TextWrapper>
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
      </TextWrapper>
    );
  },
};
