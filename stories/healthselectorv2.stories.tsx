import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import {
  Healthselector,
  optionsDefaultConfiguration,
} from '../src/lib/components/healthselectorv2/HealthSelector.component';
import { Wrapper, Title } from './common';
import { Icon } from '../src/lib/components/icon/Icon.component';
export default {
  title: 'Components/v2/Healthselector',
  component: Healthselector,
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

export const Basic = {};

export const ChangingLabels = {
  args: {
    label: 'Alerts',
    options: [
      {
        ...optionsDefaultConfiguration.all,
        label: 'label all',
        shortLabel: 'all v2',
      },
      {
        ...optionsDefaultConfiguration.healthy,
        label: 'any label',
        shortLabel: 'short',
      },
      {
        ...optionsDefaultConfiguration.warning,
        label: 'warning',
        shortLabel: 'careful',
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
