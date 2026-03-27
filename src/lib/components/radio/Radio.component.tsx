import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';
import { spacing, Stack } from '../../spacing';
import { Text } from '../text/Text.component';
import { FocusVisibleStyle } from '../buttonv2/Buttonv2.component';

const getDotSvgUrl = (color: string) => {
  const encodedColor = color.replace('#', '%23');
  return `url('data:image/svg+xml,%3Csvg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="6.5" cy="6.5" r="3" fill="${encodedColor}"/%3E%3C/svg%3E')`;
};

export type Props = {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ disabled, checked, label, name, value, onChange, ...rest }, ref) => {
    return (
      <StyledRadio checked={checked} disabled={disabled}>
        <Stack gap="r12" style={{ alignItems: 'baseline' }}>
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

const RadioInput = styled.input`
  align-self: center;
`;

const StyledRadio = styled.label<{
  disabled?: boolean;
  checked?: boolean;
}>`
  display: inline-flex;
  ${(props) => (props.disabled ? 'opacity: 0.5;' : '')}

  [type='radio'] {
    width: 1.125rem;
    height: 1.125rem;
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
    border-radius: 50%;
    border: 0;
    background-color: transparent;
    background-size: contain;
    box-shadow: inset 0 0 0 ${spacing.r1} ${(props) => props.theme.textSecondary};
  }

  [type='radio']:checked {
    background-color: ${(props) => props.theme.selectedActive};
  }

  [type='radio']:checked::before {
    box-shadow: none;
    background-image: ${(props) => getDotSvgUrl(props.theme.textPrimary)};
    background-repeat: no-repeat;
    background-position: center;
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
    background-color: ${(props) => props.theme.textSecondary};
  }
`;
