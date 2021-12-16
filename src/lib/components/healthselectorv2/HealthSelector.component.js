//@flow
import * as React from 'react';
import { components } from 'react-select';
import type { OptionProps } from '../selectv2/Selectv2.component';
import type { SelectProps } from '../selectv2/Selectv2.component';
import {
  SingleValueWrapper,
  ValueIcon,
  OptionIcon,
  OptionWrapper,
  OptionLabel,
  SelectStyle,
  ShortLabel,
  icons,
} from './HealthSelector.style';

type optionType = 'all' | 'healthy' | 'warning' | 'critical' | 'unknown';
type optionValue = {
  shortLabel?: string,
  isHidden?: boolean,
} & OptionProps;

type OptionsConfiguration = { [key: optionType | string]: optionValue };

type Props = {
  optionsConfiguration?: OptionsConfiguration,
  label?: string,
} & SelectProps;

export const optionsDefaultConfiguration: OptionsConfiguration = {
  all: {
    icon: icons.all,
    label: 'All healthy statuses',
    shortLabel: 'All',
    value: 'all',
    isHidden: false,
  },
  healthy: {
    icon: icons.healthy,
    label: 'Healthy only',
    shortLabel: 'Healthy',
    value: 'healthy',
    isHidden: false,
  },
  critical: {
    icon: icons.critical,
    label: 'Critical only',
    shortLabel: 'Critical',
    value: 'critical',
    isHidden: false,
  },
  warning: {
    icon: icons.warning,
    label: 'Warning only',
    shortLabel: 'Warning',
    value: 'warning',
    isHidden: false,
  },
  unknown: {
    icon: icons.unknown,
    label: 'Unknown only',
    shortLabel: 'Unknown',
    value: 'unknown',
    disabled: false,
  },
};

function HealthSelectorv2(props: Props) {
  const {
    optionsConfiguration = optionsDefaultConfiguration,
    label = 'Health',
    onChange,
    ...rest
  } = props;

  const options = [];

  Object.keys(optionsConfiguration).forEach((key) => {
    if (!optionsConfiguration[key].isHidden) {
      options.push(optionsConfiguration[key]);
    }
  });

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
      components={{ SingleValue, Option: CustomOption }}
      onChange={onChange}
      defaultValue={options[0]}
      options={options}
      {...rest}
    />
  );
}

export default HealthSelectorv2;
