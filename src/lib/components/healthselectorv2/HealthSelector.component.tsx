import styled from 'styled-components';
import * as defaultTheme from '../../style/theme';
import { getThemePropSelector } from '../../utils';
import { Icon } from '../icon/Icon.component';
import {
  OptionProps,
  Select,
  SelectProps,
} from '../selectv2/Selectv2.component';

type OptionValue = {
  label?: string;
} & OptionProps;
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

export const defaultOptions = [
  {
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
    label: 'All Status',
    value: 'all',
  },
  {
    icon: <Icon name="Check-circle" color="statusHealthy" size="lg" />,
    label: 'Healthy',
    value: 'healthy',
  },
  {
    icon: <Icon name="Exclamation-circle" color="statusWarning" size="lg" />,
    label: 'Warning',
    value: 'warning',
  },
  {
    icon: <Icon name="Times-circle" color="statusCritical" size="lg" />,
    label: 'Critical',
    value: 'critical',
  },
  {
    icon: <Icon name="Info" color="infoPrimary" size="lg" />,
    label: 'Unknown',
    value: 'unknown',
  },
] as const;

export const optionsDefaultConfiguration = {
  all: defaultOptions[0],
  healthy: defaultOptions[1],
  warning: defaultOptions[2],
  critical: defaultOptions[3],
  unknown: defaultOptions[4],
};

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
