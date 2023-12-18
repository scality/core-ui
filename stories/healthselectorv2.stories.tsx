import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { action } from '@storybook/addon-actions';
import {
  HealthSelector,
  optionsDefaultConfiguration,
} from '../src/lib/components/healthselectorv2/HealthSelector.component';
import { Wrapper } from './common';
import { Icon } from '../src/lib/components/icon/Icon.component';
export default {
  title: 'Components/HealthSelector',
  component: HealthSelector,

  decorators: [
    (story) => (
      <Wrapper style={{ minHeight: '40vh' }}>
        <HealthSelectorWrapper>{story()}</HealthSelectorWrapper>
      </Wrapper>
    ),
  ],
  args: {
    onChange: (value) => action(value),
  },
};
const HealthSelectorWrapper = styled.div`
  width: 205px;
`;

export const Playground = {
  args: {
    id: 'playground',
  },
  argTypes: {
    value: {
      options: ['all', 'warning', 'critical', 'unknown'],
      control: 'select',
    },
  },
};

export const ChangingLabels = {
  args: {
    options: [
      {
        ...optionsDefaultConfiguration.all,
        label: 'label all',
      },
      {
        ...optionsDefaultConfiguration.healthy,
        label: 'any label',
      },
      {
        ...optionsDefaultConfiguration.warning,
        label: 'warning',
        icon: <Icon name="Tape" />,
        value: 'myValue',
      },
      optionsDefaultConfiguration.critical,
      optionsDefaultConfiguration.unknown,
    ],
  },
};

export const HiddingOptions = {
  args: {
    id: 'hiddenoptions',
    options: [
      optionsDefaultConfiguration.all,
      optionsDefaultConfiguration.warning,
      optionsDefaultConfiguration.critical,
      optionsDefaultConfiguration.unknown,
    ],
  },
};
