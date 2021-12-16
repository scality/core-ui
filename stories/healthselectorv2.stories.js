//@flow
import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import Healthselector, {
  optionsDefaultConfiguration,
} from '../src/lib/components/healthselectorv2/HealthSelector.component';
import { Wrapper, Title } from './common';
import Icon from '../src/lib/components/icon/Icon.component';

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
          optionsConfiguration={optionsDefaultConfiguration}
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
          optionsConfiguration={{
            healthy: {
              ...optionsDefaultConfiguration.healthy,
              label: 'any label',
              shortLabel: 'short',
            },
            all: {
              ...optionsDefaultConfiguration.all,
              label: 'label all',
              shortLabel: 'all v2',
            },
            warning: {
              ...optionsDefaultConfiguration.warning,
              label: 'warning',
              shortLabel: 'careful',
              icon: <Icon name="Tape" />,
              value: 'myValue',
            },
          }}
        />
      </HealthSelectorWrapper>

      <Title>hidding options</Title>
      <HealthSelectorWrapper>
        <Healthselector
          onChange={(value) => {
            action(value);
          }}
          optionsConfiguration={{
            ...optionsDefaultConfiguration,
            healthy: {
              ...optionsDefaultConfiguration.healthy,
              isHidden: true,
            },
          }}
        />
      </HealthSelectorWrapper>
    </Wrapper>
  );
};
