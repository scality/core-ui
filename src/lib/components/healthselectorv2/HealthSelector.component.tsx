import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import {
  OptionProps,
  Select,
  SelectProps,
} from '../selectv2/Selectv2.component';

type OptionType = 'all' | 'healthy' | 'warning' | 'critical' | 'unknown';
type OptionValue = {
  label?: string;
} & OptionProps;
type OptionsConfiguration = Record<OptionType, OptionValue>;
type Props = {
  options?: OptionValue[];
} & SelectProps;

const SelectStyle = styled(Select)`
  .sc-select__control {
    background-color: ${getThemePropSelector('buttonSecondary')};

    &.sc-select__control--is-focused {
      background-color: ${getThemePropSelector('buttonSecondary')};
    }
    .sc-select__value-container {
      overflow: visible;
    }

    &.sc-select__control--menu-is-open {
      .sc-select__indicator {
        transform: rotate(180deg);
      }
    }
  }
`;

export const optionsDefaultConfiguration: OptionsConfiguration = {
  all: {
    icon: (
      <svg
        viewBox="0 0 150 100"
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          fill={defaultTheme.brand.statusHealthy}
        />
        <circle
          cx="75"
          cy="50"
          r="50"
          fill={defaultTheme.brand.statusWarning}
        />
        <circle
          cx="100"
          cy="50"
          r="50"
          fill={defaultTheme.brand.statusCritical}
        />
      </svg>
    ),
    label: 'All healthy statuses',
    value: 'all',
  },
  healthy: {
    icon: <Icon name={'Check-circle'} color={'statusHealthy'} size={'lg'} />,
    label: 'Healthy only',
    value: 'healthy',
  },
  critical: {
    icon: <Icon name={'Times-circle'} color={'statusCritical'} size={'lg'} />,
    label: 'Critical only',
    value: 'critical',
  },
  warning: {
    icon: (
      <Icon name={'Exclamation-circle'} color={'statusWarning'} size={'lg'} />
    ),
    label: 'Warning only',
    value: 'warning',
  },
  unknown: {
    icon: <Icon name={'Info'} color={'infoPrimary'} size={'lg'} />,
    label: 'Unknown only',
    value: 'unknown',
  },
};
export const defaultOptions: OptionValue[] = Object.keys(
  optionsDefaultConfiguration,
).map((key) => optionsDefaultConfiguration[key]);

function HealthSelectorv2(props: Props) {
  const { options = defaultOptions, value, ...selectRest } = props;

  let selectValue = value ?? options[0].value;

  return (
    <SelectStyle {...selectRest} value={selectValue}>
      {options.map((option, index) => {
        const { ...optionRest } = option;
        return (
          <Select.Option key={index} {...optionRest}>
            {option.label}
          </Select.Option>
        );
      })}
    </SelectStyle>
  );
}

export const HealthSelector = HealthSelectorv2;
