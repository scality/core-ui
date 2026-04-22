import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { spacing, Stack } from '../../spacing';
import { Text } from '../text/Text.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

export type Props = {
  name: string;
  value: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const RadioInput = styled.input`
  transform: scale(1.5);
`;

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ name, value, label, checked, disabled, onChange, ...rest }, ref) => {
    return (
      <StyledRadio disabled={disabled} className="sc-radio">
        <Stack>
          <RadioInput
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            ref={ref}
            {...rest}
          />
          {label && <Text>{label}</Text>}
        </Stack>
      </StyledRadio>
    );
  },
);

export { Radio };

const StyledRadio = styled.label<{ disabled?: boolean }>`
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
