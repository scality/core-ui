// @ts-nocheck
import { components } from 'react-select';
import styled from 'styled-components';
import { getThemePropSelector } from '../../utils';
import { OptionProps } from '../selectv2/Selectv2.component';
import { Select } from '../selectv2/Selectv2.component';
import { SelectProps } from '../selectv2/Selectv2.component';
import {
  SingleValueWrapper,
  ValueIcon,
  OptionIcon,
  OptionWrapper,
  OptionLabel,
  ShortLabel,
  icons,
} from './HealthSelector.style';
type OptionType = 'all' | 'healthy' | 'warning' | 'critical' | 'unknown';
type OptionValue = {
  shortLabel?: string;
} & OptionProps;
type OptionsConfiguration = Record<OptionType, OptionValue>;
type Props = {
  options?: OptionValue[];
  label?: string;
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
    icon: icons.all,
    label: 'All healthy statuses',
    shortLabel: 'All',
    value: 'all',
  },
  healthy: {
    icon: icons.healthy,
    label: 'Healthy only',
    shortLabel: 'Healthy',
    value: 'healthy',
  },
  critical: {
    icon: icons.critical,
    label: 'Critical only',
    shortLabel: 'Critical',
    value: 'critical',
  },
  warning: {
    icon: icons.warning,
    label: 'Warning only',
    shortLabel: 'Warning',
    value: 'warning',
  },
  unknown: {
    icon: icons.unknown,
    label: 'Unknown only',
    shortLabel: 'Unknown',
    value: 'unknown',
  },
};
export const defaultOptions: OptionValue[] = Object.keys(
  optionsDefaultConfiguration,
).map((key) => {
  return optionsDefaultConfiguration[key];
});

function HealthSelectorv2(props: Props) {
  const {
    options = defaultOptions,
    label = 'Health',
    onChange,
    ...rest
  } = props;

  const SingleValue = (props) => {
    return (
      <SingleValueWrapper>
        <p data-testid="singleValueLabel">{label}</p>{' '}
        <ValueIcon>{props.data.icon}</ValueIcon>
        <ShortLabel data-testid="singleValueShortLabel">
          {props.data.shortLabel}
        </ShortLabel>
      </SingleValueWrapper>
    );
  };

  const CustomOption = (props) => {
    return (
      <components.Option
        {...props}
        isFocused={props.isFocused && props.selectProps.keyboardFocusEnabled}
      >
        <OptionWrapper>
          <OptionIcon>{props.data.icon}</OptionIcon>
          <OptionLabel>{props.data.label}</OptionLabel>
        </OptionWrapper>
      </components.Option>
    );
  };

  return (
    <SelectStyle
      components={{
        SingleValue,
        Option: CustomOption,
      }}
      onChange={onChange}
      defaultValue={options[0]}
      options={options}
      {...rest}
    />
  );
}

export const Healthselector = HealthSelectorv2;
