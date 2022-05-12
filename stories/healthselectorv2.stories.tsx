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
};
const HealthSelectorWrapper = styled.div`
  width: 205px;
`;
export const Default = () => {
  return (
    <Wrapper>
      <Title>Basic usage</Title>
      <HealthSelectorWrapper>
        <Healthselector
          onChange={(value) => {
            action(value);
          }}
        />
      </HealthSelectorWrapper>

      <Title>changing labels</Title>
      <HealthSelectorWrapper>
        <Healthselector
          onChange={(value) => {
            action(value);
          }}
          label="alerts"
          options={[
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
          ]}
        />
      </HealthSelectorWrapper>

      <Title>hidding options</Title>
      <HealthSelectorWrapper>
        <Healthselector
          onChange={(value) => {
            action(value);
          }}
          options={[
            optionsDefaultConfiguration.all,
            optionsDefaultConfiguration.warning,
            optionsDefaultConfiguration.critical,
            optionsDefaultConfiguration.unknown,
          ]}
        />
      </HealthSelectorWrapper>
    </Wrapper>
  );
};
