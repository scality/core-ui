import { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { spacing, Stack } from '../../spacing';
import { Text } from '../text/Text.component';
import { Tooltip } from '../tooltip/Tooltip.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  disabledReason?: ReactNode;
};

type RadioGroupBaseProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
};

type WithLegend = RadioGroupBaseProps & {
  label: string;
  'aria-label'?: never;
  'aria-labelledby'?: never;
};

type WithAriaLabel = RadioGroupBaseProps & {
  label?: never;
  'aria-label': string;
  'aria-labelledby'?: never;
};

type WithAriaLabelledBy = RadioGroupBaseProps & {
  label?: never;
  'aria-label'?: never;
  'aria-labelledby': string;
};

export type RadioGroupProps = WithLegend | WithAriaLabel | WithAriaLabelledBy;

const Fieldset = styled.fieldset<{ $direction: 'vertical' | 'horizontal' }>`
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === 'horizontal' ? 'row' : 'column'};
  gap: ${({ $direction }) =>
    $direction === 'horizontal' ? spacing.r16 : spacing.r12};
`;

const Group = styled.div<{ $direction: 'vertical' | 'horizontal' }>`
  display: flex;
  flex-direction: ${({ $direction }) =>
    $direction === 'horizontal' ? 'row' : 'column'};
  gap: ${({ $direction }) =>
    $direction === 'horizontal' ? spacing.r16 : spacing.r12};
`;

const Legend = styled.legend`
  padding: 0;
  margin-bottom: ${spacing.r8};
  color: ${({ theme }) => theme.textPrimary};
`;

const RadioInput = styled.input`
  transform: scale(1.5);
`;

const RadioLabel = styled.label<{ disabled?: boolean }>`
  ${(props) => (props.disabled ? 'opacity: 0.5;' : '')}

  [type='radio'] {
    width: 0.75rem;
    height: 0.75rem;
    color: ${(props) => props.theme.textPrimary};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    outline: 0;
    flex-grow: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme.backgroundLevel1};
    transition: background 300ms;
    cursor: pointer;
  }

  [type='radio']::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    border: 0;
    background-color: transparent;
    box-shadow: inset 0 0 0 ${spacing.r1} ${(props) => props.theme.textSecondary};
  }

  [type='radio']:checked {
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='radio']:checked::before {
    box-shadow: none;
    background-image: radial-gradient(
      circle,
      ${(props) => props.theme.textPrimary} 35%,
      transparent 35%
    );
  }

  [type='radio']:hover {
    ${(props) =>
      !props.disabled && `background-color: ${props.theme.highlight};`}
  }

  [type='radio']:hover::before {
    ${(props) =>
      !props.disabled &&
      `box-shadow: inset 0 0 0 ${spacing.r1} ${props.theme.selectedActive};`}
  }

  [type='radio']:focus-visible:enabled {
    ${FocusVisibleStyle}
  }

  [type='radio']:checked:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='radio']:not(:checked):disabled {
    cursor: not-allowed;
  }
`;

type RadioOptionItemProps = {
  name: string;
  option: RadioOption;
  checked: boolean;
  groupDisabled?: boolean;
  onChange: (value: string) => void;
};

const RadioOptionItem = ({
  name,
  option,
  checked,
  groupDisabled,
  onChange,
}: RadioOptionItemProps) => {
  const isDisabled = groupDisabled || option.disabled;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) onChange(option.value);
  };

  const input = (
    <RadioLabel disabled={isDisabled} className="sc-radio">
      <Stack>
        <RadioInput
          type="radio"
          name={name}
          value={option.value}
          checked={checked}
          disabled={isDisabled}
          onChange={handleChange}
        />
        <Text>{option.label}</Text>
      </Stack>
    </RadioLabel>
  );

  if (isDisabled && option.disabledReason) {
    return (
      <Tooltip
        overlay={option.disabledReason}
        placement="right"
        overlayStyle={{ marginLeft: '0.5rem', maxWidth: '15rem' }}
      >
        {input}
      </Tooltip>
    );
  }

  return input;
};

const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    value,
    onChange,
    options,
    disabled,
    direction = 'vertical',
  } = props;

  const items = options.map((option) => (
    <RadioOptionItem
      key={option.value}
      name={name}
      option={option}
      checked={value === option.value}
      groupDisabled={disabled}
      onChange={onChange}
    />
  ));

  if ('label' in props && props.label) {
    return (
      <Fieldset
        $direction={direction}
        role="radiogroup"
        className="sc-radiogroup"
      >
        <Legend>{props.label}</Legend>
        {items}
      </Fieldset>
    );
  }

  const ariaLabel = (props as WithAriaLabel)['aria-label'];
  const ariaLabelledBy = (props as WithAriaLabelledBy)['aria-labelledby'];

  return (
    <Group
      $direction={direction}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className="sc-radiogroup"
    >
      {items}
    </Group>
  );
};

export { RadioGroup };
